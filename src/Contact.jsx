export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Contact</h1>
        <p className="mt-4 text-slate-300">
          You can contact LeaseShift UK for listing help, lease transfer questions,
          buyer enquiries, and technical support.
        </p>

        <div className="mt-6 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4">
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-300">Email</p>
          <a
            href="mailto:hello@leaseshift.co.uk"
            className="mt-1 block text-lg font-semibold text-white hover:text-emerald-300"
          >
            hello@leaseshift.co.uk
          </a>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Send us a message</h2>
          <form className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white placeholder-slate-400 focus:border-white/30 focus:outline-none"
            />
            <button
              type="button"
              className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
