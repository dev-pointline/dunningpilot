"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type WaitlistFormProps = {
source: string;
buttonLabel?: string;
onSuccess?: () => void;
className?: string;
};

const integrations = [
"QuickBooks (planned)",
"Xero (planned)",
"Resend (planned)",
"Paddle (planned)",
"Supabase (planned)",
];

const painPoints = [
{
icon: "⏱️",
title: "Reminder work steals your week",
body: "Agency and bookkeeping teams report spending 3–8 hours each week manually chasing invoices. That is time pulled from client delivery, sales, and strategic work.",
},
{
icon: "💸",
title: "Late payments make cash unpredictable",
body: "Validation research for this idea used a working assumption that ~22% of invoices can slip late in SMB service workflows. When receivables drift, hiring and payroll planning get tighter than they should be.",
},
{
icon: "😬",
title: "Tone decisions are stressful",
body: "Every reminder has relationship risk: too soft gets ignored, too firm can hurt trust. Teams end up rewriting the same email thread over and over to avoid awkward client friction.",
},
];

const beforeAfter = [
{
before:
"Before: You manually scan aging invoices, draft reminders from scratch, and lose hours every week.",
after:
"After: DunningPilot is designed to generate follow-up drafts and schedules so you can review quickly and move on.",
},
{
before:
"Before: Cash flow forecasts are based on hope because late invoices are hard to prioritize.",
after:
"After: DunningPilot is built to rank overdue invoices by urgency so your team can focus on the most important follow-ups first.",
},
{
before:
"Before: Every client message is a tone gamble that can strain good relationships.",
after:
"After: DunningPilot is designed with tone guardrails and escalation steps so you can stay polite, clear, and consistent.",
},
];

const features = [
{
icon: "🧠",
title: "Smart follow-up sequences",
body: "Create reminder timelines based on invoice age, amount, and context. Built so you can stop writing repetitive emails and keep a consistent process.",
},
{
icon: "🎯",
title: "Reply-intent triage",
body: "Incoming responses are organized into likely buckets like promise-to-pay, dispute, or delay. Designed so you can act faster instead of sorting inbox noise manually.",
},
{
icon: "🛡️",
title: "Tone guardrails",
body: "Choose a communication style that matches your brand and client relationships. Built to keep follow-ups firm but respectful as invoices age.",
},
{
icon: "📊",
title: "Cash impact view",
body: "Track overdue balance by bucket and follow-up stage in one place. Designed to give founders and finance leads a clearer view of cash risk.",
},
{
icon: "🔁",
title: "Approval-first automation",
body: "Keep manual approval where it matters and automate repetitive steps where it doesn’t. Built so you can stay in control without doing everything by hand.",
},
{
icon: "✨",
title: "Client-ready timeline snapshots",
body: "Generate clean activity logs that show what was sent and when. Designed so you can quickly explain status to clients, partners, or internal teams.",
},
];

const howItWorks = [
{
step: "01",
title: "Upload invoices",
body: "Import a CSV or planned accounting integration and map fields in seconds.",
visual: "📥 Upload icon with a short checklist",
},
{
step: "02",
title: "Set your follow-up style",
body: "Pick tone, timing, and escalation rules that match your client relationships.",
visual: "🎚️ Sliders for tone and cadence",
},
{
step: "03",
title: "Review and run",
body: "Approve drafts, send reminders, and track outcomes from one clear timeline.",
visual: "✅ Timeline with status chips",
},
];

const useCases = [
{
persona: "Agency Founder",
context: "Runs a 12-person performance marketing agency with monthly retainers.",
narrative:
"Here’s how this founder would use DunningPilot: upload monthly invoices, approve reminder sequences in one pass, and keep account managers focused on delivery. The main win is reclaiming weekly admin time while maintaining a professional tone.",
},
{
persona: "Fractional CFO",
context: "Supports multiple service businesses that need tighter cash planning.",
narrative:
"Here’s how this CFO would use DunningPilot: review overdue buckets across accounts, prioritize the highest-risk invoices, and create a consistent follow-up rhythm. The core benefit is a clearer, faster path to predictable cash collection.",
},
{
persona: "Bookkeeping Firm Owner",
context: "Manages receivables workflows for several client ledgers at once.",
narrative:
"Here’s how this owner would use DunningPilot: standardize reminder rules per client, track communication history, and share clean status snapshots during monthly reporting. The key benefit is stronger client trust through consistent process visibility.",
},
];

