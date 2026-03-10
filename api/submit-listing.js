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

    const {
      fullName,
      email,
      phone,
      vehicle,
      monthlyPayment,
      monthsRemaining,
      annualMileage,
      currentMileage,
      financeProvider,
      transferAllowed,
      transferFee,
      incentive,
      location,
      notes,
    } = parsedBody;

    console.log('Incoming listing payload:', req.body);

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
                'Full Name': fullName || '',
                Email: email || '',
                Phone: phone || '',
                Vehicle: vehicle || '',
                'Monthly Payment': monthlyPayment ? Number(monthlyPayment) : null,
                'Months Remaining': monthsRemaining ? Number(monthsRemaining) : null,
                'Permitted annual mileage': annualMileage ? Number(annualMileage) : null,
                'Current Mileage': currentMileage ? Number(currentMileage) : null,
                'Finance Provider': financeProvider || '',
                'Transfer Allowed': transferAllowed || 'Not sure',
                'Transfer Fee': transferFee || '',
                Incentive: incentive ? Number(incentive) : null,
                Location: location || '',
                Notes: notes || '',
                Status: 'Submitted',
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