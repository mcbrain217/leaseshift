import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function GetOutOfLeaseEarly() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>How To Get Out Of A Car Lease Early In The UK | LeaseShift UK</title>
        <meta
          name="description"
          content="Understand the realistic options for getting out of a UK car lease early, including transfer, settlement, and early termination."
        />
        <meta property="og:title" content="How To Get Out Of A Car Lease Early In The UK | LeaseShift UK" />
        <meta
          property="og:description"
          content="A practical UK guide to leaving a car lease early with lower risk and better cost clarity."
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">How to get out of a car lease early in the UK</h1>
        <p className="mt-4 text-slate-300">
          Leaving a lease early is possible, but the right route depends on your agreement, provider rules, and remaining contract term. Start by comparing all options before making a decision.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Check your contract terms first</h2>
          <p className="mt-3 text-slate-300">
            Your lease agreement sets out early termination rules, transfer eligibility, and any administration costs. Knowing these terms avoids expensive surprises later.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Compare your main options</h2>
          <p className="mt-3 text-slate-300">
            Most drivers consider lease transfer, early settlement, or full early termination. Transfer can be more cost-effective where approved, but it still depends on provider consent.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Estimate total cost, not just headline fees</h2>
          <p className="mt-3 text-slate-300">
            Include transfer fees, settlement figures, and any incentives offered to attract a new driver. A clear total cost comparison helps you choose the least expensive route.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Prepare the vehicle and documents</h2>
          <p className="mt-3 text-slate-300">
            Service history, condition notes, and accurate mileage details improve confidence for potential transferees and reduce delays during checks.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Wait for finance approval before finalising</h2>
          <p className="mt-3 text-slate-300">
            No matter which route you choose, make sure the provider confirms the outcome formally. Responsibility only changes once their process is complete.
          </p>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <a href="/#list-your-lease" className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500">
            List your lease
          </a>
          <Link to="/" className="rounded-lg border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-white/30">
            Browse live listings
          </Link>
        </div>
      </div>
    </div>
  );
}
