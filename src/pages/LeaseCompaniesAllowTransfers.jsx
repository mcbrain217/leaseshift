import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function LeaseCompaniesAllowTransfers() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Which UK Lease Companies May Allow Transfers? | LeaseShift UK</title>
        <meta
          name="description"
          content="Understand which UK finance companies may allow lease transfers and what checks are normally required."
        />
        <meta property="og:title" content="Which UK Lease Companies May Allow Transfers? | LeaseShift UK" />
        <meta
          property="og:description"
          content="A practical guide to finance provider transfer policies, approval checks, and what to ask before listing."
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Which UK lease companies may allow transfers?</h1>
        <p className="mt-4 text-slate-300">
          Transfer policies vary between providers and products. Some agreements allow transfers, while others restrict or refuse them, so provider confirmation is essential before listing.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Policy differences are normal</h2>
          <p className="mt-3 text-slate-300">
            Even within the same finance group, transfer terms can differ by vehicle type or contract structure. Always check your exact agreement reference, not general assumptions.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Common approval requirements</h2>
          <p className="mt-3 text-slate-300">
            Providers usually require the incoming driver to pass affordability and credit checks. They may also review payment history, mileage, and condition before final approval.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Questions to ask your provider</h2>
          <p className="mt-3 text-slate-300">
            Ask whether transfer is allowed, what fees apply, expected timelines, and what documents are required. Written confirmation helps prevent disputes later.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">List only after confirmation</h2>
          <p className="mt-3 text-slate-300">
            If transfer terms are unclear, delay listing until confirmed. A clear, approved listing attracts better enquiries and avoids wasted time for both parties.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Keep expectations realistic</h2>
          <p className="mt-3 text-slate-300">
            Approval remains at the finance company's discretion in every case. Marketplaces help connect parties, but cannot overrule provider decisions.
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
