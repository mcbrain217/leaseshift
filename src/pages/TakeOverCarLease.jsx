import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function TakeOverCarLease() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>How To Take Over Someone Else's Car Lease | LeaseShift UK</title>
        <meta
          name="description"
          content="Learn how to safely take over a UK car lease, from assessing value to passing finance checks and completing handover."
        />
        <meta property="og:title" content="How To Take Over Someone Else's Car Lease | LeaseShift UK" />
        <meta
          property="og:description"
          content="A step-by-step guide for drivers considering a lease takeover in the UK."
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">How to take over someone else's car lease</h1>
        <p className="mt-4 text-slate-300">
          Taking over a lease can offer strong value, but only when terms are clear and provider approval is in place. Focus on contract details before committing.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Review the core contract details</h2>
          <p className="mt-3 text-slate-300">
            Check monthly payment, remaining term, mileage allowance, and any transfer fee. Make sure the numbers suit your driving needs and budget.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Assess vehicle condition carefully</h2>
          <p className="mt-3 text-slate-300">
            Review service history, tyre condition, and damage notes. A realistic condition view protects you from unexpected costs later.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Understand incentives and fees</h2>
          <p className="mt-3 text-slate-300">
            Some sellers offer incentives to support a faster handover. Confirm what is included and when payment is made.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Complete provider application checks</h2>
          <p className="mt-3 text-slate-300">
            You will normally need to complete affordability and credit checks with the finance provider. Approval is required before any transfer can complete.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Confirm handover in writing</h2>
          <p className="mt-3 text-slate-300">
            Agree key handover date, mileage at handover, and document transfer clearly. Written records reduce misunderstandings for both parties.
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
