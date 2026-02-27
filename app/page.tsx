"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type WaitlistApiResponse = {
success?: boolean;
message?: string;
duplicate?: boolean;
error?: {
code?: string;
message?: string;
};
};

type WaitlistFormProps = {
source: string;
buttonLabel: string;
onJoined: () => void;
className?: string;
};

type ExitIntentModalProps = {
isOpen: boolean;
onClose: () => void;
onJoined: () => void;
};

const MOBILE_EXIT_SCROLL_THRESHOLD = 0.62;

const integrationBadges = [
"QuickBooks (planned)",
"Xero (planned)",
"Resend (planned)",
"Paddle (planned)",
"Supabase (planned)"
];

const painPoints = [
{
icon: "⏱️",
title: "3–8 hours/week lost to manual chasing",
description:
"Research for this pipeline repeatedly surfaced a 3–8 hour weekly burden for invoice follow-up in small service teams. Those hours come from repetitive reminders, spreadsheet checks, and inbox triage."
},
{
icon: "💸",
title: "Overdue invoices create cash-flow anxiety",
description:
"Earlier-stage modeling used a working assumption that roughly 22% of invoices can slip late in SMB service workflows. Even when revenue is booked, delayed cash makes payroll and hiring decisions harder."
},
{
icon: "😬",
title: "Tone pressure damages confidence",
description:
"Teams often send 2–4 follow-ups per overdue invoice, and every message is a relationship decision. Too soft gets ignored; too sharp can strain clients you want to keep."
}
];

const comparisons = [
{
before:
"Before: You manually review aging reports, rewrite reminders, and context-switch across tools.",
after:
"After: DunningPilot is designed to generate structured follow-up drafts and queue them for quick approval."
},
{
before:
"Before: Your team treats every overdue invoice the same, so high-risk balances can get missed.",
after:
"After: DunningPilot is built to prioritize by urgency so you can focus effort where cash risk is highest."
},
{
before:
"Before: Message tone changes from person to person, creating inconsistency and stress.",
after:
"After: DunningPilot is designed with tone guardrails and escalation paths, so communication stays clear and professional."
}
];

const features = [
{
icon: "🧠",
title: "Context-aware reminder drafting",
body:
"Build reminder sequences using invoice age, amount, and prior reply context. Designed so you can stop writing repetitive emails from scratch."
},
{
icon: "🎯",
title: "Reply-intent sorting",
body:
"Incoming responses are grouped into likely intents such as promise-to-pay, dispute, or delay. Built so you can respond faster without digging through noisy inbox threads."
},
{
icon: "🛡️",
title: "Tone and escalation controls",
body:
"Set the communication style your brand should follow as invoices age. Designed so you can stay firm without sounding aggressive."
},
{
icon: "📊",
title: "Cash-risk visibility",
body:
"See overdue balances by stage and priority in one clear view. Built so founders and finance leads can plan with less guesswork."
},
{
icon: "✅",
title: "Approval-first automation",
body:
"Automate repetitive steps while keeping review checkpoints where they matter most. Designed so you stay in control while reducing admin load."
},
{
icon: "✨",
title: "Client-ready activity summaries",
body:
"Generate clean follow-up timelines for internal reviews or client reporting. Built so you can explain receivables status without assembling reports manually."
}
];

const workflowSteps = [
{
step: "1",
title: "Import invoices",
detail:
"Upload CSV or connect a planned integration to pull invoice data in seconds.",
visual: "📥 Upload card"
},
{
step: "2",
title: "Pick your follow-up style",
detail:
"Choose timing, tone, and escalation preferences that fit your customer relationships.",
visual: "🎚️ Tone + cadence controls"
},
{
step: "3",
title: "Approve and send",
detail:
"Review drafts, send reminders, and track replies from a single timeline.",
visual: "✅ Timeline with status tags"
}
];

