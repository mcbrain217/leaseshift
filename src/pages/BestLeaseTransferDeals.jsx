import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function BestLeaseTransferDeals() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Best Lease Transfer Deals In The UK | LeaseShift UK</title>
        <meta
          name="description"
          content="Find better lease transfer deals in the UK by comparing total value, incentives, mileage terms, and transfer conditions."
        />
        <meta property="og:title" content="Best Lease Transfer Deals In The UK | LeaseShift UK" />
        <meta
          property="og:description"
          content="Learn how to identify genuinely strong UK lease transfer deals and avoid common pricing traps."
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Best lease transfer deals in the UK</h1>
        <p className="mt-4 text-slate-300">
          The best deal is not always the lowest monthly figure. Strong lease transfer value comes from payment level, term left, mileage terms, and total handover cost.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Look at total monthly value</h2>
          <p className="mt-3 text-slate-300">
            Compare the monthly payment against similar vehicles and specification levels. A lower payment on poor terms may not be better overall.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Check remaining months carefully</h2>
          <p className="mt-3 text-slate-300">
            Shorter remaining terms can reduce commitment and risk. Longer terms may still be attractive if pricing and allowance are strong.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Mileage allowance matters</h2>
          <p className="mt-3 text-slate-300">
            A deal only works if the mileage allowance fits your use. Exceeding allowance can create significant end-of-term charges.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Factor in incentives and fees</h2>
          <p className="mt-3 text-slate-300">
            Incentives can improve short-term value, but always account for transfer fees and any expected setup costs.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Prioritise verified listing details</h2>
          <p className="mt-3 text-slate-300">
            Trustworthy deals include clear notes on condition, provider, and transfer status. Better detail usually means a smoother process.
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
