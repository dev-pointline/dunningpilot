import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
title: "Privacy Policy | DunningPilot",
description:
"How DunningPilot collects and processes waitlist data during pre-launch."
};

export default function PrivacyPage() {
return (
<main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
<Link href="/" className="text-sm text-emerald-700 underline underline-offset-2">
← Back to DunningPilot
</Link>

<h1 className="font-heading mt-4 text-3xl font-bold tracking-tight">
Privacy Policy
</h1>
<p className="mt-2 text-sm text-slate-600">Last updated: 27 February 2026</p>

<section className="mt-8 space-y-5 text-sm leading-6 text-slate-700">
<div>
<h2 className="text-lg font-semibold text-slate-900">1) Data we collect</h2>
<p>
When you join our waitlist, we collect your email address and optional name. We also
collect operational metadata such as signup source, timestamp, referrer, and user-agent
to prevent abuse and understand campaign performance.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">2) Purpose of processing</h2>
<p>
We use this data to manage waitlist signups, send launch updates, invite early-access
cohorts, and improve onboarding messaging. We do not sell personal data.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">3) Legal basis and consent</h2>
<p>
Our legal basis is consent. By submitting your email, you consent to receiving launch
communications related to DunningPilot. You can withdraw consent at any time by using
unsubscribe links or contacting us directly.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">4) Retention period</h2>
<p>
Waitlist records are retained while pre-launch validation is active, or until you ask
us to delete your information. We periodically remove inactive records.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">5) Deletion and contact process</h2>
<p>
To request access, correction, export, or deletion of your data, email{" "}
<a href="mailto:privacy@dunningpilot.com" className="underline underline-offset-2">
privacy@dunningpilot.com
</a>
. We aim to respond within 30 days.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">6) Processor list</h2>
<ul className="list-disc space-y-1 pl-5">
<li>Supabase — waitlist database storage</li>
<li>Vercel — web hosting and serverless runtime</li>
<li>Resend — launch and transactional email delivery</li>
<li>Paddle — billing provider at commercial launch (if used)</li>
</ul>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">7) Changes to this policy</h2>
<p>
We may update this policy as the product evolves. Material updates will be posted on
this page with an updated “Last updated” date.
</p>
</div>
</section>
</main>
);
}