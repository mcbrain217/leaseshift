import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function LeaseTransferVsEarlyTermination() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Lease Transfer Vs Early Termination | UK Guide | LeaseShift UK</title>
        <meta
          name="description"
          content="Compare lease transfer and early termination in the UK, including costs, risk, approval, and when each option may suit."
        />
        <meta property="og:title" content="Lease Transfer Vs Early Termination | UK Guide | LeaseShift UK" />
        <meta
          property="og:description"
          content="A clear comparison of lease transfer and early termination for UK drivers who need to exit a lease agreement."
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Lease transfer vs early termination</h1>
        <p className="mt-4 text-slate-300">
          If you need to exit a lease before the end date, the two common options are transfer or early termination. The better choice depends on costs, timing, and provider policy.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">What lease transfer means</h2>
          <p className="mt-3 text-slate-300">
            A transfer moves the agreement to a new approved driver. You may still pay admin or transfer costs, but this route can reduce larger early termination charges.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">What early termination means</h2>
          <p className="mt-3 text-slate-300">
            Early termination usually ends the agreement directly with the finance provider and can involve a substantial settlement amount.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Cost comparison points</h2>
          <p className="mt-3 text-slate-300">
            Compare transfer fee, incentive offered, and likely time to complete against the early termination quote. Always compare total cost rather than one fee in isolation.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Risk and certainty</h2>
          <p className="mt-3 text-slate-300">
            Transfer depends on finding a suitable new driver and finance approval. Early termination can be faster in some cases, but often carries a higher financial hit.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">When each route may suit</h2>
          <p className="mt-3 text-slate-300">
            Transfer is often useful when the deal is attractive and there is market demand. Early termination may be the fallback where transfers are not allowed or time is critical.
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
