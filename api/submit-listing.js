import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const airtableToken = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const resendKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (!airtableToken || !baseId) {
      return res.status(500).json({ error: 'Missing Airtable environment variables' });
    }

    if (!resendKey || !notificationEmail) {
      console.warn('Resend configuration missing');
    }

    const resend = resendKey ? new Resend(resendKey) : null;

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
                'Transfer Fee': parsedBody['Transfer Fee']
                  ? String(parsedBody['Transfer Fee'])
                  : '',
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

    // attempt to send confirmation and notification emails
    if (resend) {
      try {
        // seller email
        await resend.emails.send({
          from: 'hello@leaseshift.co.uk',
          to: parsedBody['Email'],
          subject: "We've received your LeaseShift listing submission",
          text: `Thank you for submitting your lease details to LeaseShift.

Our team will review the information and contact you shortly to request vehicle photos and any supporting documents before the listing goes live.

If you need to update anything in the meantime, simply reply to this email.

LeaseShift UK`,
        });

        // internal notification
        const fieldsList = [
          'Full Name',
          'Email',
          'Phone',
          'Vehicle',
          'Monthly Payment',
          'Months Remaining',
          'Permitted Annual Mileage',
          'Current Mileage',
          'Finance Provider',
          'Transfer Allowed',
          'Transfer Fee',
          'Incentive',
          'Location',
          'Notes',
        ];
        const bodyLines = fieldsList.map((f) => `${f}: ${parsedBody[f] || ''}`);
        await resend.emails.send({
          from: 'hello@leaseshift.co.uk',
          to: notificationEmail,
          subject: 'New seller listing submitted',
          text: bodyLines.join("\n"),
        });
      } catch (emailError) {
        console.error('Email send error:', emailError);
      }
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      details: error.message,
    });
  }
}