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

    const parsedBody =
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const enquiryDate = new Date().toISOString().split('T')[0];

    const criteriaParts = [
      parsedBody['Monthly Budget'] ? `Budget: £${parsedBody['Monthly Budget']}/mo` : '',
      parsedBody['Max Term Remaining']
        ? `Max term remaining: ${parsedBody['Max Term Remaining']} months`
        : '',
      parsedBody['Preferred Annual Mileage']
        ? `Preferred annual mileage: ${parsedBody['Preferred Annual Mileage']}`
        : '',
      parsedBody['Preferred Location'] ? `Location: ${parsedBody['Preferred Location']}` : '',
      parsedBody['Urgency'] ? `Urgency: ${parsedBody['Urgency']}` : '',
      parsedBody['Message'] ? `Notes: ${parsedBody['Message']}` : '',
    ].filter(Boolean);

    const message = criteriaParts.join(' | ');

    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${baseId}/Buyer%20Enquiries`,
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
                'Buyer Name': parsedBody['Buyer Name'] || '',
                'Buyer Email': parsedBody['Buyer Email'] || '',
                'Buyer Phone': parsedBody['Buyer Phone'] || '',
                Message: message,
                'Vehicle Interested In': parsedBody['Vehicle Interested In'] || '',
                'Listing ID': '',
                Status: 'Wanted',
                'Enquiry Date': enquiryDate,
              },
            },
          ],
        }),
      }
    );

    const airtableData = await airtableResponse.json();

    if (!airtableResponse.ok) {
      return res.status(airtableResponse.status).json({
        error: 'Failed to save wanted request to Airtable',
        details: airtableData,
      });
    }

    if (resendKey) {
      const resend = new Resend(resendKey);

      try {
        await resend.emails.send({
          from: 'hello@leaseshift.co.uk',
          to: parsedBody['Buyer Email'],
          subject: "You're on the LeaseShift wanted list",
          text: `Thanks for sharing what you're looking for on LeaseShift.\n\nWe have logged your wanted request and will reach out when a suitable lease appears.\n\nLeaseShift UK\nhttps://www.leaseshift.co.uk`,
        });
      } catch (emailError) {
        console.error('Failed to send wanted confirmation email:', emailError);
      }

      if (notificationEmail) {
        try {
          await resend.emails.send({
            from: 'hello@leaseshift.co.uk',
            to: notificationEmail,
            subject: 'New wanted request received',
            text: `New wanted request on LeaseShift.\n\nBuyer Name: ${parsedBody['Buyer Name'] || ''}\nBuyer Email: ${parsedBody['Buyer Email'] || ''}\nBuyer Phone: ${parsedBody['Buyer Phone'] || ''}\nVehicle Wanted: ${parsedBody['Vehicle Interested In'] || ''}\n${message}`,
          });
        } catch (emailError) {
          console.error('Failed to send wanted notification email:', emailError);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Wanted request submitted successfully',
      recordId: airtableData.records?.[0]?.id,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      details: error.message,
    });
  }
}
