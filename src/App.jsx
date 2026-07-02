import { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import ListingPage from './ListingPage';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import Disclaimer from './Disclaimer';
import Contact from './Contact';
import HowToTransferLease from './pages/HowToTransferLease';
import GetOutOfLeaseEarly from './pages/GetOutOfLeaseEarly';
import LeaseTransferVsEarlyTermination from './pages/LeaseTransferVsEarlyTermination';
import LeaseCompaniesAllowTransfers from './pages/LeaseCompaniesAllowTransfers';
import LeaseTransferFees from './pages/LeaseTransferFees';
import TakeOverCarLease from './pages/TakeOverCarLease';
import BestLeaseTransferDeals from './pages/BestLeaseTransferDeals';
import LeaseTransferIncentives from './pages/LeaseTransferIncentives';
import TeslaLeaseTransferUK from './pages/TeslaLeaseTransferUK';
import PorscheLeaseTransferUK from './pages/PorscheLeaseTransferUK';
import KnowledgeHub from './pages/KnowledgeHub';

const initialListings = [
    {
      id: 1,
      make: 'BMW M340i Touring',
      slug: 'bmw-m340i-touring',
      paymentValue: 489,
      payment: '£489/mo',
      remainingMonths: 18,
      remaining: '18 months left',
      mileage: '10,000 miles/year',
      incentiveValue: 1500,
      incentive: '£1,500 incentive',
      location: 'Manchester',
      transferStatus: 'Example listing',
      financeProvider: 'Alphabet',
      image:
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      favouriteImage:
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      homepageImage:
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      ],
      notes: 'Well looked after, full service history, transfer fee known.',
    },
    {
      id: 2,
      make: 'Tesla Model Y',
      slug: 'tesla-model-y',
      paymentValue: 599,
      payment: '£599/mo',
      remainingMonths: 22,
      remaining: '22 months left',
      mileage: '8,000 miles/year',
      incentiveValue: 2000,
      incentive: '£2,000 incentive',
      location: 'Birmingham',
      transferStatus: 'Example listing',
      financeProvider: 'Arval',
      image:
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      favouriteImage:
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      homepageImage:
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      ],
      notes: 'Home charger included separately if buyer is interested.',
    },
    {
      id: 3,
      make: 'Audi Q5 S Line',
      slug: 'audi-q5-s-line',
      paymentValue: 429,
      payment: '£429/mo',
      remainingMonths: 14,
      remaining: '14 months left',
      mileage: '12,000 miles/year',
      incentiveValue: 750,
      incentive: '£750 incentive',
      location: 'Leeds',
      transferStatus: 'Example listing',
      financeProvider: 'Lex Autolease',
      image:
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
      favouriteImage:
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
      homepageImage:
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
      ],
      notes: 'Clean interior, two keys, available in two weeks.',
    },
  ];

const calculateRemainingTerm = (leaseEndDate) => {
  if (!leaseEndDate) {
    return { remainingMonths: null, remainingLabel: 'Term to review' };
  }

  const today = new Date();
  const endDate = new Date(leaseEndDate);

  if (Number.isNaN(endDate.getTime())) {
    return { remainingMonths: null, remainingLabel: 'Term to review' };
  }

  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const endUtc = Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate());
  const dayMs = 24 * 60 * 60 * 1000;
  const totalDays = Math.max(0, Math.ceil((endUtc - todayUtc) / dayMs));

  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;

  if (totalDays === 0) {
    return { remainingMonths: 0, remainingLabel: '0 days left' };
  }

  const monthPart = months > 0 ? `${months} month${months === 1 ? '' : 's'}` : '';
  const dayPart = days > 0 ? `${days} day${days === 1 ? '' : 's'}` : '';
  const separator = monthPart && dayPart ? ' ' : '';

  return {
    remainingMonths: Math.ceil(totalDays / 30),
    remainingLabel: `${monthPart}${separator}${dayPart} left`,
  };
};

