export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-slate-300">
          This Privacy Policy explains how LeaseShift UK collects, uses, and protects your
          personal information when you use our website and services.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Information we collect</h2>
          <p className="mt-3 text-slate-300">
            We may collect the following information when you submit a listing or enquiry:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-300">
            <li>Name</li>
            <li>Email</li>
            <li>Phone number</li>
            <li>Vehicle and lease details</li>
            <li>Enquiry messages</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">How we use information</h2>
          <p className="mt-3 text-slate-300">We use your information for the following purposes:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-300">
            <li>Operating the lease transfer marketplace</li>
            <li>Reviewing listings</li>
            <li>Handling buyer enquiries</li>
            <li>Communicating with users</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Data sharing</h2>
          <p className="mt-3 text-slate-300">
            We use trusted third-party services to help run LeaseShift UK, including Airtable,
            Vercel, and Resend. We only share information necessary for these services to
            perform their functions.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Data storage</h2>
          <p className="mt-3 text-slate-300">
            Your data is stored securely using the platforms and infrastructure we use to run
            LeaseShift UK. We keep data for as long as needed to operate our services,
            manage listings and enquiries, and meet legal or operational requirements.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Your rights</h2>
          <p className="mt-3 text-slate-300">
            You can request access to your personal data, ask us to correct inaccurate
            information, or request deletion where appropriate. You may also contact us with
            any questions about how your data is handled.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Contact us</h2>
          <p className="mt-3 text-slate-300">
            If you have questions about this Privacy Policy, contact us at{' '}
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
