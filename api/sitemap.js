export default async function handler(req, res) {
  try {
    const airtableToken = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!airtableToken || !baseId) {
      return res.status(500).send('Missing Airtable environment variables');
    }

    const filterFormula = `AND({Status}='Approved',{Publish}=TRUE())`;

    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/Seller%20Listings?filterByFormula=${encodeURIComponent(filterFormula)}`,
      {
        headers: {
          Authorization: `Bearer ${airtableToken}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).send('Failed to fetch listings');
    }

    const baseUrl = "https://www.leaseshift.co.uk";

    const listingUrls = data.records.map((record) => {
      const vehicle = record.fields["Vehicle"] || "listing";

      const slug = vehicle
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");

      return `<url>
        <loc>${baseUrl}/listing/${slug}</loc>
      </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>${baseUrl}</loc>
  </url>

  ${listingUrls.join("\n")}

</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (error) {
    res.status(500).send("Server error generating sitemap");
  }
}