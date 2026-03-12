import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function ListingPage() {
  const { slug } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: "Hi, I'm interested in this lease listing.",
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/get-listings');
        if (response.ok) {
          const data = await response.json();
          const foundListing = data.listings.find((l) => l.slug === slug);
          setListing(foundListing || null);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [slug]);

  const handleEnquiryChange = (field, value) => {
    setEnquiryForm((current) => ({ ...current, [field]: value }));
  };

  const handleEnquirySubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/submit-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'Buyer Name': enquiryForm.name,
          'Buyer Email': enquiryForm.email,
          'Buyer Phone': enquiryForm.phone,
          'Message': enquiryForm.message,
          'Vehicle Interested In': listing.make,
          'Listing ID': listing.id,
        }),
      });

      if (response.ok) {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'buyer_enquiry_submitted', {
            vehicle: listing.make,
            listing_id: listing.id,
            location: listing.location,
          });
        }
        setEnquirySubmitted(true);
      } else {
        console.error('Enquiry submission failed');
      }
    } catch (error) {
      console.error('Enquiry submission error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Listing not found</h1>
          <p className="text-slate-300">The listing you're looking for doesn't exist.</p>
          <Link to="/" className="mt-4 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300">← Back to all listings</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>{`${listing.make} Lease Transfer – ${listing.payment} | LeaseShift UK`}</title>
        <meta
          name="description"
          content={`View this ${listing.make} lease transfer in ${listing.location}. Monthly payment ${listing.payment}, ${listing.remainingMonths} months remaining, listed on LeaseShift UK.`}
        />
        <meta property="og:title" content={`${listing.make} Lease Transfer – ${listing.payment} | LeaseShift UK`} />
        <meta
          property="og:description"
          content={`View this ${listing.make} lease transfer in ${listing.location}. Monthly payment ${listing.payment}, ${listing.remainingMonths} months remaining, listed on LeaseShift UK.`}
        />
        <meta property="og:image" content={listing.image} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${listing.make} Lease Transfer – ${listing.payment} | LeaseShift UK`} />
        <meta
          name="twitter:description"
          content={`View this ${listing.make} lease transfer in ${listing.location}. Monthly payment ${listing.payment}, ${listing.remainingMonths} months remaining, listed on LeaseShift UK.`}
        />
        <meta name="twitter:image" content={listing.image} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": listing.make,
            "image": listing.image ? [listing.image] : [],
            "description": listing.notes || "Car lease transfer opportunity listed on LeaseShift UK.",
            "brand": {
              "@type": "Brand",
              "name": listing.make
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "GBP",
              "price": listing.paymentValue || 0,
              "availability": "https://schema.org/InStock",
              "url": typeof window !== 'undefined' ? window.location.href : '',
              "seller": {
                "@type": "Organization",
                "name": "LeaseShift UK"
              }
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Months Remaining",
                "value": listing.remainingMonths
              },
              {
                "@type": "PropertyValue",
                "name": "Finance Provider",
                "value": listing.financeProvider
              },
              {
                "@type": "PropertyValue",
                "name": "Location",
                "value": listing.location
              },
              {
                "@type": "PropertyValue",
                "name": "Mileage",
                "value": listing.mileage
              },
              {
                "@type": "PropertyValue",
                "name": "Incentive",
                "value": listing.incentive
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="mb-6">
          <Link to="/" className="text-sm font-medium text-emerald-400 hover:text-emerald-300">← Back to all listings</Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <img
              src={listing.image}
              alt={listing.make}
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-black tracking-tight">{listing.make}</h1>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-slate-400">Monthly Payment</span>
                <p className="text-2xl font-semibold text-emerald-300">{listing.payment}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-400">Months Remaining</span>
                <p className="text-lg text-slate-300">{listing.remaining}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-400">Mileage</span>
                <p className="text-lg text-slate-300">{listing.mileage}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-400">Finance Provider</span>
                <p className="text-lg text-slate-300">{listing.financeProvider}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-400">Location</span>
                <p className="text-lg text-slate-300">{listing.location}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-400">Notes</span>
                <p className="text-lg text-slate-300">{listing.notes}</p>
              </div>
            </div>
            {enquirySubmitted ? (
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4 text-center">
                <p className="text-emerald-300">Thank you. Your enquiry has been sent.</p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={enquiryForm.name}
                  onChange={(e) => handleEnquiryChange('name', e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={enquiryForm.email}
                  onChange={(e) => handleEnquiryChange('email', e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={enquiryForm.phone}
                  onChange={(e) => handleEnquiryChange('phone', e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                  required
                />
                <textarea
                  placeholder="Message"
                  value={enquiryForm.message}
                  onChange={(e) => handleEnquiryChange('message', e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
