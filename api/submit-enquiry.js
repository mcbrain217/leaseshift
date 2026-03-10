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

    console.log('Incoming enquiry payload:', parsedBody);

    const enquiryDate = new Date().toISOString().split('T')[0];

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
                'Message': parsedBody['Message'] || '',
                'Vehicle Interested In': parsedBody['Vehicle Interested In'] || '',
                'Listing ID': parsedBody['Listing ID'] || '',
                'Status': 'New',
                'Enquiry Date': enquiryDate,
              },
            },
          ],
        }),
      }
    );

    const airtableData = await airtableResponse.json();

    if (!airtableResponse.ok) {
      console.error('Airtable error:', airtableData);
      return res.status(airtableResponse.status).json({
        error: 'Failed to save enquiry to Airtable',
        details: airtableData,
      });
    }

    if (resendKey) {
      const resend = new Resend(resendKey);

      try {
        await resend.emails.send({
          from: 'hello@leaseshift.co.uk',
          to: parsedBody['Buyer Email'],
          subject: "We've received your LeaseShift enquiry",
          text: `Thank you for your enquiry about a lease listing on LeaseShift.\n\nOur team has received your message and will review it shortly. We'll be in touch with the next steps.\n\nIf you need to add anything, simply reply to this email.\n\nLeaseShift UK\nhttps://www.leaseshift.co.uk`,
        });
      } catch (emailError) {
        console.error('Failed to send buyer confirmation email:', emailError);
      }

      if (notificationEmail) {
        try {
          await resend.emails.send({
            from: 'hello@leaseshift.co.uk',
            to: notificationEmail,
            subject: 'New buyer enquiry received',
            text: `New buyer enquiry received on LeaseShift.\n\nBuyer Name: ${parsedBody['Buyer Name'] || ''}\nBuyer Email: ${parsedBody['Buyer Email'] || ''}\nBuyer Phone: ${parsedBody['Buyer Phone'] || ''}\nVehicle Interested In: ${parsedBody['Vehicle Interested In'] || ''}\nListing ID: ${parsedBody['Listing ID'] || ''}\nMessage: ${parsedBody['Message'] || ''}`,
          });
        } catch (emailError) {
          console.error('Failed to send internal notification email:', emailError);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully',
      recordId: airtableData.records?.[0]?.id,
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return res.status(500).json({
      error: 'Server error',
      details: error.message,
    });
  }
}
