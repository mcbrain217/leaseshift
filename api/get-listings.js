const CACHE_TTL_MS = 10 * 60 * 1000;

let listingsCache = {
  listings: null,
  version: null,
  fetchedAt: 0,
};

const buildListingsVersion = (listings) =>
  listings
    .map((listing) => `${listing.id}:${listing.createdAt || ''}:${listing.slug}:${listing.featured ? '1' : '0'}:${listing.remaining}`)
    .join('|');

const calculateRemainingTerm = (leaseEndDate) => {
  if (!leaseEndDate) {
    return { remainingMonths: null, remainingLabel: 'Term to review' };
  }

  const today = new Date();
  const endDate = new Date(leaseEndDate);

  if (Number.isNaN(endDate.getTime())) {
    return { remainingMonths: null, remainingLabel: 'Term to review' };
  }

  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const endUtc = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate());
  const dayMs = 24 * 60 * 60 * 1000;
  const totalDays = Math.max(0, Math.ceil((endUtc - todayUtc) / dayMs));

  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;

  if (totalDays === 0) {
    return { remainingMonths: 0, remainingLabel: '0 days left' };
  }

  const monthPart = months > 0 ? `${months} month${months === 1 ? '' : 's'}` : '';
  const dayPart = days > 0 ? `${days} day${days === 1 ? '' : 's'}` : '';
  const separator = monthPart && dayPart ? ' ' : '';

  return {
    remainingMonths: Math.ceil(totalDays / 30),
    remainingLabel: `${monthPart}${separator}${dayPart} left`,
  };
};

const resolveLeaseEndDate = (fields, createdTime) => {
  const explicitLeaseEndDate =
    fields['Lease End Date'] ||
    fields['Lease Expiry Date'] ||
    fields['Lease Expiry'] ||
    fields['Lease End'] ||
    null;

  if (explicitLeaseEndDate) {
    return explicitLeaseEndDate;
  }

  // Fallback for legacy listings: derive a synthetic end date from
  // the original Months Remaining value plus record create date.
  const legacyMonths = Number(fields['Months Remaining']);
  if (!Number.isFinite(legacyMonths) || legacyMonths <= 0 || !createdTime) {
    return null;
  }

  const createdDate = new Date(createdTime);
  if (Number.isNaN(createdDate.getTime())) {
    return null;
  }

  const syntheticEndDate = new Date(createdDate);
  syntheticEndDate.setUTCMonth(syntheticEndDate.getUTCMonth() + Math.round(legacyMonths));

  return syntheticEndDate.toISOString().split('T')[0];
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const now = Date.now();
    const cacheIsFresh =
      Array.isArray(listingsCache.listings) &&
      now - listingsCache.fetchedAt < CACHE_TTL_MS;

    if (cacheIsFresh) {
      res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=60');
      res.setHeader('X-Listings-Cache', 'HIT');
      return res.status(200).json({
        listings: listingsCache.listings,
        cached: true,
        version: listingsCache.version,
      });
    }

    const airtableToken = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!airtableToken || !baseId) {
      return res.status(500).json({ error: 'Missing Airtable environment variables' });
    }

    // Fetch records from Airtable with filter for Approved and Published listings
    const filterFormula = `AND({Status}='Approved',{Publish}=TRUE())`;
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${baseId}/Seller%20Listings?filterByFormula=${encodeURIComponent(filterFormula)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${airtableToken}`,
        },
      }
    );

    const data = await airtableResponse.json();

    if (!airtableResponse.ok) {
      return res.status(airtableResponse.status).json({
        error: 'Failed to fetch listings from Airtable',
        details: data,
      });
    }

    // Map Airtable records to simplified structure
    const records = Array.isArray(data.records) ? data.records : [];

    // Debug: log field keys from first record to verify Airtable field names
    if (records.length > 0) {
      console.log('[get-listings] First record field keys:', Object.keys(records[0].fields || {}));
      console.log('[get-listings] Attachments field value:', records[0].fields['Attachments']);
    }

    const fallbackImage =
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80';

    const getImageUrlFromField = (fieldValue) => {
      if (!fieldValue) {
        return null;
      }

      if (typeof fieldValue === 'string') {
        return fieldValue;
      }

      if (Array.isArray(fieldValue) && fieldValue.length > 0) {
        const firstValue = fieldValue[0];
        if (typeof firstValue === 'string') {
          return firstValue;
        }
        if (firstValue && typeof firstValue.url === 'string') {
          return firstValue.url;
        }
      }

      if (typeof fieldValue === 'object' && typeof fieldValue.url === 'string') {
        return fieldValue.url;
      }

      return null;
    };

    const listings = records.map((record) => {
      const fields = record.fields || {};
      const paymentValue = fields['Monthly Payment'] || null;
      const incentiveValue = fields['Incentive'] || null;
      const leaseEndDate = resolveLeaseEndDate(fields, record.createdTime);
      const remainingTerm = calculateRemainingTerm(leaseEndDate);
      const attachmentUrls = Array.isArray(fields['Attachments'])
        ? fields['Attachments']
            .map((attachment) => attachment && attachment.url)
            .filter(Boolean)
        : [];

      const favouriteImage =
        getImageUrlFromField(fields['Favourite Image']) ||
        getImageUrlFromField(fields['Favorite Image']) ||
        attachmentUrls[0] ||
        fallbackImage;

      const homepageImage =
        getImageUrlFromField(fields['Homepage Image']) ||
        getImageUrlFromField(fields['Listings Homepage Image']) ||
        favouriteImage;

      const images = attachmentUrls.length > 0 ? attachmentUrls : [favouriteImage];

      const vehicle = fields['Vehicle'] || '';
      const slug = vehicle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

      return {
        id: record.id,
        make: vehicle,
        slug,
        paymentValue: paymentValue,
        payment: paymentValue ? `£${paymentValue}/mo` : '',
        leaseEndDate,
        remainingMonths: remainingTerm.remainingMonths,
        remaining: remainingTerm.remainingLabel,
        mileage: fields['Permitted Annual Mileage']
          ? `${fields['Permitted Annual Mileage']} miles/year`
          : '',
        incentiveValue: incentiveValue,
        incentive: incentiveValue ? `£${incentiveValue}` : '',
        location: fields['Location'] || '',
        transferStatus: fields['Transfer Allowed'] || 'Unknown',
        financeProvider: fields['Finance Provider'] || '',
        image: favouriteImage,
        favouriteImage,
        homepageImage,
        images,
        notes: fields['Notes'] || '',
        createdAt: record.createdTime,
        featured: Boolean(fields['Featured']),
      };
    });

    // Sort listings so featured ones appear first
    listings.sort((a, b) => {
      if (a.featured === b.featured) return 0;
      return a.featured ? -1 : 1;
    });

    const version = buildListingsVersion(listings);

    listingsCache = {
      listings,
      version,
      fetchedAt: Date.now(),
    };

    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=60');
    res.setHeader('X-Listings-Cache', 'MISS');
    return res.status(200).json({ listings, cached: false, version });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      details: error.message,
    });
  }
}
