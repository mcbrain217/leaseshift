import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ListingPage() {
  const { slug } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
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
            <button className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500">
              Enquire about this lease
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