const useCases = [
{
persona: "Agency Founder",
context:
"A founder running a 10-person creative agency with recurring retainers.",
narrative:
"Here’s how this founder would use DunningPilot: upload monthly invoices, review follow-up drafts once, then let reminders run with approval checkpoints. The main benefit is reclaiming time for delivery and sales, instead of chasing receivables manually."
},
{
persona: "Fractional CFO",
context:
"A finance consultant supporting multiple service businesses each month.",
narrative:
"Here’s how this CFO would use DunningPilot: prioritize overdue balances by risk, monitor reply patterns, and apply consistent follow-up rules across clients. The core benefit is more predictable cash planning and clearer action queues."
},
{
persona: "Bookkeeping Firm Owner",
context:
"A bookkeeping firm managing AR workflows for several SMB clients.",
narrative:
"Here’s how this owner would use DunningPilot: set client-specific tone policies, run reminders from one workspace, and share timeline snapshots during monthly reporting. The strongest benefit is better client confidence through consistent process visibility."
}
];

const pricingTiers = [
{
name: "Starter",
price: "€49/mo",
annual: "Planned annual equivalent: €39/mo",
description: "For solo operators and very small teams.",
features: [
"Up to 50 invoices/month",
"1 workspace",
"AI reminder drafts",
"Manual approve-before-send workflow"
],
popular: false
},
{
name: "Pro",
price: "€149/mo",
annual: "Planned annual equivalent: €119/mo",
description: "For agencies and finance teams with recurring overdue volume.",
features: [
"Up to 300 invoices/month",
"3 workspaces",
"Advanced reply-intent sorting",
"Approval-first automation rules",
"Priority onboarding at launch"
],
popular: true
},
{
name: "Enterprise",
price: "€399/mo",
annual: "Planned annual equivalent: €319/mo",
description: "For bookkeeping firms handling multi-client receivables.",
features: [
"Up to 2,000 invoices/month",
"10 workspaces",
"Custom workflow controls",
"White-label reporting (planned)"
],
popular: false
}
];

const faqItems = [
{
q: "When does DunningPilot launch?",
a:
"We are onboarding early users in small cohorts. Join the waitlist and we will email you when your cohort is ready."
},
{
q: "How secure is invoice data?",
a:
"Security is being designed into the product from day one, including encrypted transport and access controls. We will publish full security documentation as launch approaches."
},
{
q: "Do we keep ownership of our data?",
a:
"Yes. You retain ownership of your data, and we are building export and deletion workflows into the platform."
},
{
q: "Can we switch from QuickBooks or Xero?",
a:
"That is a launch priority. Planned integrations and CSV import are built to reduce migration friction."
},
{
q: "How long does setup take?",
a:
"The initial setup is designed to take under 15 minutes for most teams using CSV import. Planned direct integrations will reduce setup time further."
},
{
q: "Will emails send automatically without review?",
a:
"Default behavior is approval-first. You choose how much automation to enable, so your team keeps control of sensitive communication."
},
{
q: "What support will early users receive?",
a:
"Early cohorts get direct founder support, quick implementation help, and fast iteration cycles based on real workflow feedback."
},
{
q: "What if we only have occasional overdue invoices?",
a:
"The product is best for recurring AR workflows. During onboarding, we’ll help confirm fit before recommending a pricing tier."
}
];

function WaitlistForm({
source,
buttonLabel,
onJoined,
className
}: WaitlistFormProps) {
const formId = useMemo(
() => source.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
[source]
);

const [email, setEmail] = useState("");
const [submitting, setSubmitting] = useState(false);
const [status, setStatus] = useState<{
type: "idle" | "success" | "error";
text: string;
}>({ type: "idle", text: "" });

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
event.preventDefault();

if (!email.trim()) {
setStatus({ type: "error", text: "Please enter a valid email address." });
return;
}

setSubmitting(true);
setStatus({ type: "idle", text: "" });

try {
const response = await fetch("/api/subscribe", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
email,
source
})
});

const payload = (await response.json().catch(() => ({}))) as WaitlistApiResponse;

if (!response.ok || !payload.success) {
const message =
payload.error?.message ??
payload.message ??
"Could not save your request. Please try again.";
setStatus({ type: "error", text: message });
return;
}

