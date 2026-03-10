import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const guideLinks = [
  {
    title: 'How to transfer a car lease in the UK',
    to: '/how-to-transfer-a-car-lease-uk',
  },
  {
    title: 'Can you get out of a car lease early?',
    to: '/get-out-of-car-lease-early',
  },
  {
    title: 'Lease transfer vs early termination',
    to: '/lease-transfer-vs-early-termination',
  },
  {
    title: 'Which lease companies allow transfers?',
    to: '/which-lease-companies-allow-transfers',
  },
  {
    title: 'Car lease transfer fees explained',
    to: '/lease-transfer-fees',
  },
  {
    title: "How to take over someone else's car lease",
    to: '/take-over-car-lease',
  },
  {
    title: 'Best lease transfer deals in the UK',
    to: '/best-lease-transfer-deals-uk',
  },
  {
    title: 'Lease transfer incentives explained',
    to: '/lease-transfer-incentives',
  },
  {
    title: 'Tesla lease transfer UK',
    to: '/tesla-lease-transfer-uk',
  },
  {
    title: 'Porsche lease transfer UK',
    to: '/porsche-lease-transfer-uk',
  },
];

export default function KnowledgeHub() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>Lease Transfer Guides | LeaseShift UK</title>
        <meta
          name="description"
          content="Explore LeaseShift UK's practical guides on lease transfers, lease takeovers, early exits, incentives, and finance company approval in the UK."
        />
        <meta property="og:title" content="Lease Transfer Guides | LeaseShift UK" />
        <meta
          property="og:description"
          content="Learn how UK car lease transfers work with clear guides covering transfers, takeovers, early exits, incentives, and provider approvals."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Lease Transfer Guides</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          LeaseShift UK helps drivers understand lease transfers, lease takeovers, early exits,
          incentives and finance company approval so you can make informed decisions with less
          risk and more clarity.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guideLinks.map((guide) => (
            <Link
              key={guide.to}
              to={guide.to}
              className="rounded-lg border border-white/10 bg-slate-900 p-5 transition hover:border-white/30 hover:bg-slate-800"
            >
              <h2 className="text-lg font-semibold leading-snug text-white">{guide.title}</h2>
              <p className="mt-2 text-sm text-emerald-300">Read guide</p>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
