import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function LeaseTransferFees() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Car Lease Transfer Fees Explained | LeaseShift UK</title>
        <meta
          name="description"
          content="Understand common UK lease transfer fees, what they cover, and how to calculate your true exit cost."
        />
        <meta property="og:title" content="Car Lease Transfer Fees Explained | LeaseShift UK" />
        <meta
          property="og:description"
          content="A practical UK guide to transfer fees, admin charges, incentives, and realistic budgeting."
        />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Car lease transfer fees explained</h1>
        <p className="mt-4 text-slate-300">
          Transfer fees vary by provider and agreement type. The key is to understand every cost line before agreeing terms with a buyer.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Typical fee types</h2>
          <p className="mt-3 text-slate-300">
            You may see admin fees, transfer processing fees, or credit check related charges. Ask your provider for a full written fee breakdown.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Who usually pays</h2>
          <p className="mt-3 text-slate-300">
            Some deals ask the seller to pay transfer fees, while others split costs or include an incentive to the incoming driver. Be explicit in your listing.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Include incentives in your calculation</h2>
          <p className="mt-3 text-slate-300">
            If you offer a cash incentive, treat it as part of your total exit cost. This gives a more accurate comparison against early termination.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Avoid hidden cost surprises</h2>
          <p className="mt-3 text-slate-300">
            Confirm whether there are extra charges for mileage, damage, or delayed paperwork. Clarify timing so the transfer does not stall close to handover.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Use a total-cost view</h2>
          <p className="mt-3 text-slate-300">
            The best decision comes from total cost, not one headline fee. Add every known cost and compare against alternative exit routes.
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
