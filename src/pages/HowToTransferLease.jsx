import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function HowToTransferLease() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>How To Transfer A Car Lease In The UK | LeaseShift UK</title>
        <meta
          name="description"
          content="Learn the practical steps to transfer a car lease in the UK, from checking eligibility to completing finance company approval."
        />
        <meta property="og:title" content="How To Transfer A Car Lease In The UK | LeaseShift UK" />
        <meta
          property="og:description"
          content="A clear UK guide to transferring a car lease, including approval, paperwork, and common mistakes to avoid."
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">How to transfer a car lease in the UK</h1>
        <p className="mt-4 text-slate-300">
          Transferring a lease means another eligible driver takes over your agreement with the finance provider's approval. The process is straightforward when you prepare the right details early.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">1. Check whether your agreement allows transfers</h2>
          <p className="mt-3 text-slate-300">
            Review your contract and speak to your finance provider first. Some agreements allow transfers, others restrict them, and some add conditions based on payment history or credit checks.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">2. Prepare an accurate listing</h2>
          <p className="mt-3 text-slate-300">
            Include monthly payment, months remaining, mileage allowance, current mileage, transfer fee information, and any incentive. Accurate information builds trust and attracts serious enquiries.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">3. Screen buyer interest properly</h2>
          <p className="mt-3 text-slate-300">
            Ask basic qualifying questions early, including timeline and budget. This saves time and helps you focus on buyers who are likely to proceed through finance checks.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">4. Complete finance company checks</h2>
          <p className="mt-3 text-slate-300">
            The new driver usually completes an application with the finance company. Approval is at the provider's discretion, so no transfer is final until they confirm acceptance.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">5. Confirm handover and paperwork</h2>
          <p className="mt-3 text-slate-300">
            Agree handover timing, keys, service records, and condition checks in writing. Keep clear records of what was agreed and when responsibility changes.
          </p>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="/#list-your-lease"
            className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
          >
            List your lease
          </a>
          <Link
            to="/"
            className="rounded-lg border border-white/15 px-6 py-3 font-semibold text-white transition hover:border-white/30"
          >
            Browse live listings
          </Link>
        </div>
      </div>
    </div>
  );
}