const pricingTiers = [
{
name: "Starter",
price: "€49/mo",
annual: "€39/mo billed annually (planned)",
description: "For solo operators and very small teams.",
features: [
"Up to 50 invoices/month",
"1 workspace",
"AI-generated reminder drafts",
"Manual approval before send",
],
highlight: false,
},
{
name: "Pro",
price: "€149/mo",
annual: "€119/mo billed annually (planned)",
description: "For agencies and finance teams with recurring volume.",
features: [
"Up to 300 invoices/month",
"3 workspaces",
"Advanced reply-intent triage",
"Approval-first automation rules",
"Priority onboarding at launch",
],
highlight: true,
},
{
name: "Enterprise",
price: "€399/mo",
annual: "€319/mo billed annually (planned)",
description: "For bookkeeping firms managing multiple client entities.",
features: [
"Up to 2,000 invoices/month",
"10 client workspaces",
"Custom workflow controls",
"White-label reporting (planned)",
],
highlight: false,
},
];

const faqs = [
{
q: "When does DunningPilot launch?",
a: "We are currently validating demand and onboarding in small early-access cohorts. Join the waitlist and we will notify you as soon as your cohort opens.",
},
{
q: "How is invoice and client data protected?",
a: "The product is being built with secure infrastructure and role-based access in mind. We also plan encryption in transit and at rest through trusted providers.",
},
{
q: "Who owns the data I upload?",
a: "You do. We are designing DunningPilot so you can export your data and request deletion at any time.",
},
{
q: "Can I switch from QuickBooks or Xero?",
a: "That is a core launch priority. We are planning direct integrations and CSV import so migration does not require rebuilding your process.",
},
{
q: "How long will setup take?",
a: "The onboarding flow is designed to take under 15 minutes for first use. You can start with a CSV and refine rules later.",
},
{
q: "Will this auto-send emails without my approval?",
a: "At launch, the default is approval-first controls. You decide the level of automation that is safe for your client relationships.",
},
{
q: "What support will early users get?",
a: "Early cohorts will get direct founder support, implementation help, and rapid feedback loops while we finalize the product.",
},
{
q: "What if my team only has occasional overdue invoices?",
a: "DunningPilot is best for recurring AR workflows. During early access, we will help assess fit before recommending a plan.",
},
];

function WaitlistForm({
source,
buttonLabel = "Join the waitlist",
onSuccess,
className,
}: WaitlistFormProps) {
const [email, setEmail] = useState("");
const [status, setStatus] = useState<{
type: "idle" | "success" | "error";
message: string;
}>({ type: "idle", message: "" });
const [submitting, setSubmitting] = useState(false);

async function onSubmit(event: FormEvent<HTMLFormElement>) {
event.preventDefault();
if (!email.trim()) {
setStatus({
type: "error",
message: "Please enter a valid email address.",
});
return;
}

setSubmitting(true);
setStatus({ type: "idle", message: "" });

try {
const response = await fetch("/api/subscribe", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
email,
source,
}),
});

const payload = (await response.json()) as {
success?: boolean;
message?: string;
};

if (!response.ok || !payload.success) {
setStatus({
type: "error",
message:
payload.message ??
"We could not save your request right now. Please try again.",
});
return;
}

setStatus({
type: "success",
message: payload.message ?? "You're on the waitlist!",
});
setEmail("");
onSuccess?.();
} catch {
setStatus({
type: "error",
message: "Network issue detected. Please try again in a moment.",
});
} finally {
setSubmitting(false);
}
}

