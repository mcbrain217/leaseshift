export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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
    const listings = records.map((record) => {
      const fields = record.fields || {};
      const paymentValue = fields['Monthly Payment'] || null;
      const incentiveValue = fields['Incentive'] || null;
      const remainingMonths = fields['Months Remaining'] || null;

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
        remainingMonths: remainingMonths,
        remaining: remainingMonths ? `${remainingMonths} months left` : '',
        mileage: fields['Permitted Annual Mileage']
          ? `${fields['Permitted Annual Mileage']} miles/year`
          : '',
        incentiveValue: incentiveValue,
        incentive: incentiveValue ? `£${incentiveValue}` : '',
        location: fields['Location'] || '',
        transferStatus: fields['Transfer Allowed'] || 'Unknown',
        financeProvider: fields['Finance Provider'] || '',
        image:
          fields['Image'] ||
          'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80',
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

    return res.status(200).json({ listings });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      details: error.message,
    });
  }
}
