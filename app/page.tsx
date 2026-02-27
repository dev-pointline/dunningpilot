"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type WaitlistFormProps = {
source: string;
buttonText?: string;
compact?: boolean;
onSuccess?: () => void;
className?: string;
};

type Plan = {
name: string;
price: string;
cadence: string;
description: string;
features: string[];
popular?: boolean;
};

const integrations = ["QuickBooks", "Xero", "Stripe", "Resend", "Paddle"];

const painPoints = [
{
icon: "⏳",
title: "3–8 hours disappear into manual follow-ups",
description:
"Founder-led agencies report spending 3–8 hours per week chasing overdue invoices manually. That time comes straight out of sales calls, delivery quality, and billable work."
},
{
icon: "💸",
title: "Late invoices tie up too much cash",
description:
"In our pre-launch model, agencies billing about $80K monthly can see roughly 22% of invoices go late. That is about $17,600 sitting in limbo instead of funding payroll, contractors, or growth."
},
{
icon: "😬",
title: "Every reminder risks client tension",
description:
"Most teams hesitate between sounding too soft and too aggressive, so follow-ups get delayed for weeks. Unclear tone and timing create anxiety for both your team and your client relationships."
}
];

const beforeAfter = [
{
before:
"Before: You manually rewrite reminder emails, check spreadsheets, and decide who to chase first.",
after:
"After: DunningPilot is designed to prioritize invoices by risk, draft follow-ups by context, and suggest what to send next."
},
{
before:
"Before: Cash visibility is reactive—you notice late payments after they become urgent.",
after:
"After: DunningPilot is built to forecast likely collection timing so you can plan cash flow with fewer surprises."
},
{
before:
"Before: Tone decisions are inconsistent across team members and client accounts.",
after:
"After: DunningPilot is designed with tone guardrails and escalation paths so reminders stay firm and professional."
}
];

const features = [
{
icon: "🧠",
title: "Risk-Scored Follow-Up Queue",
description:
"Invoices are designed to be ranked by urgency, amount, and lateness. So you can focus first on the follow-ups most likely to move cash this week.",
benefit: "Spend less time guessing what matters next."
},
{
icon: "✍️",
title: "Client-Safe AI Message Drafting",
description:
"Each reminder is designed to adapt tone by invoice stage: friendly, firm, and final notice. So you can protect relationships while still asking for payment clearly.",
benefit: "Send better emails without writing from scratch."
},
{
icon: "📥",
title: "Reply Intent Triage",
description:
"Incoming replies are built to be categorized as promise-to-pay, dispute, or stall. So you can react faster and route exceptions before they become another delay.",
benefit: "Cut inbox chaos and follow-up fatigue."
},
{
icon: "📊",
title: "Cash Impact Forecast",
description:
"The dashboard is designed to show expected cash-in under current and planned sequences. So you can see which actions are likely to influence this month’s runway.",
benefit: "Make AR decisions with confidence, not gut feel."
},
{
icon: "🔌",
title: "Planned Accounting Integrations",
description:
"DunningPilot is planned to support QuickBooks and Xero sync plus reliable CSV import from day one. So you can launch quickly without replacing your accounting stack.",
benefit: "Start with what you already use."
},
{
icon: "📨",
title: "Weekly Client-Ready AR Digest",
description:
"Summaries are designed to highlight what was sent, who replied, and what remains overdue. So founders, finance leads, and bookkeepers can align in minutes.",
benefit: "Keep everyone informed without manual reporting."
}
];

const steps = [
{
number: "01",
title: "Upload or sync invoices",
description:
"Connect your source and pull outstanding invoices in about 20 seconds.",
visual: "Icon idea: cloud upload + file check"
},
{
number: "02",
title: "Pick your tone policy",
description:
"Choose friendly-to-firm escalation rules in about 15 seconds.",
visual: "Icon idea: sliders + speech bubble"
},
{
number: "03",
title: "Approve and send",
description:
"Review AI drafts and launch your first sequence in about 20 seconds.",
visual: "Icon idea: paper plane + checkmark"
}
];