return (
<form
onSubmit={onSubmit}
className={className}
aria-label="Waitlist signup form"
noValidate
>
{/* QA breakpoints: 375px stack, 768px balanced row, 1024px inline row */}
<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
<label htmlFor={`email-${source}`} className="sr-only">
Email address
</label>
<input
id={`email-${source}`}
type="email"
name="email"
autoComplete="email"
inputMode="email"
required
value={email}
onChange={(event) => setEmail(event.target.value)}
placeholder="you@company.com"
className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
aria-describedby={`legal-${source}`}
aria-label="Email address"
/>
<button
type="submit"
disabled={submitting}
className="h-12 w-full rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
aria-label={buttonLabel}
>
{submitting ? "Saving..." : buttonLabel}
</button>
</div>

<p
id={`legal-${source}`}
className="mt-4 text-xs leading-relaxed text-slate-600"
>
By joining, you agree to receive launch updates. See our{" "}
<Link
href="/privacy"
className="font-medium text-slate-800 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
>
Privacy Policy
</Link>{" "}
and{" "}
<Link
href="/terms"
className="font-medium text-slate-800 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
>
Terms
</Link>
. You can unsubscribe anytime.
</p>

{status.type !== "idle" && (
<p
className={`mt-4 text-sm ${
status.type === "success" ? "text-emerald-700" : "text-rose-700"
}`}
role="status"
aria-live="polite"
>
{status.message}
</p>
)}
</form>
);
}

export default function LandingPage() {
const [showExitModal, setShowExitModal] = useState(false);
const [joinedWaitlist, setJoinedWaitlist] = useState(false);
const [dismissedExit, setDismissedExit] = useState(false);

useEffect(() => {
const joined = sessionStorage.getItem("dp_joined_waitlist") === "1";
const dismissed = sessionStorage.getItem("dp_exit_dismissed") === "1";

setJoinedWaitlist(joined);
setDismissedExit(dismissed);
}, []);

useEffect(() => {
const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (!entry.isIntersecting) return;
entry.target.classList.add("reveal-visible");
observer.unobserve(entry.target);
});
},
{
threshold: 0.12,
}
);

document.querySelectorAll("[data-reveal]").forEach((node) => {
node.classList.add("reveal");
observer.observe(node);
});

return () => observer.disconnect();
}, []);

useEffect(() => {
if (joinedWaitlist || dismissedExit) return;

const openModal = () => {
setShowExitModal(true);
};

const onMouseOut = (event: MouseEvent) => {
if (window.innerWidth < 1024) return;
if (event.clientY <= 0) openModal();
};

const onScroll = () => {
const scrollBottom = window.scrollY + window.innerHeight;
const scrollDepth = scrollBottom / document.documentElement.scrollHeight;
if (scrollDepth >= 0.6) openModal();
};

window.addEventListener("mouseout", onMouseOut);
window.addEventListener("scroll", onScroll, { passive: true });

return () => {
window.removeEventListener("mouseout", onMouseOut);
window.removeEventListener("scroll", onScroll);
};
}, [joinedWaitlist, dismissedExit]);

useEffect(() => {
const onEsc = (event: KeyboardEvent) => {
if (event.key === "Escape") {
handleDismissExit();
}
};

if (showExitModal) {
document.body.style.overflow = "hidden";
window.addEventListener("keydown", onEsc);
} else {
document.body.style.overflow = "";
}

return () => {
document.body.style.overflow = "";
window.removeEventListener("keydown", onEsc);
};
}, [showExitModal]);

function handleWaitlistSuccess() {
setJoinedWaitlist(true);
setShowExitModal(false);
sessionStorage.setItem("dp_joined_waitlist", "1");
}

function handleDismissExit() {
setDismissedExit(true);
setShowExitModal(false);
sessionStorage.setItem("dp_exit_dismissed", "1");
}

