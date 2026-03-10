export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const airtableToken = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!airtableToken || !baseId) {
      return res.status(500).json({ error: 'Missing Airtable environment variables' });
    }

    const parsedBody =
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    console.log('Incoming listing payload:', parsedBody);

    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${baseId}/Seller%20Listings`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                'Full Name': parsedBody['Full Name'] || '',
                'Email': parsedBody['Email'] || '',
                'Phone': parsedBody['Phone'] || '',
                'Vehicle': parsedBody['Vehicle'] || '',
                'Monthly Payment': parsedBody['Monthly Payment'] ? Number(parsedBody['Monthly Payment']) : null,
                'Months Remaining': parsedBody['Months Remaining'] ? Number(parsedBody['Months Remaining']) : null,
                'Permitted Annual Mileage': parsedBody['Permitted Annual Mileage'] ? Number(parsedBody['Permitted Annual Mileage']) : null,
                'Current Mileage': parsedBody['Current Mileage'] ? Number(parsedBody['Current Mileage']) : null,
                'Finance Provider': parsedBody['Finance Provider'] || '',
                'Transfer Allowed': parsedBody['Transfer Allowed'] || 'Not sure',
                'Transfer Fee': parsedBody['Transfer Fee'] || '',
                'Incentive': parsedBody['Incentive'] ? Number(parsedBody['Incentive']) : null,
                'Location': parsedBody['Location'] || '',
                'Notes': parsedBody['Notes'] || '',
                'Status': 'Submitted',
              },
            },
          ],
        }),
      }
    );

    const data = await airtableResponse.json();

    if (!airtableResponse.ok) {
      return res.status(airtableResponse.status).json({
        error: 'Failed to save to Airtable',
        details: data,
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      details: error.message,
    });
  }
}