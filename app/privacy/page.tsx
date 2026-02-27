import Link from "next/link";

export default function PrivacyPage() {
return (
<main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
<Link
href="/"
className="text-sm text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
>
← Back to DunningPilot
</Link>

<h1 className="mt-4 text-3xl font-bold tracking-tight">Privacy Policy</h1>
<p className="mt-2 text-sm text-slate-600">Last updated: 27 February 2026</p>

<section className="mt-8 space-y-4 text-sm leading-relaxed text-slate-700">
<h2 className="text-lg font-semibold text-slate-900">1) Data we collect</h2>
<p>
When you join the waitlist, we collect your email address. We may also store limited metadata
such as signup source, timestamp, referrer, and user-agent string for fraud prevention and basic
analytics.
</p>

<h2 className="text-lg font-semibold text-slate-900">2) Why we collect it</h2>
<p>
We use this data to manage the DunningPilot waitlist, send launch updates, and invite early-access
cohorts. We do not sell your personal data.
</p>

<h2 className="text-lg font-semibold text-slate-900">3) Legal basis and consent</h2>
<p>
Our legal basis is consent. By submitting your email, you agree to receive launch and product update
emails. You can withdraw consent at any time using unsubscribe links or by contacting us directly.
</p>

<h2 className="text-lg font-semibold text-slate-900">4) Data retention</h2>
<p>
Waitlist records are retained until product launch validation is complete or until you request
deletion. We review and remove stale waitlist data periodically.
</p>

<h2 className="text-lg font-semibold text-slate-900">5) Deletion requests and data rights</h2>
<p>
You can request access, correction, or deletion of your data by emailing{" "}
<a className="underline underline-offset-2" href="mailto:privacy@dunningpilot.com">
privacy@dunningpilot.com
</a>
. We aim to respond within 30 days.
</p>

<h2 className="text-lg font-semibold text-slate-900">6) Processors and subprocessors</h2>
<p>
We use trusted providers to run the waitlist: Supabase (database), Resend (email delivery), and
Paddle (payments, once billing is live). Each provider processes data according to their own privacy
and security terms.
</p>

<h2 className="text-lg font-semibold text-slate-900">7) Contact</h2>
<p>
For any privacy question, contact{" "}
<a className="underline underline-offset-2" href="mailto:privacy@dunningpilot.com">
privacy@dunningpilot.com
</a>
.
</p>
</section>
</main>
);
}