const useCases = [
{
persona: "Agency Founder",
context:
"Runs a 12-person creative agency and personally tracks receivables every Friday.",
narrative:
"Here’s how an Agency Founder would use DunningPilot: start Monday with a prioritized queue, approve reminders in one pass, and get a weekly summary before payroll planning. The biggest benefit is time saved, so founder attention goes back to revenue work."
},
{
persona: "Fractional CFO",
context:
"Oversees cash flow for multiple service businesses with different billing cycles.",
narrative:
"Here’s how a Fractional CFO would use DunningPilot: set tone rules per client account, monitor projected cash-in by week, and flag at-risk invoices before reporting calls. The core benefit is stronger cash-flow visibility and earlier intervention."
},
{
persona: "Bookkeeping Firm Owner",
context:
"Manages collections support for several clients but needs a consistent process.",
narrative:
"Here’s how a Bookkeeping Firm Owner would use DunningPilot: standardize follow-up playbooks, keep communication professional, and send account-level digests clients can understand quickly. The key benefit is better client relationships through consistent, transparent follow-up."
}
];

const plans: Plan[] = [
{
name: "Starter",
price: "$49",
cadence: "/month",
description: "For small teams managing early AR workflows.",
features: [
"Up to 50 invoices/month",
"1 workspace",
"AI reminder drafting",
"Manual approve/send flow",
"Email support"
]
},
{
name: "Pro",
price: "$149",
cadence: "/month",
description: "For agencies that need reliable automation every week.",
features: [
"Up to 300 invoices/month",
"3 workspaces",
"Autopilot scheduling (planned)",
"Advanced reply intent triage",
"QuickBooks/Xero sync (planned)"
],
popular: true
},
{
name: "Enterprise",
price: "$399",
cadence: "/month",
description: "For bookkeepers and finance teams managing multiple entities.",
features: [
"Up to 2,000 invoices/month",
"10 workspaces",
"White-label reporting (planned)",
"Priority onboarding",
"SLA and audit options (planned)"
]
}
];

const pricingFaqs = [
{
q: "When will this launch?",
a: "We are onboarding waitlist members in batches as private beta opens. Waitlist members get first priority."
},
{
q: "Will there be a free trial?",
a: "A limited early-access trial is planned for qualified waitlist members so teams can test fit before full rollout."
},
{
q: "Can I cancel anytime?",
a: "Yes—planned pricing is month-to-month for self-serve tiers so teams can stay flexible."
}
];

const faqItems = [
{
q: "When does DunningPilot launch?",
a: "DunningPilot is in pre-launch validation now. Join the waitlist and we’ll email you as soon as private beta seats open."
},
{
q: "Is invoice and client data secure?",
a: "Security is being built in from day one with encrypted transport and access controls. Before onboarding, early users will receive clear documentation on how data is handled."
},
{
q: "Who owns my data and message history?",
a: "You do. DunningPilot is designed to process your invoice workflow, not claim ownership of your financial or communication data."
},
{
q: "Can I switch from tools like Chaser or manual spreadsheets?",
a: "Yes. The onboarding path is being designed around CSV import first, then accounting sync so migration is straightforward."
},
{
q: "How long does setup take?",
a: "The workflow is designed for first value in under a minute and first sequence launch in a few minutes. We’re intentionally avoiding long implementation steps."
},
{
q: "Will this replace QuickBooks or Xero?",
a: "No. DunningPilot is planned as a collections layer on top of your accounting system, focused on follow-up quality, prioritization, and cash visibility."
},
{
q: "What support will early users get?",
a: "Early users will get priority onboarding and direct founder support. Feedback loops are part of the early-access program so the product matches real workflows."
},
{
q: "What if AI drafts sound too aggressive for my clients?",
a: "Tone guardrails are core to the product design. You’ll be able to set style boundaries and approval rules before anything is sent."
}
];

function WaitlistForm({
source,
buttonText = "Join the waitlist",
compact = false,
onSuccess,
className = ""
}: WaitlistFormProps) {
const [email, setEmail] = useState("");
const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
"idle"
);
const [message, setMessage] = useState("");

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
event.preventDefault();
setStatus("loading");
setMessage("");

try {
const response = await fetch("/api/subscribe", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, source })
});

const data = (await response.json()) as { success: boolean; message: string };

