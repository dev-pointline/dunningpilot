import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
title: "Blog | DunningPilot",
description: "Updates on DunningPilot build progress and launch milestones."
};

export default function BlogPage() {
return (
<main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
<Link href="/" className="text-sm text-emerald-700 underline underline-offset-2">
← Back to DunningPilot
</Link>

<h1 className="font-heading mt-4 text-3xl font-bold tracking-tight">DunningPilot Blog</h1>
<p className="mt-3 text-sm leading-6 text-slate-700">
We’ll publish launch notes, product decisions, and validation learnings here as we build.
</p>
</main>
);
}