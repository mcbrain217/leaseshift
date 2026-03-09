import { useMemo, useState } from 'react';

export default function App() {
  const initialListings = [
    {
      id: 1,
      make: 'BMW M340i Touring',
      paymentValue: 489,
      payment: '£489/mo',
      remainingMonths: 18,
      remaining: '18 months left',
      mileage: '10,000 miles/year',
      incentiveValue: 1500,
      incentive: '£1,500 incentive',
      location: 'Manchester',
      transferStatus: 'Verified',
      financeProvider: 'Alphabet',
      image:
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      notes: 'Well looked after, full service history, transfer fee known.',
    },
    {
      id: 2,
      make: 'Tesla Model Y',
      paymentValue: 599,
      payment: '£599/mo',
      remainingMonths: 22,
      remaining: '22 months left',
      mileage: '8,000 miles/year',
      incentiveValue: 2000,
      incentive: '£2,000 incentive',
      location: 'Birmingham',
      transferStatus: 'Awaiting review',
      financeProvider: 'Arval',
      image:
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      notes: 'Home charger included separately if buyer is interested.',
    },
    {
      id: 3,
      make: 'Audi Q5 S Line',
      paymentValue: 429,
      payment: '£429/mo',
      remainingMonths: 14,
      remaining: '14 months left',
      mileage: '12,000 miles/year',
      incentiveValue: 750,
      incentive: '£750 incentive',
      location: 'Leeds',
      transferStatus: 'Verified',
      financeProvider: 'Lex Autolease',
      image:
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
      notes: 'Clean interior, two keys, available in two weeks.',
    },
  ];

  const blankListingForm = {
    fullName: '',
    email: '',
    phone: '',
    vehicle: '',
    monthlyPayment: '',
    monthsRemaining: '',
    annualMileage: '',
    currentMileage: '',
    financeProvider: '',
    transferAllowed: 'Not sure',
    transferFee: '',
    incentive: '',
    location: '',
    notes: '',
  };

  const blankEnquiryForm = {
    fullName: '',
    email: '',
    phone: '',
    message: '',
  };

  const compliancePoints = [
    'All transfers are subject to approval by the relevant finance provider.',
    'LeaseShift UK is a marketplace and does not provide financial advice.',
    'Submitting a listing does not guarantee that a transfer is possible.',
    'Listings can be manually reviewed before they go live.',
    'Users should not hand over vehicles or money outside an approved transfer process.',
  ];

  const trialSteps = [
    {
      title: '1. Seller submits details',
      text: 'A lead form collects lease details, images, and the lease agreement for manual review.',
    },
    {
      title: '2. You verify it manually',
      text: 'You confirm whether transfer looks possible and publish only the listings you are comfortable with.',
    },
    {
      title: '3. Buyer enquires',
      text: 'Buyers submit interest and you handle the match manually over email or phone during the trial.',
    },
  ];

  const steps = [
    {
      title: 'List your lease',
      text: 'Upload your vehicle, monthly payment, months remaining, mileage allowance, and incentive offer in a few minutes.',
    },
    {
      title: 'We check the terms',
      text: 'Upload your lease agreement so transfer terms, fees, and eligibility can be reviewed before going live.',
    },
    {
      title: 'Find the next driver',
      text: 'Buyers search verified listings, compare deals, and apply to take over the lease with confidence.',
    },
  ];

  const photoTips = [
    'Front 3/4 view in daylight',
    'Rear 3/4 view',
    'Interior and dashboard',
    'Mileage close-up',
    'Wheel and tyre condition',
    'Any scratches or damage',
  ];

  const benefits = [
    'Built specifically for UK lease transfers',
    'Clear monthly payment and term comparison',
    'Upload lease documents for review',
    'Highlight upfront incentives',
    'Cleaner, more trusted listings than general classifieds',
    'A simple path out of a lease without the confusion',
  ];

  const setupChecklist = [
    'Connect your domain to Vercel',
    'Create an Airtable base for sellers, buyers, and listings',
    'Choose a form backend: Tally, Airtable form, or Supabase',
    'Create a review email inbox such as hello@yourdomain.co.uk',
    'Write Terms, Privacy Policy, and Disclaimer pages',
    'Set up a manual review checklist for finance-provider approval rules',
    'Add analytics like Plausible or Google Analytics',
    'Create a simple process for publishing only verified listings',
  ];

  const [listings, setListings] = useState(initialListings);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [listingForm, setListingForm] = useState(blankListingForm);
  const [listingSubmitted, setListingSubmitted] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [enquiryForm, setEnquiryForm] = useState(blankEnquiryForm);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearch =
        listing.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.financeProvider.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPayment =
        paymentFilter === 'all' ||
        (paymentFilter === '300' && listing.paymentValue < 300) ||
        (paymentFilter === '500' && listing.paymentValue < 500) ||
        (paymentFilter === '700' && listing.paymentValue < 700);

      const matchesStatus =
        statusFilter === 'all' || listing.transferStatus.toLowerCase() === statusFilter;

      return matchesSearch && matchesPayment && matchesStatus;
    });
  }, [listings, searchTerm, paymentFilter, statusFilter]);

  const handleListingChange = (field, value) => {
    setListingForm((current) => ({ ...current, [field]: value }));
    setListingSubmitted(false);
  };

  const handleEnquiryChange = (field, value) => {
    setEnquiryForm((current) => ({ ...current, [field]: value }));
    setEnquirySubmitted(false);
  };

  const handleListingSubmit = (event) => {
    event.preventDefault();

    const newListing = {
      id: Date.now(),
      make: listingForm.vehicle || 'New vehicle submission',
      paymentValue: Number(listingForm.monthlyPayment || 0),
      payment: listingForm.monthlyPayment
        ? `£${listingForm.monthlyPayment}/mo`
        : 'Payment to review',
      remainingMonths: Number(listingForm.monthsRemaining || 0),
      remaining: listingForm.monthsRemaining
        ? `${listingForm.monthsRemaining} months left`
        : 'Term to review',
      mileage: listingForm.annualMileage
        ? `${listingForm.annualMileage} miles/year`
        : 'Mileage to review',
      incentiveValue: Number(listingForm.incentive || 0),
      incentive: listingForm.incentive
        ? `£${Number(listingForm.incentive).toLocaleString()} incentive`
        : 'No incentive added',
      location: listingForm.location || 'Location to review',
      transferStatus:
        listingForm.transferAllowed === 'Yes' ? 'Awaiting review' : 'Needs check',
      financeProvider: listingForm.financeProvider || 'Provider to review',
      image:
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80',
      notes: listingForm.notes || 'Seller submitted via trial form.',
    };

    setListings((current) => [newListing, ...current]);
    setListingForm(blankListingForm);
    setListingSubmitted(true);
  };

  const handleEnquirySubmit = (event) => {
    event.preventDefault();
    setEnquirySubmitted(true);
    setEnquiryForm(blankEnquiryForm);
  };

  const openListing = (listing) => {
    setSelectedListing(listing);
    setEnquirySubmitted(false);
    setEnquiryForm({
      ...blankEnquiryForm,
      message: `Hi, I am interested in the ${listing.make} listing in ${listing.location}.`,
    });
  };

  const statusBadgeClasses = {
    Verified: 'bg-emerald-400/15 text-emerald-300',
    'Awaiting review': 'bg-amber-400/15 text-amber-200',
    'Needs check': 'bg-rose-400/15 text-rose-200',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <div className="text-xl font-black tracking-tight">LeaseShift UK</div>
            <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Lease transfer marketplace
            </div>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#browse" className="transition hover:text-white">Browse Cars</a>
            <a href="#how-it-works" className="transition hover:text-white">How It Works</a>
            <a href="#list-your-lease" className="transition hover:text-white">List Your Lease</a>
            <a href="#setup" className="transition hover:text-white">Setup</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </nav>
          <div className="flex gap-3">
            <button className="rounded-2xl border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5">
              Admin login
            </button>
            <a
              href="#list-your-lease"
              className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Start trial listing
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_30%),radial-gradient(circle_at_left,rgba(16,185,129,0.18),transparent_25%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
                The UK marketplace for car lease takeovers
              </div>
              <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Get out of your lease. Or take over a better one.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                LeaseShift UK helps drivers transfer lease vehicles with verified terms,
                structured listings, document checks, and clear incentives.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#browse"
                  className="rounded-2xl bg-white px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  Browse lease deals
                </a>
                <a
                  href="#list-your-lease"
                  className="rounded-2xl border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Post your vehicle
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-black">{listings.length}</div>
                  <div className="text-sm text-slate-400">Trial listings loaded</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-black">24h</div>
                  <div className="text-sm text-slate-400">Target review time</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-black">Manual</div>
                  <div className="text-sm text-slate-400">Compliance-first approval</div>
                </div>
              </div>
            </div>

            <div className="lg:pl-10">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80"
                  alt="Featured lease vehicle"
                  className="h-72 w-full object-cover"
                />
                <div className="grid gap-4 p-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                    <div className="text-sm text-slate-400">Trial ready</div>
                    <div className="mt-2 text-2xl font-bold">Working MVP flow</div>
                    <div className="mt-1 text-slate-300">Browse · submit · enquire</div>
                    <div className="mt-4 inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                      No full build required yet
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                    <div className="text-sm text-slate-400">Trust layer</div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-200">
                      <li>✓ Lease document review</li>
                      <li>✓ Guided photo upload</li>
                      <li>✓ Clear transfer fees</li>
                      <li>✓ Simple enquiry workflow</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="browse" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Featured vehicles
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Lease takeovers buyers actually want
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search make, location, or provider"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 md:w-64"
              />
              <select
                value={paymentFilter}
                onChange={(event) => setPaymentFilter(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              >
                <option value="all">Any payment</option>
                <option value="300">Under £300</option>
                <option value="500">Under £500</option>
                <option value="700">Under £700</option>
              </select>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
              >
                <option value="all">Any status</option>
                <option value="verified">Verified</option>
                <option value="awaiting review">Awaiting review</option>
                <option value="needs check">Needs check</option>
              </select>
            </div>
          </div>

          <div className="mb-5 text-sm text-slate-400">
            Showing {filteredListings.length} of {listings.length} listings
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredListings.map((car) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-white/20"
              >
                <img src={car.image} alt={car.make} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold">{car.make}</h3>
                      <p className="mt-1 text-sm text-slate-400">{car.location}</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
                      {car.incentive}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses[car.transferStatus] || 'bg-white/10 text-white'}`}>
                      {car.transferStatus}
                    </span>
                    <span className="text-xs text-slate-400">{car.financeProvider}</span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-300">
                    <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                      <div className="text-slate-500">Payment</div>
                      <div className="mt-1 font-semibold text-white">{car.payment}</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                      <div className="text-slate-500">Term left</div>
                      <div className="mt-1 font-semibold text-white">{car.remaining}</div>
                    </div>
                    <div className="col-span-2 rounded-xl border border-white/10 bg-slate-900/70 p-3">
                      <div className="text-slate-500">Mileage allowance</div>
                      <div className="mt-1 font-semibold text-white">{car.mileage}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => openListing(car)}
                    className="mt-5 w-full rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]"
                  >
                    View deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                How it works
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                A safer path to transfer a lease
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-[1.75rem] border border-white/10 bg-slate-900 p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-lg font-black text-emerald-300">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="seller-tools" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Seller setup
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Guided photos that make every listing look better
              </h2>
              <p className="mt-4 max-w-2xl text-slate-300">
                Help sellers upload consistent, high-converting photos with simple prompts and example angles.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {photoTips.map((tip) => (
                  <div key={tip} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-slate-200">
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Document review
              </p>
              <h3 className="mt-2 text-2xl font-black">Lease agreement upload</h3>
              <p className="mt-4 text-slate-300">
                Collect the data that matters before a listing goes live.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Finance company name',
                  'Monthly payment amount',
                  'Months remaining',
                  'Mileage allowance',
                  'Transfer fee',
                  'Transfer permitted? yes / no / not sure',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="#list-your-lease"
                className="mt-8 block w-full rounded-2xl bg-white px-5 py-4 text-center font-semibold text-slate-950 transition hover:scale-[1.01]"
              >
                Start a verified listing
              </a>
            </div>
          </div>
        </section>

        <section id="list-your-lease" className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                  Trial listing form
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                  Test demand without building the full platform first
                </h2>
                <p className="mt-4 max-w-xl leading-7 text-slate-300">
                  Use this form-led MVP to collect leads, review lease terms manually, and only publish listings that pass your checks.
                </p>

                <div className="mt-8 grid gap-4">
                  {trialSteps.map((step) => (
                    <div key={step.title} className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-5">
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="mt-2 text-slate-300">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      Free trial listing
                    </div>
                    <h3 className="mt-2 text-2xl font-black">Submit your lease for review</h3>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                    Manual approval
                  </div>
                </div>

                <form onSubmit={handleListingSubmit} className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Full name</label>
                    <input value={listingForm.fullName} onChange={(event) => handleListingChange('fullName', event.target.value)} type="text" placeholder="Full name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Email address</label>
                    <input value={listingForm.email} onChange={(event) => handleListingChange('email', event.target.value)} type="email" placeholder="Email address" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Phone number</label>
                    <input value={listingForm.phone} onChange={(event) => handleListingChange('phone', event.target.value)} type="text" placeholder="Phone number" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Vehicle make and model</label>
                    <input value={listingForm.vehicle} onChange={(event) => handleListingChange('vehicle', event.target.value)} type="text" placeholder="Vehicle make and model" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Monthly payment</label>
                    <input value={listingForm.monthlyPayment} onChange={(event) => handleListingChange('monthlyPayment', event.target.value)} type="number" placeholder="489" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Months remaining</label>
                    <input value={listingForm.monthsRemaining} onChange={(event) => handleListingChange('monthsRemaining', event.target.value)} type="number" placeholder="18" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Annual mileage allowance</label>
                    <input value={listingForm.annualMileage} onChange={(event) => handleListingChange('annualMileage', event.target.value)} type="number" placeholder="10000" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Current mileage</label>
                    <input value={listingForm.currentMileage} onChange={(event) => handleListingChange('currentMileage', event.target.value)} type="number" placeholder="8200" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Finance provider</label>
                    <input value={listingForm.financeProvider} onChange={(event) => handleListingChange('financeProvider', event.target.value)} type="text" placeholder="Arval, Alphabet, Lex Autolease..." className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Transfer allowed?</label>
                    <select value={listingForm.transferAllowed} onChange={(event) => handleListingChange('transferAllowed', event.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                      <option>Not sure</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Transfer fee if known</label>
                    <input value={listingForm.transferFee} onChange={(event) => handleListingChange('transferFee', event.target.value)} type="text" placeholder="e.g. £250" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">Incentive offered</label>
                    <input value={listingForm.incentive} onChange={(event) => handleListingChange('incentive', event.target.value)} type="number" placeholder="1500" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-slate-300">Postcode or location</label>
                    <input value={listingForm.location} onChange={(event) => handleListingChange('location', event.target.value)} type="text" placeholder="Manchester" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-slate-300">Anything buyers should know?</label>
                    <textarea
                      rows={4}
                      value={listingForm.notes}
                      onChange={(event) => handleListingChange('notes', event.target.value)}
                      placeholder="Add vehicle condition, reason for transfer, or any extra info"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
                    <label className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 p-5 text-sm text-slate-300">
                      <span className="block font-semibold text-white">Upload vehicle photos</span>
                      <input type="file" multiple className="mt-4 block w-full text-xs text-slate-400" />
                      <span className="mt-2 block">Front 3/4, rear 3/4, interior, mileage, wheels, and any damage.</span>
                    </label>
                    <label className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 p-5 text-sm text-slate-300">
                      <span className="block font-semibold text-white">Upload lease agreement</span>
                      <input type="file" className="mt-4 block w-full text-xs text-slate-400" />
                      <span className="mt-2 block">PDF review helps confirm transfer rules before the listing goes live.</span>
                    </label>
                  </div>

                  <div className="md:col-span-2 rounded-[1.5rem] border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-50">
                    By submitting this form, the seller confirms the information is accurate to the best of their knowledge and understands that any transfer remains subject to finance provider approval.
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
                    <button type="submit" className="rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:scale-[1.01]">
                      Submit for review
                    </button>
                    <button type="button" className="rounded-2xl border border-white/15 px-6 py-4 font-semibold text-white transition hover:border-white/30 hover:bg-white/5">
                      Ask a question first
                    </button>
                  </div>

                  {listingSubmitted && (
                    <div className="md:col-span-2 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-5 text-sm text-emerald-100">
                      Trial submission saved. In the live version, this is where you will send data to Airtable, Tally, or Supabase for manual review.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Compliance-first launch
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Stay useful without stepping into regulated territory
              </h2>
              <div className="mt-6 space-y-4">
                {compliancePoints.map((point) => (
                  <div key={point} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    <div className="text-slate-200">{point}</div>
                  </div>
                ))}
              </div>
            </div>

            <div id="setup" className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Trial setup checklist
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">What you need to connect next</h2>
              <div className="mt-8 space-y-4">
                {setupChecklist.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900 p-4 text-slate-200">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-sm font-bold text-emerald-300">
                      {index + 1}
                    </div>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Why this wins
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Built for a niche others ignore</h2>
              <div className="mt-6 space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    <div className="text-slate-200">{benefit}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Revenue model
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Simple monetisation from day one</h2>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {[
                  { title: 'Listing fee', price: '£29', text: 'Charge sellers to publish a verified vehicle.' },
                  { title: 'Success fee', price: '£199', text: 'Take a fee when a lease transfer completes.' },
                  { title: 'Premium boost', price: '£49', text: 'Featured placement for high-priority listings.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-5">
                    <div className="text-sm text-slate-400">{item.title}</div>
                    <div className="mt-2 text-3xl font-black">{item.price}</div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-6 text-emerald-100">
                <div className="text-sm font-semibold uppercase tracking-[0.2em]">Best starting model</div>
                <div className="mt-2 text-2xl font-black">£29 listing + £199 success fee</div>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50/90">
                  Easy to understand, low friction for sellers, and strong enough margins to support manual review in the early stage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="border-t border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                FAQ
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Common questions from lease buyers and sellers
              </h2>
            </div>

            <div className="mt-10 grid gap-4">
              {[
                {
                  q: 'Can I transfer any car lease?',
                  a: 'Not always. Some finance providers allow transfers, some restrict them, and some apply a transfer fee. That is why lease document review matters.',
                },
                {
                  q: 'Why not just use a normal car marketplace?',
                  a: 'Because lease takeovers need different information: monthly payment, term left, mileage limits, transfer eligibility, and incentives.',
                },
                {
                  q: 'How do incentives work?',
                  a: 'A current lease holder may offer money upfront to encourage someone to take over the remaining term. Your platform can make that value clear on every listing.',
                },
                {
                  q: 'Do you arrange the finance transfer?',
                  a: 'No. LeaseShift UK acts as a marketplace and review layer. Any contract transfer must be approved and completed by the finance provider.',
                },
                {
                  q: 'Can I submit a lease if I am not sure whether transfer is allowed?',
                  a: 'Yes. The trial process can collect the agreement and review it manually before any listing is published.',
                },
              ].map((item) => (
                <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-6">
                  <h3 className="text-lg font-bold">{item.q}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-emerald-400/20 via-white/5 to-blue-400/10 p-8 md:p-12">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200">
                Launch your trial
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
                Go live with a form-led MVP, manual review, and verified listings.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-200">
                This version is designed to test the market fast, stay practical, and avoid spending thousands before demand is proven.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#list-your-lease"
                  className="rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  Launch trial listing flow
                </a>
                <a
                  href="#setup"
                  className="rounded-2xl border border-white/15 px-6 py-4 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Review setup checklist
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="text-xl font-black">LeaseShift UK</div>
                <div className="text-sm text-slate-400">A marketplace for UK lease transfers</div>
              </div>

              <div className="flex gap-6 text-sm text-slate-400">
                <a href="#browse" className="hover:text-white">Browse</a>
                <a href="#list-your-lease" className="hover:text-white">List your lease</a>
                <a href="#faq" className="hover:text-white">FAQ</a>
              </div>
            </div>

            <div className="mt-6 text-xs text-slate-500">
              LeaseShift UK is a marketplace and does not provide financial advice. All lease transfers are subject to approval by the relevant finance provider.
            </div>
          </div>
        </footer>
      </main>

      {selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-900 p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-emerald-300">Listing details</div>
                <h3 className="mt-2 text-3xl font-black">{selectedListing.make}</h3>
                <p className="mt-2 text-slate-400">{selectedListing.location} · {selectedListing.financeProvider}</p>
              </div>
              <button
                onClick={() => setSelectedListing(null)}
                className="rounded-2xl border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/5"
              >
                Close
              </button>
            </div>

            <img src={selectedListing.image} alt={selectedListing.make} className="h-72 w-full rounded-[1.5rem] object-cover" />

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500">Payment</div>
                <div className="mt-2 text-lg font-bold">{selectedListing.payment}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500">Term left</div>
                <div className="mt-2 text-lg font-bold">{selectedListing.remaining}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500">Mileage</div>
                <div className="mt-2 text-lg font-bold">{selectedListing.mileage}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.15em] text-slate-500">Incentive</div>
                <div className="mt-2 text-lg font-bold">{selectedListing.incentive}</div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <div className="text-sm uppercase tracking-[0.2em] text-slate-400">Seller notes</div>
              <p className="mt-3 leading-7 text-slate-200">{selectedListing.notes}</p>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-emerald-300">Buyer enquiry</div>
                  <h4 className="mt-2 text-2xl font-black">Register your interest</h4>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClasses[selectedListing.transferStatus] || 'bg-white/10 text-white'}`}>
                  {selectedListing.transferStatus}
                </span>
              </div>

              <form onSubmit={handleEnquirySubmit} className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Full name</label>
                  <input value={enquiryForm.fullName} onChange={(event) => handleEnquiryChange('fullName', event.target.value)} type="text" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Email address</label>
                  <input value={enquiryForm.email} onChange={(event) => handleEnquiryChange('email', event.target.value)} type="email" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-slate-300">Phone number</label>
                  <input value={enquiryForm.phone} onChange={(event) => handleEnquiryChange('phone', event.target.value)} type="text" className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-slate-300">Message</label>
                  <textarea value={enquiryForm.message} onChange={(event) => handleEnquiryChange('message', event.target.value)} rows={4} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
                  <button type="submit" className="rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:scale-[1.01]">
                    Send enquiry
                  </button>
                  <button type="button" onClick={() => setSelectedListing(null)} className="rounded-2xl border border-white/15 px-6 py-4 font-semibold text-white transition hover:border-white/30 hover:bg-white/5">
                    Close listing
                  </button>
                </div>
                {enquirySubmitted && (
                  <div className="md:col-span-2 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-5 text-sm text-emerald-100">
                    Enquiry captured. In the live setup, send this straight to Airtable or email so you can manually connect buyer and seller.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}