if (!response.ok || !data.success) {
setStatus("error");
setMessage(data.message || "Please try again.");
return;
}

setStatus("success");
setMessage(data.message);
setEmail("");
onSuccess?.();
localStorage.setItem("dunningpilot_waitlist_joined", "1");
} catch {
setStatus("error");
setMessage("Something went wrong. Please try again.");
}
};

return (
<form
onSubmit={handleSubmit}
className={`flex w-full flex-col gap-3 sm:flex-row ${className}`}
aria-label="Waitlist signup form"
>
<label htmlFor={`email-${source}`} className="sr-only">
Email address
</label>
<input
id={`email-${source}`}
type="email"
value={email}
onChange={(event) => setEmail(event.target.value)}
placeholder="Enter your work email"
required
aria-label="Email address"
className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-teal-500 transition focus:ring-2 ${
compact ? "text-sm" : "text-base"
}`}
/>
<button
type="submit"
disabled={status === "loading"}
className={`rounded-xl bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 ${
compact ? "text-sm" : "text-base"
}`}
>
{status === "loading" ? "Joining..." : buttonText}
</button>
<p className="text-sm text-slate-600 sm:col-span-2">
{status === "success"
? message
: status === "error"
? message
: "Launching soon — we’ll notify you as soon as early access opens."}
</p>
</form>
);
}

function SectionHeader({
eyebrow,
title,
subtitle
}: {
eyebrow: string;
title: string;
subtitle: string;
}) {
return (
<div className="mx-auto mb-10 max-w-3xl text-center">
<p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-700">
{eyebrow}
</p>
<h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
<p className="mt-4 text-base text-slate-600 sm:text-lg">{subtitle}</p>
</div>
);
}

export default function HomePage() {
const [faqOpen, setFaqOpen] = useState<number | null>(0);
const [showExitOffer, setShowExitOffer] = useState(false);
const [hasSubmitted, setHasSubmitted] = useState(false);

useEffect(() => {
const joined = localStorage.getItem("dunningpilot_waitlist_joined");
if (joined === "1") {
setHasSubmitted(true);
}

const elements = document.querySelectorAll<HTMLElement>(".reveal");
const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) entry.target.classList.add("is-visible");
});
},
{ threshold: 0.15 }
);

elements.forEach((element) => observer.observe(element));

const onMouseOut = (event: MouseEvent) => {
if (event.clientY <= 0 && !hasSubmitted) {
setShowExitOffer(true);
}
};

const onScroll = () => {
const doc = document.documentElement;
const progress = window.scrollY / (doc.scrollHeight - window.innerHeight);
if (progress > 0.68 && !hasSubmitted) {
setShowExitOffer(true);
}
};

window.addEventListener("mouseout", onMouseOut);
window.addEventListener("scroll", onScroll);

return () => {
observer.disconnect();
window.removeEventListener("mouseout", onMouseOut);
window.removeEventListener("scroll", onScroll);
};
}, [hasSubmitted]);

const onWaitlistSuccess = () => {
setHasSubmitted(true);
setShowExitOffer(false);
};

return (
<div className="min-h-screen bg-slate-50 text-slate-900">
<header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
<nav
className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
aria-label="Main navigation"
>
<Link href="#hero" className="text-lg font-bold text-slate-900">
DunningPilot
</Link>
<div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
<Link href="#product" className="hover:text-slate-900">
Product
</Link>
<Link href="#pricing" className="hover:text-slate-900">
Pricing
</Link>
<Link href="#faq" className="hover:text-slate-900">
FAQ
</Link>
<Link href="#waitlist-final" className="rounded-lg bg-teal-700 px-4 py-2 text-white">
Join waitlist
</Link>
</div>
</nav>
</header>

<main>
<section id="hero" className="reveal mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
<div className="grid gap-10 lg:grid-cols-2 lg:items-center">
<div>
<p className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
Pre-launch • built for agency cash flow teams
</p>
<h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
Get invoices paid faster without awkward chasing
</h1>
<p className="mt-5 max-w-xl text-lg text-slate-600">
Agencies and bookkeepers can lose 3–8 hours every week sending manual follow-ups.
DunningPilot is designed to automate reminders, keep tone professional, and help
you move overdue cash without damaging client relationships.
</p>
<div className="mt-7 max-w-xl">
<WaitlistForm source="hero" onSuccess={onWaitlistSuccess} />
</div>
<p className="mt-2 text-sm text-slate-500">
↓ Be one of the first teams invited into private beta.
</p>
<ul className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
<li className="rounded-lg border border-slate-200 bg-white p-3">
<strong>Problem signal:</strong> 3–8 hrs/week spent chasing invoices manually.
</li>
<li className="rounded-lg border border-slate-200 bg-white p-3">
<strong>Cash risk signal:</strong> Late invoices can reach ~22% of monthly billing.
</li>
</ul>
</div>

<div className="soft-ring rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
<p className="mb-4 text-sm font-semibold uppercase tracking-wider text-teal-700">
Hero visual
</p>
<div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
<div className="mb-4 flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
<p className="text-sm font-semibold text-slate-900">Collections Dashboard Preview</p>
<span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
Planned UI
</span>
</div>
<div className="grid gap-3 sm:grid-cols-2">
<div className="rounded-lg border border-slate-200 bg-white p-3">
<p className="text-xs uppercase tracking-wide text-slate-500">At-risk invoices</p>
<p className="mt-1 text-xl font-bold text-slate-900">14</p>
</div>
<div className="rounded-lg border border-slate-200 bg-white p-3">
<p className="text-xs uppercase tracking-wide text-slate-500">Expected cash-in (7d)</p>
<p className="mt-1 text-xl font-bold text-slate-900">$12,400</p>
</div>
</div>
<p className="mt-4 text-sm text-slate-600">
A clean split-screen with a priority queue on the left and AI-drafted reminder with
tone controls on the right, plus a weekly cash impact panel.
</p>
</div>
</div>
</div>
</section>

<section id="credibility" className="reveal border-y border-slate-200 bg-white py-10">
<div className="mx-auto max-w-6xl px-4 sm:px-6">
<p className="text-center text-base font-semibold text-slate-800">
Built for founder-led agencies and bookkeeping firms managing $50K+ monthly invoicing.
</p>
<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
{integrations.map((tool) => (
<span
key={tool}
className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
>
Planned integration: {tool}
</span>
))}
</div>
<p className="mt-5 text-center text-sm text-slate-500">
Research signal: small B2B teams repeatedly report late payment pressure and weekly
manual follow-up overhead.
</p>
</div>
</section>

<section id="problem" className="reveal mx-auto max-w-6xl px-4 py-16 sm:px-6">
<SectionHeader
eyebrow="The daily pain"
title="If this feels familiar, you’re exactly who we’re building for"
subtitle="These are the patterns we heard repeatedly from agencies and finance operators in pre-launch research."
/>
<div className="grid gap-6 md:grid-cols-3">
{painPoints.map((item) => (
<article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
<p className="text-2xl">{item.icon}</p>
<h3 className="mt-3 text-xl font-bold text-slate-900">{item.title}</h3>
<p className="mt-3 text-slate-600">{item.description}</p>
</article>
))}
</div>
</section>

<section id="solution" className="reveal bg-white py-16">
<div className="mx-auto max-w-6xl px-4 sm:px-6">
<SectionHeader
eyebrow="Before vs after"
title="From reactive chasing to calm, structured collections"
subtitle="DunningPilot is designed to replace ad-hoc AR follow-up with a consistent workflow your team can trust."
/>
<div className="grid gap-5 lg:grid-cols-3">
{beforeAfter.map((item) => (
<article key={item.before} className="rounded-2xl border border-slate-200 p-6">
<p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{item.before}</p>
<p className="mt-3 rounded-lg bg-teal-50 p-3 text-sm text-teal-900">{item.after}</p>
</article>
))}
</div>
</div>
</section>

<section id="product" className="reveal mx-auto max-w-6xl px-4 py-16 sm:px-6">
<SectionHeader
eyebrow="Feature deep-dive"
title="Everything is built around one outcome: faster collections"
subtitle="Practical automation + thoughtful controls, so your team saves time without sacrificing trust."
/>
<div className="grid gap-6 md:grid-cols-2">
{features.map((feature) => (
<article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6">
<p className="text-2xl">{feature.icon}</p>
<h3 className="mt-2 text-xl font-bold text-slate-900">{feature.title}</h3>
<p className="mt-3 text-slate-600">{feature.description}</p>
<p className="mt-3 text-sm font-semibold text-teal-700">Benefit: {feature.benefit}</p>
</article>
))}
</div>
</section>

<section id="how" className="reveal border-y border-slate-200 bg-white py-16">
<div className="mx-auto max-w-6xl px-4 sm:px-6">
<SectionHeader
eyebrow="How it works"
title="Designed for first value in under 60 seconds"
subtitle="No heavy setup. No long implementation. Just a clean flow your team can run today."
/>
<div className="grid gap-6 md:grid-cols-3">
{steps.map((step) => (
<article key={step.number} className="rounded-2xl border border-slate-200 p-6">
<p className="text-sm font-bold text-teal-700">Step {step.number}</p>
<h3 className="mt-2 text-lg font-bold text-slate-900">{step.title}</h3>
<p className="mt-2 text-slate-600">{step.description}</p>
<p className="mt-3 text-xs uppercase tracking-wide text-slate-500">{step.visual}</p>
</article>
))}
</div>
</div>
</section>

<section id="use-cases" className="reveal mx-auto max-w-6xl px-4 py-16 sm:px-6">
<SectionHeader
eyebrow="Use cases"
title="Three ways teams would use DunningPilot day-to-day"
subtitle="Realistic scenarios for the people who feel this problem most."
/>
<div className="space-y-5">
{useCases.map((item) => (
<article key={item.persona} className="rounded-2xl border border-slate-200 bg-white p-6">
<p className="text-sm font-semibold uppercase tracking-wider text-teal-700">{item.persona}</p>
<p className="mt-2 font-medium text-slate-900">{item.context}</p>
<p className="mt-3 text-slate-600">{item.narrative}</p>
</article>
))}
</div>
</section>

<section id="pricing" className="reveal bg-white py-16">
<div className="mx-auto max-w-6xl px-4 sm:px-6">
<SectionHeader
eyebrow="Launch pricing"
title="Planned pricing for early teams"
subtitle="Transparent monthly tiers. Planned annual billing will include a 20% discount after launch."
/>
<div className="grid gap-6 lg:grid-cols-3">
{plans.map((plan) => (
<article
key={plan.name}
className={`relative rounded-2xl border p-6 ${
plan.popular
? "border-teal-700 bg-teal-50"
: "border-slate-200 bg-slate-50"
}`}
>
{plan.popular && (
<span className="absolute -top-3 left-6 rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold text-white">
Most Popular
</span>
)}
<h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
<p className="mt-1 text-slate-600">{plan.description}</p>
<p className="mt-4 text-4xl font-bold text-slate-900">
{plan.price}
<span className="text-base font-medium text-slate-500">{plan.cadence}</span>
</p>
<ul className="mt-5 space-y-2 text-sm text-slate-700">
{plan.features.map((feature) => (
<li key={feature}>• {feature}</li>
))}
</ul>
<Link
href="#waitlist-final"
className="mt-6 inline-block rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white hover:bg-teal-800"
>
Join waitlist
</Link>
</article>
))}
</div>

<div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
<h3 className="text-xl font-bold text-slate-900">Pricing FAQs</h3>
<div className="mt-4 grid gap-4 md:grid-cols-3">
{pricingFaqs.map((item) => (
<div key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
<p className="font-semibold text-slate-900">{item.q}</p>
<p className="mt-2 text-sm text-slate-600">{item.a}</p>
</div>
))}
</div>
</div>
</div>
</section>

<section id="faq" className="reveal mx-auto max-w-4xl px-4 py-16 sm:px-6">
<SectionHeader
eyebrow="FAQ"
title="Questions we expect before you join"
subtitle="Clear, direct answers so you can decide quickly."
/>
<div className="space-y-3">
{faqItems.map((item, index) => {
const open = faqOpen === index;
return (
<article key={item.q} className="rounded-xl border border-slate-200 bg-white">
<button
type="button"
onClick={() => setFaqOpen(open ? null : index)}
className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
aria-expanded={open}
aria-controls={`faq-panel-${index}`}
>
<span className="font-semibold text-slate-900">{item.q}</span>
<span className="text-teal-700">{open ? "−" : "+"}</span>
</button>
{open && (
<div id={`faq-panel-${index}`} className="px-5 pb-5 text-slate-600">
{item.a}
</div>
)}
</article>
);
})}
</div>
</section>

<section id="waitlist-final" className="reveal border-y border-slate-200 bg-teal-900 py-16 text-white">
<div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
<p className="text-sm font-semibold uppercase tracking-wider text-teal-200">
Early-mover advantage
</p>
<h2 className="mt-3 text-3xl font-bold sm:text-4xl">
Get priority access before public launch
</h2>
<p className="mx-auto mt-4 max-w-2xl text-teal-100">
We’re opening a limited first cohort for agencies and bookkeepers who want a cleaner
collections workflow. We’re building this for people exactly like you.
</p>
<div className="mx-auto mt-8 max-w-xl rounded-2xl bg-white p-5 text-slate-900">
<WaitlistForm
source="final-cta"
onSuccess={onWaitlistSuccess}
buttonText="Join the waitlist"
/>
</div>
</div>
</section>
</main>

<footer className="bg-white">
<div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
<div>
<p className="text-lg font-bold text-slate-900">DunningPilot</p>
<p className="mt-3 text-sm text-slate-600">
Pre-launch AR workflow software designed to help service teams collect invoices faster
with less friction.
</p>
</div>
<div>
<p className="font-semibold text-slate-900">Navigation</p>
<ul className="mt-3 space-y-2 text-sm text-slate-600">
<li>
<Link href="#product">Product</Link>
</li>
<li>
<Link href="#pricing">Pricing</Link>
</li>
<li>
<Link href="#faq">FAQ</Link>
</li>
<li>
<Link href="#">Blog</Link>
</li>
<li>
<Link href="#">Contact</Link>
</li>
</ul>
</div>
<div>
<p className="font-semibold text-slate-900">Social</p>
<div className="mt-3 flex items-center gap-3 text-sm">
<a
href="https://x.com"
target="_blank"
rel="noreferrer"
aria-label="X (Twitter)"
className="rounded-full border border-slate-300 px-3 py-2 text-slate-700"
>
𝕏
</a>
<a
href="https://github.com"
target="_blank"
rel="noreferrer"
aria-label="GitHub"
className="rounded-full border border-slate-300 px-3 py-2 text-slate-700"
>
GH
</a>
<a
href="https://www.producthunt.com"
target="_blank"
rel="noreferrer"
aria-label="Product Hunt"
className="rounded-full border border-slate-300 px-3 py-2 text-slate-700"
>
PH
</a>
</div>
</div>
<div>
<p className="font-semibold text-slate-900">Legal</p>
<ul className="mt-3 space-y-2 text-sm text-slate-600">
<li>
<Link href="#">Privacy Policy</Link>
</li>
<li>
<Link href="#">Terms of Service</Link>
</li>
</ul>
</div>
</div>
<div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">
© {new Date().getFullYear()} DunningPilot. All rights reserved.
</div>
</footer>

<div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
<Link
href="#waitlist-final"
className="block rounded-xl bg-teal-700 px-4 py-3 text-center font-semibold text-white shadow-lg"
>
Join the waitlist
</Link>
</div>

{showExitOffer && !hasSubmitted && (
<div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/40 p-4 sm:items-center">
<div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
<p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
Before you go
</p>
<h3 className="mt-2 text-2xl font-bold text-slate-900">
Want launch access the moment we open?
</h3>
<p className="mt-2 text-sm text-slate-600">
Join the waitlist and we’ll send your invite as soon as private beta seats are released.
</p>
<div className="mt-4">
<WaitlistForm
source="exit-intent"
compact
onSuccess={onWaitlistSuccess}
buttonText="Notify me at launch"
/>
</div>
<button
type="button"
onClick={() => setShowExitOffer(false)}
className="mt-2 text-sm text-slate-500 underline"
>
No thanks
</button>
</div>
</div>
)}
</div>
);
}