export default function LeaseTransferUKMarketplace() {
  const blankListingForm = {
    fullName: '',
    email: '',
    phone: '',
    vehicle: '',
    monthlyPayment: '',
    leaseEndDate: '',
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

  const blankWantedForm = {
    fullName: '',
    email: '',
    phone: '',
    vehicle: '',
    monthlyBudget: '',
    maxTermRemaining: '',
    annualMileage: '',
    location: '',
    urgency: 'Flexible',
    notes: '',
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
      text: 'Upload your vehicle, monthly payment, lease end date, mileage allowance, and incentive offer in a few minutes.',
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

  const faqs = [
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
      a: 'A current lease holder may offer money upfront to encourage someone to take over the remaining term.',
    },
    {
      q: 'Do you arrange the finance transfer?',
      a: 'No. LeaseShift acts as a marketplace and review layer. Any contract transfer must be approved and completed by the finance provider.',
    },
    {
      q: 'Can I submit a lease if I am not sure whether transfer is allowed?',
      a: 'Yes, however it is in everyone\'s interests to ascertain this prior to listing to save hassle and money.',
    },
  ];

  const [listings, setListings] = useState(initialListings);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [listingForm, setListingForm] = useState(blankListingForm);
  const [listingSubmitted, setListingSubmitted] = useState(false);
  const [wantedForm, setWantedForm] = useState(blankWantedForm);
  const [wantedSubmitted, setWantedSubmitted] = useState(false);
  const [listingsLoading, setListingsLoading] = useState(true);
  const [hasLiveListings, setHasLiveListings] = useState(false);
  const [refreshAvailable, setRefreshAvailable] = useState(false);
  const listingsVersionRef = useRef(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/get-listings');
        if (response.ok) {
          const data = await response.json();
          listingsVersionRef.current = data.version || null;
          if (data.listings && data.listings.length > 0) {
            setListings(data.listings);
            setHasLiveListings(true);
          } else {
            setListings(initialListings);
            setHasLiveListings(false);
          }
        } else {
          setListings(initialListings);
          setHasLiveListings(false);
        }
      } catch (error) {
        setApiError(true);
        setListings([]);
        setHasLiveListings(false);
      } finally {
        setListingsLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await fetch('/api/get-listings', { cache: 'no-store' });
        if (!response.ok) return;

        const data = await response.json();
        if (!data.version || !listingsVersionRef.current) return;
        if (data.version === listingsVersionRef.current) return;

        if (typeof document !== 'undefined' && !document.hasFocus()) {
          window.location.reload();
          return;
        }

        setRefreshAvailable(true);
      } catch (error) {
        console.error('Refresh check failed:', error);
      }
    };

    const intervalId = window.setInterval(checkForUpdates, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

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

  const handleWantedChange = (field, value) => {
    setWantedForm((current) => ({ ...current, [field]: value }));
    setWantedSubmitted(false);
  };

  const handleListingSubmit = async (event) => {
    event.preventDefault();
    let listingSubmissionSuccessful = false;

    try {
      const response = await fetch('/api/submit-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'Full Name': listingForm.fullName,
          'Email': listingForm.email,
          'Phone': listingForm.phone,
          'Vehicle': listingForm.vehicle,
          'Monthly Payment': Number(listingForm.monthlyPayment || 0),
          'Lease End Date': listingForm.leaseEndDate || '',
          'Permitted Annual Mileage': Number(listingForm.annualMileage || 0),
          'Current Mileage': Number(listingForm.currentMileage || 0),
          'Finance Provider': listingForm.financeProvider,
          'Transfer Allowed': listingForm.transferAllowed,
          'Transfer Fee': Number(listingForm.transferFee || 0),
          'Incentive': Number(listingForm.incentive || 0),
          'Location': listingForm.location,
          'Notes': listingForm.notes,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Airtable error full response:', JSON.stringify(result, null, 2));
      } else {
        listingSubmissionSuccessful = true;
      }
    } catch (error) {
      console.error('Submission error:', error);
    }

    if (listingSubmissionSuccessful && typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const calculatedTerm = calculateRemainingTerm(listingForm.leaseEndDate);
      window.gtag('event', 'listing_submitted', {
        vehicle: listingForm.vehicle,
        monthly_payment: Number(listingForm.monthlyPayment || 0),
        months_remaining: Number(calculatedTerm.remainingMonths || 0),
        finance_provider: listingForm.financeProvider,
      });
    }

    const calculatedTerm = calculateRemainingTerm(listingForm.leaseEndDate);

    const newListing = {
      id: Date.now(),
      make: listingForm.vehicle || 'New vehicle submission',
      slug: (listingForm.vehicle || 'new-vehicle-submission')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-'),
      paymentValue: Number(listingForm.monthlyPayment || 0),
      payment: listingForm.monthlyPayment
        ? `£${listingForm.monthlyPayment}/mo`
        : 'Payment to review',
      leaseEndDate: listingForm.leaseEndDate || '',
      remainingMonths: calculatedTerm.remainingMonths,
      remaining: calculatedTerm.remainingLabel,
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
      favouriteImage:
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80',
      homepageImage:
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80',
      images: [
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80',
      ],
      notes: listingForm.notes || 'Seller submitted via trial form.',
    };

    setListings((current) => [newListing, ...current]);
    setListingForm(blankListingForm);
    setListingSubmitted(true);
  };

  const handleWantedSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/submit-wanted', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'Buyer Name': wantedForm.fullName,
          'Buyer Email': wantedForm.email,
          'Buyer Phone': wantedForm.phone,
          'Vehicle Interested In': wantedForm.vehicle,
          'Monthly Budget': wantedForm.monthlyBudget ? Number(wantedForm.monthlyBudget) : null,
          'Max Term Remaining': wantedForm.maxTermRemaining ? Number(wantedForm.maxTermRemaining) : null,
          'Preferred Annual Mileage': wantedForm.annualMileage ? Number(wantedForm.annualMileage) : null,
          'Preferred Location': wantedForm.location,
          'Urgency': wantedForm.urgency,
          'Message': wantedForm.notes,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        console.error('Wanted submission failed:', result);
        return;
      }

      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'wanted_submitted', {
          vehicle_interest: wantedForm.vehicle,
          monthly_budget: Number(wantedForm.monthlyBudget || 0),
          location: wantedForm.location,
        });
      }

      setWantedForm(blankWantedForm);
      setWantedSubmitted(true);
    } catch (error) {
      console.error('Wanted submission error:', error);
    }
  };

  const statusBadgeClasses = {
    Verified: 'bg-emerald-400/15 text-emerald-300',
    'Awaiting review': 'bg-amber-400/15 text-amber-200',
    'Needs check': 'bg-rose-400/15 text-rose-200',
    'Example listing': 'bg-blue-400/15 text-blue-300',
  };

  return (
    <>
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z36DDPR3SH"></script>
        <script>
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-Z36DDPR3SH');
gtag('event', 'leaseshift_launch', {
  launch_date: '2026-03-12'
});
`}
        </script>
      </Helmet>
      <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-slate-950 text-white">
          <Helmet>
            <title>LeaseShift UK | Car Lease Transfer Marketplace</title>
            <meta
              name="description"
              content="Browse and list UK car lease transfer opportunities. LeaseShift helps drivers exit a lease or take over an existing lease deal."
            />
            <meta property="og:title" content="LeaseShift UK | Car Lease Transfer Marketplace" />
            <meta
              property="og:description"
              content="Browse and list UK car lease transfer opportunities. LeaseShift helps drivers exit a lease or take over an existing lease deal."
            />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80" />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "LeaseShift UK",
                "url": "https://www.leaseshift.co.uk",
                "description": "LeaseShift UK is a marketplace for car lease transfers and lease takeovers in the UK.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.leaseshift.co.uk/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "LeaseShift UK",
                  "url": "https://www.leaseshift.co.uk"
                }
              })}
            </script>
          </Helmet>
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
            <a href="#wanted" className="transition hover:text-white">Wanted</a>
            <a href="#how-it-works" className="transition hover:text-white">How It Works</a>
            <a href="#list-your-lease" className="transition hover:text-white">List Your Lease</a>
            <a href="#compliance" className="transition hover:text-white">Compliance</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </nav>
          <div className="flex gap-3">
            <button
              className="rounded-2xl border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Admin login
            </button>
            <a
              href="#list-your-lease"
              className="hidden rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] md:inline-flex"
            >
              List your lease
            </a>
            <button
              className="rounded-2xl border border-white/15 px-3 py-2 text-sm text-white md:hidden"
              onClick={() => setMobileNavOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className="border-t border-white/10 bg-slate-950 px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-4 text-sm text-slate-300">
              <a href="#browse" className="transition hover:text-white" onClick={() => setMobileNavOpen(false)}>Browse Cars</a>
              <a href="#wanted" className="transition hover:text-white" onClick={() => setMobileNavOpen(false)}>Wanted</a>
              <a href="#how-it-works" className="transition hover:text-white" onClick={() => setMobileNavOpen(false)}>How It Works</a>
              <a href="#list-your-lease" className="transition hover:text-white" onClick={() => setMobileNavOpen(false)}>List Your Lease</a>
              <a href="#compliance" className="transition hover:text-white" onClick={() => setMobileNavOpen(false)}>Compliance</a>
              <a href="#faq" className="transition hover:text-white" onClick={() => setMobileNavOpen(false)}>FAQ</a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section id="browse" className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                A UK marketplace for approved car lease transfers.
              </p>
              <h2 className="text-3xl font-black tracking-tight">
                {hasLiveListings ? 'Latest lease transfer opportunities' : 'Example lease listings'}
              </h2>
              <p className="mt-2 text-slate-300">
                {hasLiveListings
                  ? 'Find verified lease transfers in your area'
                  : 'These sample listings show how approved lease transfer opportunities will appear on LeaseShift.'
                }
              </p>
              {refreshAvailable && (
                <div className="mt-4 flex flex-col gap-3 rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100 md:flex-row md:items-center md:justify-between">
                  <p>New or updated listings are available.</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Refresh listings
                  </button>
                </div>
              )}
            </div>
            <div className="mb-8 flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Search by make, location, or provider..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
              />
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
              >
                <option value="all">All payments</option>
                <option value="300">Under £300/mo</option>
                <option value="500">Under £500/mo</option>
                <option value="700">Under £700/mo</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
              >
                <option value="all">All statuses</option>
                <option value="verified">Verified</option>
              </select>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => {
                  const isNewListing =
                    listing.createdAt &&
                    Date.now() - new Date(listing.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;

                  const effectiveSlug =
                    listing.slug ||
                    (listing.make
                      ? listing.make
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, '')
                          .trim()
                          .replace(/\s+/g, '-')
                      : null);

                  if (!effectiveSlug) return null;

                  return (
                    <Link
                      key={listing.id || effectiveSlug}
                      to={`/listing/${effectiveSlug}`}
                      className="block cursor-pointer rounded-lg border border-white/10 bg-slate-900 p-6 transition hover:border-white/20"
                    >
                      <div className="relative mb-4">
                        <img
                          src={listing.homepageImage || listing.favouriteImage || listing.image}
                          alt={listing.make}
                          loading="lazy"
                          className="h-48 w-full rounded-lg object-cover"
                        />
                        {isNewListing && (
                          <span className="absolute right-3 top-3 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white">
                            Just added
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold">{listing.make}</h3>
                      <dl className="mt-4 space-y-2 text-sm">
                        <div className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-2">
                          <dt className="font-semibold text-slate-200">Monthly amount</dt>
                          <dd className="font-semibold text-emerald-300">{listing.payment}</dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-2">
                          <dt className="font-semibold text-slate-200">Term remaining</dt>
                          <dd className="text-slate-300">{listing.remaining}</dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-2">
                          <dt className="font-semibold text-slate-200">Annual mileage</dt>
                          <dd className="text-slate-300">{listing.mileage}</dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-2">
                          <dt className="font-semibold text-slate-200">Incentive</dt>
                          <dd className={listing.incentiveValue ? 'font-semibold text-amber-400' : 'text-slate-400'}>
                            {listing.incentiveValue ? `£${listing.incentiveValue.toLocaleString()} cash incentive` : 'None listed'}
                          </dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-3">
                          <dt className="font-semibold text-slate-200">Location</dt>
                          <dd className="text-slate-300">{listing.location}</dd>
                        </div>
                      </dl>
                      <div className="mt-2 flex items-center gap-2">
                        {listing.featured && (
                          <span className="rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-slate-900">
                            Featured
                          </span>
                        )}
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${statusBadgeClasses[listing.transferStatus]}`}
                        >
                          {listing.transferStatus}
                        </span>
                        <span className="text-xs text-slate-400">Provider: {listing.financeProvider}</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">{listing.notes}</p>
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  {apiError ? (
                    <>
                      <h3 className="text-2xl font-semibold text-white">Unable to load listings right now</h3>
                      <p className="mt-3 max-w-md text-slate-300">
                        There was a problem connecting to our listings service. Please try refreshing the page.
                      </p>
                    </>
                  ) : listings.length > 0 ? (
                    <>
                      <h3 className="text-2xl font-semibold text-white">No listings match your filters</h3>
                      <p className="mt-3 max-w-md text-slate-300">
                        Try adjusting your search or clearing the filters to see all available leases.
                      </p>
                      <button
                        onClick={() => { setSearchTerm(''); setPaymentFilter('all'); setStatusFilter('all'); }}
                        className="mt-6 rounded-lg bg-slate-700 px-6 py-2 font-semibold text-white transition hover:bg-slate-600"
                      >
                        Clear filters
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-semibold text-white">No lease transfer opportunities available right now</h3>
                      <p className="mt-3 max-w-md text-slate-300">
                        New lease takeover deals are reviewed and published regularly. Check back soon or list your own lease.
                      </p>
                      <a
                        href="#list-your-lease"
                        className="mt-6 rounded-lg bg-emerald-600 px-6 py-2 font-semibold text-white transition hover:bg-emerald-500"
                      >
                        List your lease
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-t border-white/10 bg-white/[0.03] py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Lease transfer marketplace
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                List your lease vehicle and connect with drivers looking to take over an existing contract
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-slate-300">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-slate-950 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black tracking-tight">Lease transfer guides</h2>
              <p className="mt-3 text-slate-300">
                Learn how lease transfers work, what fees to expect, and how to exit or take over a car lease in the UK.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Link to="/how-to-transfer-a-car-lease-uk" className="rounded-lg border border-white/10 bg-slate-900 p-4 transition hover:border-white/30">
                How to transfer a car lease in the UK
              </Link>
              <Link to="/get-out-of-car-lease-early" className="rounded-lg border border-white/10 bg-slate-900 p-4 transition hover:border-white/30">
                Can you get out of a car lease early?
              </Link>
              <Link to="/lease-transfer-vs-early-termination" className="rounded-lg border border-white/10 bg-slate-900 p-4 transition hover:border-white/30">
                Lease transfer vs early termination
              </Link>
              <Link to="/which-lease-companies-allow-transfers" className="rounded-lg border border-white/10 bg-slate-900 p-4 transition hover:border-white/30">
                Which lease companies allow transfers?
              </Link>
            </div>
          </div>
        </section>

        <section id="wanted" className="border-t border-white/10 bg-white/[0.03] py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Demand board
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Looking for a specific lease?
              </h2>
              <p className="mt-3 text-slate-300">
                Tell us what you want and we will notify you when matching leases are submitted.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-slate-900 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Most wanted right now</p>
                <p className="mt-2">Tesla Model Y under £550/mo</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-slate-900 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Most wanted right now</p>
                <p className="mt-2">BMW 3 Series with 18 months or less</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-slate-900 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Most wanted right now</p>
                <p className="mt-2">Family SUV around London and South East</p>
              </div>
            </div>

            {wantedSubmitted ? (
              <div className="mt-8 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-6 text-center">
                <h3 className="text-lg font-semibold text-emerald-300">You're on the wanted list</h3>
                <p className="mt-2 text-slate-300">
                  Thanks for sharing your preferences. We'll contact you when a suitable lease appears.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWantedSubmit} className="mt-8 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={wantedForm.fullName}
                    onChange={(e) => handleWantedChange('fullName', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={wantedForm.email}
                    onChange={(e) => handleWantedChange('email', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={wantedForm.phone}
                    onChange={(e) => handleWantedChange('phone', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Vehicle make and model wanted"
                    value={wantedForm.vehicle}
                    onChange={(e) => handleWantedChange('vehicle', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Monthly budget (£)"
                    value={wantedForm.monthlyBudget}
                    onChange={(e) => handleWantedChange('monthlyBudget', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max months remaining"
                    value={wantedForm.maxTermRemaining}
                    onChange={(e) => handleWantedChange('maxTermRemaining', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Preferred annual mileage"
                    value={wantedForm.annualMileage}
                    onChange={(e) => handleWantedChange('annualMileage', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Preferred location"
                    value={wantedForm.location}
                    onChange={(e) => handleWantedChange('location', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                  />
                  <select
                    value={wantedForm.urgency}
                    onChange={(e) => handleWantedChange('urgency', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white focus:border-white/30 focus:outline-none md:col-span-2"
                  >
                    <option value="Flexible">Timing: Flexible</option>
                    <option value="This month">Timing: This month</option>
                    <option value="Next 3 months">Timing: Next 3 months</option>
                  </select>
                </div>

                <textarea
                  placeholder="Any specific trim, fuel type, features, or deal breakers"
                  value={wantedForm.notes}
                  onChange={(e) => handleWantedChange('notes', e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500"
                >
                  Join wanted list
                </button>
              </form>
            )}
          </div>
        </section>

        <section id="list-your-lease" className="py-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-black tracking-tight">List your lease</h2>
              <p className="mt-2 text-slate-300">Free listing - submit your details and we'll review before publishing</p>
            </div>
            {listingSubmitted ? (
              <>
                <div className="mt-8 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-6 text-center">
                  <h3 className="text-lg font-semibold text-emerald-300">Thank you</h3>
                  <p className="mt-2 text-slate-300">
                    Your lease submission has been received. Our team will review the lease details and contact you shortly to request vehicle photos and supporting documents before the listing goes live.
                  </p>
                </div>
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-white">Photos we will request</h4>
                  <ul className="mt-4 space-y-2 text-slate-300">
                    <li>• Front 3/4 view</li>
                    <li>• Rear 3/4 view</li>
                    <li>• Interior dashboard</li>
                    <li>• Current mileage</li>
                    <li>• Wheels and tyres</li>
                    <li>• Any scratches or damage</li>
                  </ul>
                </div>
              </>
            ) : (
              <form onSubmit={handleListingSubmit} className="mt-8 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={listingForm.fullName}
                    onChange={(e) => handleListingChange('fullName', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={listingForm.email}
                    onChange={(e) => handleListingChange('email', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={listingForm.phone}
                    onChange={(e) => handleListingChange('phone', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Vehicle make and model"
                    value={listingForm.vehicle}
                    onChange={(e) => handleListingChange('vehicle', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Monthly payment (£)"
                    value={listingForm.monthlyPayment}
                    onChange={(e) => handleListingChange('monthlyPayment', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <input
                    type="date"
                    value={listingForm.leaseEndDate}
                    onChange={(e) => handleListingChange('leaseEndDate', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Annual mileage"
                    value={listingForm.annualMileage}
                    onChange={(e) => handleListingChange('annualMileage', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Current mileage"
                    value={listingForm.currentMileage}
                    onChange={(e) => handleListingChange('currentMileage', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Finance provider"
                    value={listingForm.financeProvider}
                    onChange={(e) => handleListingChange('financeProvider', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                  <select
                    value={listingForm.transferAllowed}
                    onChange={(e) => handleListingChange('transferAllowed', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
                  >
                    <option value="Not sure">Not sure if transfer allowed</option>
                    <option value="Yes">Yes, transfer allowed</option>
                    <option value="No">No, transfer not allowed</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Transfer fee (£)"
                    value={listingForm.transferFee}
                    onChange={(e) => handleListingChange('transferFee', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Incentive (£)"
                    value={listingForm.incentive}
                    onChange={(e) => handleListingChange('incentive', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={listingForm.location}
                    onChange={(e) => handleListingChange('location', e.target.value)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                    required
                  />
                </div>
                <textarea
                  placeholder="Additional notes"
                  value={listingForm.notes}
                  onChange={(e) => handleListingChange('notes', e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
                >
                  Submit Listing
                </button>
              </form>
            )}
          </div>
        </section>

        

        <section id="compliance" className="border-t border-white/10 bg-white/[0.03] py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Compliance
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Important notices for buyers and sellers
              </h2>
            </div>
            <div className="mt-10">
              <ul className="space-y-4">
                {compliancePoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400"></div>
                    <span className="text-slate-300">{point}</span>
                  </li>
                ))}
              </ul>
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
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{faq.q}</h3>
                  <p className="mt-1 text-slate-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <div className="text-xl font-black tracking-tight">LeaseShift UK</div>
              <p className="text-sm text-slate-400">© 2026 LeaseShift UK. All rights reserved.</p>
            </div>
            <nav className="flex gap-6 text-sm text-slate-300">
              <Link to="/terms" className="transition hover:text-white">Terms of Service</Link>
              <Link to="/privacy" className="transition hover:text-white">Privacy Policy</Link>
              <Link to="/disclaimer" className="transition hover:text-white">Disclaimer</Link>
              <Link to="/contact" className="transition hover:text-white">Contact</Link>
              <Link to="/guides" className="transition hover:text-white">Guides</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
      } />
      <Route path="/listing/:slug" element={<ListingPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/how-to-transfer-a-car-lease-uk" element={<HowToTransferLease />} />
      <Route path="/get-out-of-car-lease-early" element={<GetOutOfLeaseEarly />} />
      <Route path="/lease-transfer-vs-early-termination" element={<LeaseTransferVsEarlyTermination />} />
      <Route path="/which-lease-companies-allow-transfers" element={<LeaseCompaniesAllowTransfers />} />
      <Route path="/lease-transfer-fees" element={<LeaseTransferFees />} />
      <Route path="/take-over-car-lease" element={<TakeOverCarLease />} />
      <Route path="/best-lease-transfer-deals-uk" element={<BestLeaseTransferDeals />} />
      <Route path="/lease-transfer-incentives" element={<LeaseTransferIncentives />} />
      <Route path="/tesla-lease-transfer-uk" element={<TeslaLeaseTransferUK />} />
      <Route path="/porsche-lease-transfer-uk" element={<PorscheLeaseTransferUK />} />
      <Route path="/guides" element={<KnowledgeHub />} />
      <Route path="*" element={
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-6xl font-black">404</h1>
          <p className="mt-4 text-xl text-slate-300">Page not found</p>
          <Link to="/" className="mt-8 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500">
            Back to listings
          </Link>
        </div>
      } />
      </Routes>
    </>
  );
}