setStatus({
type: "success",
text: payload.message ?? "You're on the waitlist!"
});
setEmail("");
onJoined();
} catch {
setStatus({
type: "error",
text: "Network issue detected. Please try again in a moment."
});
} finally {
setSubmitting(false);
}
}

return (
<div className={`w-full max-w-[680px] ${className ?? ""}`}>
<form onSubmit={handleSubmit} noValidate aria-label={`waitlist-form-${formId}`}>
<div className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
<label htmlFor={`email-${formId}`} className="sr-only">
Email address
</label>
<input
id={`email-${formId}`}
type="email"
name="email"
value={email}
onChange={(event) => setEmail(event.target.value)}
placeholder="you@company.com"
autoComplete="email"
required
className="h-12 min-h-12 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:flex-1"
aria-describedby={`legal-${formId}`}
/>
<button
type="submit"
disabled={submitting}
className="h-12 min-h-12 w-full shrink-0 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
aria-label={buttonLabel}
>
{submitting ? "Joining..." : buttonLabel}
</button>
</div>

<p id={`legal-${formId}`} className="mt-3 text-xs leading-5 text-slate-600">
By joining, you agree to receive launch emails. Read our{" "}
<Link
href="/privacy"
className="font-medium text-slate-800 underline underline-offset-2"
>
Privacy Policy
</Link>{" "}
and{" "}
<Link
href="/terms"
className="font-medium text-slate-800 underline underline-offset-2"
>
Terms of Service
</Link>
. You can unsubscribe anytime.
</p>

<div className="mt-2 min-h-5" aria-live="polite" role="status">
{status.type !== "idle" && (
<p className={`text-sm ${status.type === "error" ? "text-rose-700" : "text-emerald-700"}`}>
{status.text}
</p>
)}
</div>
</form>
</div>
);
}

function ExitIntentModal({ isOpen, onClose, onJoined }: ExitIntentModalProps) {
const panelRef = useRef<HTMLDivElement>(null);
const closeButtonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
if (!isOpen) return;

const previousActiveElement =
typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null;

document.body.style.overflow = "hidden";
closeButtonRef.current?.focus();

const handleKeydown = (event: KeyboardEvent) => {
if (event.key === "Escape") {
event.preventDefault();
onClose();
return;
}

if (event.key !== "Tab") return;
const panel = panelRef.current;
if (!panel) return;

const focusable = panel.querySelectorAll<HTMLElement>(
'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);

if (focusable.length === 0) return;

const first = focusable[0];
const last = focusable[focusable.length - 1];
const active = document.activeElement;

if (event.shiftKey && active === first) {
event.preventDefault();
last.focus();
} else if (!event.shiftKey && active === last) {
event.preventDefault();
first.focus();
}
};

document.addEventListener("keydown", handleKeydown);
return () => {
document.body.style.overflow = "";
document.removeEventListener("keydown", handleKeydown);
previousActiveElement?.focus();
};
}, [isOpen, onClose]);

