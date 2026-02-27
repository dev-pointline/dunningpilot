import Link from "next/link";

export default function TermsPage() {
return (
<main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
<Link
href="/"
className="text-sm text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
>
← Back to DunningPilot
</Link>

<h1 className="mt-4 text-3xl font-bold tracking-tight">Terms of Service</h1>
<p className="mt-2 text-sm text-slate-600">Last updated: 27 February 2026</p>

<section className="mt-8 space-y-4 text-sm leading-relaxed text-slate-700">
<h2 className="text-lg font-semibold text-slate-900">1) Pre-launch status</h2>
<p>
DunningPilot is currently in pre-launch validation. By joining the waitlist, you acknowledge the
product is not generally available yet.
</p>

<h2 className="text-lg font-semibold text-slate-900">2) Waitlist communications</h2>
<p>
By submitting your email, you consent to receive launch and product update messages. You can
unsubscribe at any time.
</p>

<h2 className="text-lg font-semibold text-slate-900">3) Acceptable use</h2>
<p>
You agree not to misuse the website, attempt unauthorized access, or submit fraudulent data.
</p>

<h2 className="text-lg font-semibold text-slate-900">4) Data ownership</h2>
<p>
You retain ownership of data you provide. Our data handling practices are described in the Privacy
Policy.
</p>

<h2 className="text-lg font-semibold text-slate-900">5) Third-party providers</h2>
<p>
We use providers including Supabase, Resend, and (when billing launches) Paddle. Their services may
be required to deliver core functionality.
</p>

<h2 className="text-lg font-semibold text-slate-900">6) No guarantees during validation</h2>
<p>
During pre-launch, timelines, features, and pricing may change. We do not guarantee availability,
uptime, or launch date in this phase.
</p>

<h2 className="text-lg font-semibold text-slate-900">7) Limitation of liability</h2>
<p>
To the extent permitted by law, DunningPilot is not liable for indirect or consequential damages
arising from use of this pre-launch site.
</p>

<h2 className="text-lg font-semibold text-slate-900">8) Contact</h2>
<p>
Questions about these terms can be sent to{" "}
<a className="underline underline-offset-2" href="mailto:hello@dunningpilot.com">
hello@dunningpilot.com
</a>
.
</p>
</section>
</main>
);
}