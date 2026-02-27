import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
title: "Terms of Service | DunningPilot",
description:
"Terms governing use of DunningPilot pre-launch waitlist and communications."
};

export default function TermsPage() {
return (
<main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
<Link href="/" className="text-sm text-emerald-700 underline underline-offset-2">
← Back to DunningPilot
</Link>

<h1 className="font-heading mt-4 text-3xl font-bold tracking-tight">
Terms of Service
</h1>
<p className="mt-2 text-sm text-slate-600">Last updated: 27 February 2026</p>

<section className="mt-8 space-y-5 text-sm leading-6 text-slate-700">
<div>
<h2 className="text-lg font-semibold text-slate-900">1) Pre-launch status</h2>
<p>
DunningPilot is currently in pre-launch validation. By using this website or joining
the waitlist, you acknowledge that features, pricing, and launch timelines may change.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">2) Data collected</h2>
<p>
We collect waitlist details you submit (email and optional name), plus technical
metadata such as source and timestamp. See our Privacy Policy for full handling details.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">3) Purpose of processing</h2>
<p>
Data is processed to administer waitlist enrollment, communicate launch updates, and
support anti-abuse protections on the site.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">4) Legal basis and consent</h2>
<p>
Communications are sent based on consent. By submitting your email, you agree to
receive launch-related updates and can unsubscribe at any time.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">5) Retention and deletion</h2>
<p>
Waitlist records are retained during validation unless you request deletion earlier.
Send deletion requests to{" "}
<a href="mailto:privacy@dunningpilot.com" className="underline underline-offset-2">
privacy@dunningpilot.com
</a>
.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">6) Processors and providers</h2>
<p>
We use third-party processors including Supabase, Vercel, Resend, and Paddle (when
applicable) to deliver core services.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">7) Acceptable use</h2>
<p>
You agree not to misuse this site, submit fraudulent data, or attempt unauthorized
system access.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">8) Policy and terms changes</h2>
<p>
We may update these terms. Updates will appear on this page with a revised date.
Continued use after changes indicates acceptance.
</p>
</div>

<div>
<h2 className="text-lg font-semibold text-slate-900">9) Contact</h2>
<p>
Terms questions:{" "}
<a href="mailto:hello@dunningpilot.com" className="underline underline-offset-2">
hello@dunningpilot.com
</a>
</p>
</div>
</section>
</main>
);
}