return (
<div className="min-h-screen bg-slate-50 text-slate-900">
<header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur">
<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
<a href="#hero" className="flex items-center gap-2" aria-label="Go home">
<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
DP
</span>
<span className="text-sm font-semibold tracking-tight">DunningPilot</span>
</a>

<nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
<a href="#product" className="text-sm text-slate-700 hover:text-slate-900">
Product
</a>
<a href="#pricing" className="text-sm text-slate-700 hover:text-slate-900">
Pricing
</a>
<a href="#faq" className="text-sm text-slate-700 hover:text-slate-900">
FAQ
</a>
<Link href="/blog" className="text-sm text-slate-700 hover:text-slate-900">
Blog
</Link>
</nav>

<a
href="#waitlist"
className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
>
Join waitlist
</a>
</div>
</header>

<main className="pb-28 sm:pb-0">
<section id="hero" className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
<div data-reveal>
<p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
Launching soon for agencies and bookkeepers
</p>
<h1
className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
style={{ fontFamily: "var(--font-display)" }}
>
Get paid faster without awkward invoice chasing
</h1>
<p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
DunningPilot is being built to handle polite, consistent invoice follow-ups so your team
can reclaim time and protect client relationships. Join the waitlist to get early access
when the first cohort opens.
</p>

<div className="mt-7 max-w-xl">
<WaitlistForm source="hero" onSuccess={handleWaitlistSuccess} />
</div>

<p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
<span aria-hidden>↳</span> We will only email you about launch access and product updates.
</p>
</div>

<div data-reveal className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
<div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
<div className="flex items-center justify-between text-xs text-slate-500">
<span>Hero visual concept</span>
<span>Dashboard mockup</span>
</div>
<div className="mt-4 grid gap-3">
<div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
<p className="text-xs font-semibold text-amber-700">Overdue now</p>
<p className="text-xl font-bold text-amber-900">€18,420</p>
</div>
<div className="rounded-lg border border-slate-200 bg-white p-3">
<p className="text-xs font-semibold text-slate-600">Next follow-up queue</p>
<ul className="mt-2 space-y-2 text-sm text-slate-700">
<li>• 14-day reminder (friendly) — 12 invoices</li>
<li>• 30-day reminder (firm) — 5 invoices</li>
<li>• Reply triage — 7 client emails</li>
</ul>
</div>
<div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
Suggested visual: split-screen timeline + tone selector + “Join waitlist” CTA card.
</div>
</div>
</div>
</div>
</section>

<section data-reveal className="border-y border-slate-200 bg-white">
<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
<p className="text-center text-sm font-medium text-slate-700">
Built for agencies and bookkeeping firms managing recurring B2B invoices.
</p>
<div className="mt-4 flex flex-wrap items-center justify-center gap-2">
{integrations.map((name) => (
<span
key={name}
className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
>
{name}
</span>
))}
</div>
<p className="mt-4 text-center text-xs text-slate-500">
Research input used in this validation: teams commonly report 3–8 hours/week on manual
invoice follow-up.
</p>
</div>
</section>

<section id="product" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
The daily AR pain most teams quietly accept
</h2>
<p className="mt-3 text-slate-700">
If you have ever delayed strategy work because invoices needed chasing, this is for you.
</p>
</div>

<div className="grid gap-6 md:grid-cols-3">
{painPoints.map((item) => (
<article
key={item.title}
data-reveal
className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
>
<p className="text-2xl" aria-hidden>
{item.icon}
</p>
<h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
<p className="mt-3 text-sm leading-relaxed text-slate-700">{item.body}</p>
</article>
))}
</div>
</section>

<section id="solution" className="bg-white py-14">
<div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
Before vs after, without false promises
</h2>
<p className="mt-3 text-slate-700">
We are pre-launch, so this section is about design intent: what DunningPilot is built to do.
</p>
</div>

<div className="space-y-4">
{beforeAfter.map((row, index) => (
<div
key={row.before}
data-reveal
className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5 lg:grid-cols-2"
>
<p className="text-sm text-rose-800">
<span className="font-semibold">Before:</span> {row.before.replace("Before: ", "")}
</p>
<p className="text-sm text-emerald-800">
<span className="font-semibold">After:</span> {row.after.replace("After: ", "")}
</p>
<p className="sr-only">Comparison row {index + 1}</p>
</div>
))}
</div>
</div>
</section>

<section id="features" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
Features built for outcomes, not feature bloat
</h2>
<p className="mt-3 text-slate-700">
Every capability is designed so you can collect faster with less manual pressure.
</p>
</div>

<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
{features.map((feature) => (
<article
key={feature.title}
data-reveal
className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
>
<p className="text-2xl" aria-hidden>
{feature.icon}
</p>
<h3 className="mt-3 text-lg font-semibold">{feature.title}</h3>
<p className="mt-3 text-sm leading-relaxed text-slate-700">{feature.body}</p>
</article>
))}
</div>
</section>

<section id="how-it-works" className="bg-white py-14">
<div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
How it works in under 60 seconds
</h2>
<p className="mt-3 text-slate-700">
Quick setup is non-negotiable for busy teams. This flow is designed to feel effortless.
</p>
</div>

<div className="grid gap-6 md:grid-cols-3">
{howItWorks.map((step) => (
<article
key={step.step}
data-reveal
className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
>
<p className="text-sm font-semibold text-emerald-700">Step {step.step}</p>
<h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
<p className="mt-3 text-sm text-slate-700">{step.body}</p>
<p className="mt-3 text-xs text-slate-500">Visual: {step.visual}</p>
</article>
))}
</div>
</div>
</section>

<section id="use-cases" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
Real-world use cases by role
</h2>
<p className="mt-3 text-slate-700">
No fake testimonials. Just practical scenarios based on who this is being built for.
</p>
</div>

<div className="space-y-4">
{useCases.map((item) => (
<article
key={item.persona}
data-reveal
className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
>
<h3 className="text-lg font-semibold">{item.persona}</h3>
<p className="mt-2 text-sm text-slate-600">{item.context}</p>
<p className="mt-3 text-sm leading-relaxed text-slate-700">{item.narrative}</p>
</article>
))}
</div>
</section>

<section id="pricing" className="bg-white py-14">
<div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
Launch Pricing (Planned)
</h2>
<p className="mt-3 text-slate-700">
Transparent pricing is part of the product philosophy. Annual plans are planned with
approximately 20% savings.
</p>
</div>

<div className="grid gap-6 lg:grid-cols-3">
{pricingTiers.map((tier) => (
<article
key={tier.name}
data-reveal
className={`relative rounded-2xl border p-6 ${
tier.highlight
? "border-emerald-500 bg-emerald-50 shadow-md"
: "border-slate-200 bg-slate-50"
}`}
>
{tier.highlight && (
<p className="absolute -top-3 left-6 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
Most Popular
</p>
)}
<h3 className="text-xl font-semibold">{tier.name}</h3>
<p className="mt-2 text-3xl font-bold">{tier.price}</p>
<p className="mt-1 text-xs text-slate-600">{tier.annual}</p>
<p className="mt-3 text-sm text-slate-700">{tier.description}</p>
<ul className="mt-4 space-y-2 text-sm text-slate-700">
{tier.features.map((feature) => (
<li key={feature}>• {feature}</li>
))}
</ul>
<a
href="#waitlist"
className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
>
Join waitlist
</a>
</article>
))}
</div>

<div data-reveal className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
<h3 className="text-lg font-semibold">Pricing FAQs</h3>
<div className="mt-4 space-y-4 text-sm text-slate-700">
<p>
<span className="font-semibold">When will this launch?</span> We will onboard early users
in small cohorts once core workflow reliability is ready.
</p>
<p>
<span className="font-semibold">Will there be a free trial?</span> We plan to offer an
early-access evaluation window before full billing starts.
</p>
<p>
<span className="font-semibold">Can I cancel anytime?</span> Yes. Planned monthly tiers are
designed for flexibility with no hidden lock-in.
</p>
</div>
</div>
</div>
</section>

<section id="faq" className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
<div data-reveal className="mb-10">
<h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
Frequently asked questions
</h2>
<p className="mt-3 text-slate-700">
Built from common objections in AR tools and finance workflow software reviews.
</p>
</div>

<div className="space-y-3">
{faqs.map((item) => (
<details
key={item.q}
data-reveal
className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
>
<summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
{item.q}
</summary>
<p className="mt-3 text-sm leading-relaxed text-slate-700">{item.a}</p>
</details>
))}
</div>
</section>

<section id="waitlist" className="bg-emerald-900 py-16 text-white">
<div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
<div data-reveal>
<h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
Early-access cohorts open in small batches
</h2>
<p className="mx-auto mt-4 max-w-2xl text-emerald-100">
If late invoices keep stealing focus, join the waitlist now. We are building this for
people exactly like you: teams that need consistent collections without awkward client friction.
</p>
</div>

<div data-reveal className="mx-auto mt-8 max-w-xl rounded-2xl bg-white p-5 text-slate-900 sm:p-6">
<WaitlistForm
source="final-cta"
buttonLabel="Get early access"
onSuccess={handleWaitlistSuccess}
/>
</div>
</div>
</section>
</main>

<footer className="border-t border-slate-200 bg-white">
<div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
<div>
<div className="flex items-center gap-2">
<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
DP
</span>
<p className="font-semibold">DunningPilot</p>
</div>
<p className="mt-3 text-sm text-slate-600">
Pre-launch software designed to help service teams follow up on invoices consistently and professionally.
</p>
</div>

<nav aria-label="Footer navigation" className="grid grid-cols-2 gap-3 text-sm">
<a href="#product" className="text-slate-700 hover:text-slate-900">
Product
</a>
<a href="#pricing" className="text-slate-700 hover:text-slate-900">
Pricing
</a>
<a href="#faq" className="text-slate-700 hover:text-slate-900">
FAQ
</a>
<Link href="/blog" className="text-slate-700 hover:text-slate-900">
Blog
</Link>
<a href="mailto:hello@dunningpilot.com" className="text-slate-700 hover:text-slate-900">
Contact
</a>
</nav>

<div>
<p className="text-sm font-semibold text-slate-900">Follow</p>
<div className="mt-3 flex items-center gap-4">
<a
href="https://x.com/dunningpilot"
target="_blank"
rel="noreferrer"
aria-label="DunningPilot on X"
className="text-slate-600 hover:text-slate-900"
>
𝕏
</a>
<a
href="https://www.producthunt.com/products/dunningpilot"
target="_blank"
rel="noreferrer"
aria-label="DunningPilot on Product Hunt"
className="text-slate-600 hover:text-slate-900"
>
PH
</a>
</div>
<div className="mt-4 flex flex-wrap gap-3 text-xs">
<Link href="/privacy" className="underline underline-offset-2 text-slate-600 hover:text-slate-900">
Privacy Policy
</Link>
<Link href="/terms" className="underline underline-offset-2 text-slate-600 hover:text-slate-900">
Terms of Service
</Link>
</div>
</div>
</div>
<div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
© {new Date().getFullYear()} DunningPilot. All rights reserved.
</div>
</footer>

{!joinedWaitlist && !showExitModal && (
<div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white p-3 shadow-[0_-6px_20px_rgba(15,23,42,0.08)] sm:hidden">
<a
href="#waitlist"
className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
>
Join the waitlist
</a>
</div>
)}

{showExitModal && !joinedWaitlist && (
<div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center">
<div
role="dialog"
aria-modal="true"
aria-labelledby="exit-title"
className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
>
<div className="flex items-start justify-between gap-4">
<h2 id="exit-title" className="text-xl font-bold text-slate-900">
Before you go: get launch access first
</h2>
<button
type="button"
onClick={handleDismissExit}
className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
aria-label="Close waitlist modal"
>
✕
</button>
</div>
<p className="mt-3 text-sm text-slate-700">
If invoice follow-up keeps draining your week, join the waitlist and we will notify you when
your early-access cohort opens.
</p>
<div className="mt-5">
<WaitlistForm
source="exit-intent"
buttonLabel="Notify me at launch"
onSuccess={handleWaitlistSuccess}
/>
</div>
<button
type="button"
onClick={handleDismissExit}
className="mt-4 text-xs text-slate-500 underline underline-offset-2 hover:text-slate-700"
>
Not now
</button>
</div>
</div>
)}
</div>
);
}