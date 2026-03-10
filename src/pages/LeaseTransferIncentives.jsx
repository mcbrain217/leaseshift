import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function LeaseTransferIncentives() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Lease Transfer Incentives Explained | LeaseShift UK</title>
        <meta
          name="description"
          content="Understand lease transfer incentives in the UK, how they work, and how to judge whether an incentive improves deal value."
        />
        <meta property="og:title" content="Lease Transfer Incentives Explained | LeaseShift UK" />
        <meta
          property="og:description"
          content="A practical guide to incentives on lease transfer listings, including risks, timing, and fair use."
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Lease transfer incentives explained</h1>
        <p className="mt-4 text-slate-300">
          Incentives are payments or contributions offered by a current lease holder to encourage someone to take over their agreement. They can improve value when used transparently.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">What an incentive usually covers</h2>
          <p className="mt-3 text-slate-300">
            Incentives may offset transfer fees, reduce early monthly burden, or make a higher payment contract more attractive to the incoming driver.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">How to judge real value</h2>
          <p className="mt-3 text-slate-300">
            Compare the incentive against monthly payment, term left, and allowance. A large incentive does not always make a weak contract a strong deal.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Agree payment timing clearly</h2>
          <p className="mt-3 text-slate-300">
            Both parties should confirm when and how the incentive is paid. Clear written terms reduce confusion during handover.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Keep incentive wording accurate</h2>
          <p className="mt-3 text-slate-300">
            Listings should state the exact amount and conditions. Clear wording helps serious buyers assess value quickly.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Provider approval still comes first</h2>
          <p className="mt-3 text-slate-300">
            Incentives do not replace finance checks or provider consent. The transfer only completes once the finance company confirms approval.
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
