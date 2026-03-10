import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function PorscheLeaseTransferUK() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Porsche Lease Transfer Opportunities In The UK | LeaseShift UK</title>
        <meta
          name="description"
          content="Discover Porsche lease transfer opportunities in the UK and assess performance, specification, and total cost with confidence."
        />
        <meta property="og:title" content="Porsche Lease Transfer Opportunities In The UK | LeaseShift UK" />
        <meta
          property="og:description"
          content="A trusted UK guide to reviewing Porsche lease transfer listings, fees, and approval requirements."
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Porsche lease transfer opportunities in the UK</h1>
        <p className="mt-4 text-slate-300">
          Porsche lease transfer listings can be a practical route into premium models, but high-value agreements need careful review of terms, condition, and handover detail.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Confirm model and option pack details</h2>
          <p className="mt-3 text-slate-300">
            Porsche values can shift significantly with options. Check exact model designation, key options, and service records before deciding.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Review monthly cost against total value</h2>
          <p className="mt-3 text-slate-300">
            Do not judge by monthly payment alone. Consider term left, mileage allowance, transfer fees, and any incentive offered.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Check condition and maintenance history</h2>
          <p className="mt-3 text-slate-300">
            Premium vehicles demand thorough condition checks. Ask for clear photos and maintenance evidence to reduce risk.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Plan insurance and running costs early</h2>
          <p className="mt-3 text-slate-300">
            Verify insurance premium expectations and routine running costs before committing. Affordability should include the full ownership picture.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Transfer completion depends on provider approval</h2>
          <p className="mt-3 text-slate-300">
            Finance company approval is mandatory. Final responsibility changes only once the provider confirms completion.
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
