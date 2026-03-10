export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-slate-300">
          These Terms of Service explain how LeaseShift UK operates and the responsibilities
          of users who submit or respond to lease listings.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">About LeaseShift UK</h2>
          <p className="mt-3 text-slate-300">
            LeaseShift UK is a marketplace that connects current lease holders with potential
            transferees who may wish to take over an existing lease agreement.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">User responsibilities</h2>
          <p className="mt-3 text-slate-300">
            Users are responsible for ensuring that all information they submit is accurate,
            complete, and up to date, including vehicle, lease, and contact details.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Listing approvals</h2>
          <p className="mt-3 text-slate-300">
            All lease transfers remain subject to approval by the relevant finance company.
            LeaseShift UK may remove or refuse listings at its discretion.
          </p>
          <p className="mt-3 text-slate-300">
            LeaseShift UK does not guarantee transfer approval and does not guarantee listing
            accuracy.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">No financial advice</h2>
          <p className="mt-3 text-slate-300">
            LeaseShift UK does not provide financial advice and is not a finance provider.
            Users should seek independent advice where appropriate.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Liability limitations</h2>
          <p className="mt-3 text-slate-300">
            LeaseShift UK provides a marketplace service only. We are not responsible for
            agreements made between users, decisions made by finance companies, or losses
            resulting from inaccurate information submitted by users.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-3 text-slate-300">
            For questions about these terms, please contact us at{' '}
            <a
              href="mailto:hello@leaseshift.co.uk"
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              hello@leaseshift.co.uk
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