return (
<div
aria-hidden={!isOpen}
className={`fixed inset-0 z-50 transition ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
>
<button
type="button"
aria-label="Dismiss modal backdrop"
onClick={onClose}
className="absolute inset-0 h-full w-full bg-slate-900/50"
/>
<div className="flex min-h-full items-end justify-center p-4 sm:items-center">
<div
ref={panelRef}
role="dialog"
aria-modal="true"
aria-labelledby="exit-intent-title"
className={`relative w-full max-w-[560px] rounded-2xl bg-white p-6 shadow-2xl transition-transform ${
isOpen ? "translate-y-0" : "translate-y-4"
}`}
onClick={(event) => event.stopPropagation()}
>
<div className="mb-4 flex items-start justify-between gap-4">
<h3 id="exit-intent-title" className="font-heading text-2xl font-bold text-slate-900">
Wait before you go
</h3>
<button
ref={closeButtonRef}
type="button"
onClick={onClose}
className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
aria-label="Close waitlist modal"
>
✕
</button>
</div>

<p className="text-sm leading-6 text-slate-700">
If invoice follow-up keeps draining your week, get notified when launch access opens.
Mobile fallback trigger uses a 62% scroll-depth threshold.
</p>

<WaitlistForm
source="exit-modal"
buttonLabel="Get notified at launch"
onJoined={onJoined}
className="mt-5 max-w-[520px]"
/>

<button
type="button"
onClick={onClose}
className="mt-1 text-xs text-slate-500 underline underline-offset-2 hover:text-slate-700"
>
Not now
</button>
</div>
</div>
</div>
);
}

export default function LandingPage() {
const [joinedWaitlist, setJoinedWaitlist] = useState(false);
const [dismissedExitThisSession, setDismissedExitThisSession] = useState(false);
const [showExitModal, setShowExitModal] = useState(false);
const exitTriggerUsed = useRef(false);

useEffect(() => {
const joined = localStorage.getItem("dp_waitlist_joined") === "1";
const dismissed = sessionStorage.getItem("dp_exit_dismissed") === "1";

setJoinedWaitlist(joined);
setDismissedExitThisSession(dismissed);

if (joined || dismissed) {
exitTriggerUsed.current = true;
}
}, []);

useEffect(() => {
const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
if (nodes.length === 0) return;

const observer = new IntersectionObserver(
(entries, obs) => {
entries.forEach((entry) => {
if (!entry.isIntersecting) return;
entry.target.classList.add("reveal-visible");
obs.unobserve(entry.target);
});
},
{ threshold: 0.12 }
);

nodes.forEach((node) => {
node.classList.add("reveal");
observer.observe(node);
});

return () => observer.disconnect();
}, []);

useEffect(() => {
if (joinedWaitlist || dismissedExitThisSession) return;

const openExitModal = () => {
if (exitTriggerUsed.current) return;
exitTriggerUsed.current = true;
setShowExitModal(true);
};

const onMouseOut = (event: MouseEvent) => {
if (window.innerWidth < 1024) return;
if (event.clientY <= 0 && !event.relatedTarget) {
openExitModal();
}
};

const onScroll = () => {
if (window.innerWidth >= 1024) return;
const scrollDepth =
(window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;

if (scrollDepth >= MOBILE_EXIT_SCROLL_THRESHOLD) {
openExitModal();
}
};

window.addEventListener("mouseout", onMouseOut);
window.addEventListener("scroll", onScroll, { passive: true });

return () => {
window.removeEventListener("mouseout", onMouseOut);
window.removeEventListener("scroll", onScroll);
};
}, [joinedWaitlist, dismissedExitThisSession]);

const handleJoinedWaitlist = () => {
setJoinedWaitlist(true);
setShowExitModal(false);
localStorage.setItem("dp_waitlist_joined", "1");
sessionStorage.setItem("dp_waitlist_joined", "1");
exitTriggerUsed.current = true;
};

const handleDismissExit = () => {
setShowExitModal(false);
setDismissedExitThisSession(true);
sessionStorage.setItem("dp_exit_dismissed", "1");
exitTriggerUsed.current = true;
};

return (
<div className="min-h-screen bg-slate-50 text-slate-900">
<header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
<a href="#hero" className="flex items-center gap-2" aria-label="DunningPilot home">
<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
DP
</span>
<span className="font-heading text-sm font-semibold tracking-tight">DunningPilot</span>
</a>

<nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
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
<a href="mailto:hello@dunningpilot.com" className="text-sm text-slate-700 hover:text-slate-900">
Contact
</a>
</nav>

<a
href="#final-cta"
className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
>
Join waitlist
</a>
</div>
</header>

<main className="pb-24 sm:pb-0">
<section
id="hero"
className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20"
>
<div data-reveal>
<p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
Launching soon — be one of the first teams in
</p>
<h1 className="font-heading mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
Get paid faster without awkward invoice chasing
</h1>
<p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
DunningPilot is being built for agencies and bookkeeping firms that are tired of
manual follow-up work. Join the waitlist now and we’ll notify you when your early
access cohort opens.
</p>
<p className="mt-3 text-sm font-medium text-slate-600">↓ Enter your email for early access.</p>

<WaitlistForm
source="hero"
buttonLabel="Join the waitlist"
onJoined={handleJoinedWaitlist}
className="mt-6"
/>

<p className="mt-2 text-xs text-slate-500">
We only send launch updates and onboarding invites.
</p>
</div>

<div data-reveal className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
<p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
Hero visual description
</p>
<h2 className="font-heading mt-2 text-xl font-bold text-slate-900">
Split-panel “AR command center” mockup
</h2>
<p className="mt-3 text-sm leading-6 text-slate-700">
Left panel: overdue balance buckets and next-follow-up queue. Right panel: tone
selector, approval queue, and timeline of sent reminders. Include a clear directional
arrow from the dashboard preview toward the waitlist form.
</p>
<div className="mt-4 grid gap-3 sm:grid-cols-2">
<div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
<p className="text-xs font-semibold text-amber-700">Overdue this month</p>
<p className="text-2xl font-bold text-amber-900">€18,420</p>
</div>
<div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
<p className="text-xs font-semibold text-emerald-700">Queued follow-ups</p>
<p className="text-2xl font-bold text-emerald-900">23 drafts</p>
</div>
</div>
</div>
</section>

<section id="credibility" className="border-y border-slate-200 bg-white">
<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
<p data-reveal className="text-center text-sm font-medium text-slate-700">
Built for agencies and bookkeeping firms running recurring B2B invoices.
</p>
<div data-reveal className="mt-4 flex flex-wrap items-center justify-center gap-2">
{integrationBadges.map((badge) => (
<span
key={badge}
className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
>
{badge}
</span>
))}
</div>
<p data-reveal className="mt-4 text-center text-xs text-slate-500">
Research signal used in this validation: teams commonly report 3–8 hours/week spent
on manual invoice follow-up.
</p>
</div>
</section>

<section id="product" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
The pain this product is built to remove
</h2>
<p className="mt-3 text-slate-700">
If these feel familiar, DunningPilot was designed for your daily AR reality.
</p>
</div>

<div className="grid gap-6 md:grid-cols-3">
{painPoints.map((item) => (
<article key={item.title} data-reveal className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
<p className="text-2xl" aria-hidden>
{item.icon}
</p>
<h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
<p className="mt-3 text-sm leading-6 text-slate-700">{item.description}</p>
</article>
))}
</div>
</section>

<section id="solution" className="bg-white py-14">
<div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
Before vs after (design intent)
</h2>
<p className="mt-3 text-slate-700">
We’re pre-launch, so this compares your current workflow to what DunningPilot is
designed to enable.
</p>
</div>

<div className="space-y-4">
{comparisons.map((row) => (
<div key={row.before} data-reveal className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5 lg:grid-cols-2">
<p className="text-sm leading-6 text-rose-800">
<strong>Before:</strong> {row.before.replace("Before: ", "")}
</p>
<p className="text-sm leading-6 text-emerald-800">
<strong>After:</strong> {row.after.replace("After: ", "")}
</p>
</div>
))}
</div>
</div>
</section>

<section id="features" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
Feature deep-dive
</h2>
<p className="mt-3 text-slate-700">
Every feature is built around one goal: reduce AR effort while improving follow-up consistency.
</p>
</div>

<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
{features.map((feature) => (
<article key={feature.title} data-reveal className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
<p className="text-2xl" aria-hidden>
{feature.icon}
</p>
<h3 className="mt-3 text-lg font-semibold">{feature.title}</h3>
<p className="mt-3 text-sm leading-6 text-slate-700">{feature.body}</p>
</article>
))}
</div>
</section>

<section id="how-it-works" className="bg-white py-14">
<div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
How it works in under 60 seconds
</h2>
<p className="mt-3 text-slate-700">
Setup is designed to be fast enough for busy teams.
</p>
</div>

<div className="grid gap-6 md:grid-cols-3">
{workflowSteps.map((step) => (
<article key={step.step} data-reveal className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
<p className="text-sm font-semibold text-emerald-700">Step {step.step}</p>
<h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
<p className="mt-3 text-sm leading-6 text-slate-700">{step.detail}</p>
<p className="mt-3 text-xs text-slate-500">Visual suggestion: {step.visual}</p>
</article>
))}
</div>
</div>
</section>

<section id="use-cases" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
Use cases by persona
</h2>
<p className="mt-3 text-slate-700">
No fake testimonials. Just practical day-to-day scenarios.
</p>
</div>

<div className="space-y-4">
{useCases.map((item) => (
<article key={item.persona} data-reveal className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
<h3 className="text-lg font-semibold">{item.persona}</h3>
<p className="mt-2 text-sm text-slate-600">{item.context}</p>
<p className="mt-3 text-sm leading-6 text-slate-700">{item.narrative}</p>
</article>
))}
</div>
</section>

<section id="pricing" className="bg-white py-14">
<div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
<div data-reveal className="mb-10 max-w-3xl">
<h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
Planned Pricing
</h2>
<p className="mt-3 text-slate-700">
Transparent launch pricing with an annual discount planned at roughly 20%.
</p>
</div>

<div className="grid gap-6 lg:grid-cols-3">
{pricingTiers.map((tier) => (
<article
key={tier.name}
data-reveal
className={`relative rounded-2xl border p-6 ${
tier.popular
? "border-emerald-500 bg-emerald-50 shadow-md"
: "border-slate-200 bg-slate-50"
}`}
>
{tier.popular && (
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
href="#final-cta"
className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
>
Join waitlist
</a>
</article>
))}
</div>

<div data-reveal className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
<h3 className="text-lg font-semibold">Pricing FAQ</h3>
<div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
<p>
<strong>When will this launch?</strong> Early cohorts will roll out after core
workflow reliability checks are complete.
</p>
<p>
<strong>Will there be a free trial?</strong> We plan to provide an early-access
evaluation period before full billing begins.
</p>
<p>
<strong>Can I cancel anytime?</strong> Yes. Planned monthly tiers are built for
flexibility with no hidden lock-in.
</p>
</div>
</div>
</div>
</section>

<section id="faq" className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
<div data-reveal className="mb-10">
<h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
Frequently asked questions
</h2>
<p className="mt-3 text-slate-700">
Answers built from common objections seen in AR software reviews and early interviews.
</p>
</div>

<div className="space-y-3">
{faqItems.map((item) => (
<details key={item.q} data-reveal className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
<summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
{item.q}
</summary>
<p className="mt-3 text-sm leading-6 text-slate-700">{item.a}</p>
</details>
))}
</div>
</section>

<section id="final-cta" className="bg-emerald-900 py-16 text-white">
<div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
<div data-reveal>
<h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
Early-access cohorts are intentionally small
</h2>
<p className="mx-auto mt-4 max-w-2xl text-emerald-100">
If late invoices keep interrupting your week, join now and secure a spot in an early
onboarding batch. We’re building this for teams exactly like yours.
</p>
</div>

<div data-reveal className="mx-auto mt-8 max-w-[720px] rounded-2xl bg-white p-5 text-left text-slate-900 sm:p-6">
<WaitlistForm
source="final-cta"
buttonLabel="Get early access"
onJoined={handleJoinedWaitlist}
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
<p className="font-heading font-semibold">DunningPilot</p>
</div>
<p className="mt-3 text-sm leading-6 text-slate-600">
Pre-launch software designed to help service teams run consistent invoice follow-up
workflows with less manual overhead.
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

{!joinedWaitlist && (
<div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white p-3 shadow-[0_-6px_20px_rgba(15,23,42,0.08)] sm:hidden">
<a
href="#final-cta"
className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
>
Join the waitlist
</a>
</div>
)}

<ExitIntentModal
isOpen={showExitModal && !joinedWaitlist}
onClose={handleDismissExit}
onJoined={handleJoinedWaitlist}
/>
</div>
);
}