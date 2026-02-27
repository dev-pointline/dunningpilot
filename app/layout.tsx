import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
subsets: ["latin"],
variable: "--font-inter"
});

const manrope = Manrope({
subsets: ["latin"],
variable: "--font-manrope"
});

const siteUrl = "https://dunningpilot.com";

export const metadata: Metadata = {
metadataBase: new URL(siteUrl),
title: "Invoice Follow-Up Software | DunningPilot Waitlist",
description:
"Automate polite invoice follow-ups and protect client relationships. DunningPilot is launching soon—join the waitlist for early access.",
keywords: [
"invoice follow-up software",
"accounts receivable automation for agencies",
"dunning automation",
"late invoice reminder tool",
"AR collections software for small business"
],
openGraph: {
title: "DunningPilot | Invoice Follow-Up Software for Agencies",
description:
"Stop awkward payment chasing. DunningPilot is built to help agencies and bookkeepers send smarter invoice follow-ups—join the waitlist.",
type: "website",
url: siteUrl,
siteName: "DunningPilot",
images: [
{
url: "/og-image.png",
width: 1200,
height: 630,
alt: "DunningPilot dashboard preview with smart reminder timeline and waitlist CTA"
}
]
},
twitter: {
card: "summary_large_image",
title: "DunningPilot | Invoice Follow-Up Software Waitlist",
description:
"Built for agencies and bookkeeping teams that want faster payments without awkward chasing. Join early access.",
images: ["/og-image.png"]
},
icons: {
icon: "/favicon.ico"
},
alternates: {
canonical: "/"
}
};

export const viewport: Viewport = {
width: "device-width",
initialScale: 1,
themeColor: "#10b981"
};

const organizationSchema = {
"@context": "https://schema.org",
"@type": "Organization",
name: "DunningPilot",
url: siteUrl,
description:
"DunningPilot is a pre-launch accounts receivable workflow product built for agencies and bookkeeping teams.",
contactPoint: [
{
"@type": "ContactPoint",
contactType: "Customer Support",
email: "hello@dunningpilot.com"
}
]
};

const faqSchema = {
"@context": "https://schema.org",
"@type": "FAQPage",
mainEntity: [
{
"@type": "Question",
name: "When does DunningPilot launch?",
acceptedAnswer: {
"@type": "Answer",
text: "We are onboarding early-access users in controlled waves. Join the waitlist and we will email your invite window as soon as your segment opens."
}
},
{
"@type": "Question",
name: "Is this replacing QuickBooks or Xero?",
acceptedAnswer: {
"@type": "Answer",
text: "No. DunningPilot is designed as a focused follow-up layer that works with your accounting workflow, so you keep your current ledger and reporting setup."
}
},
{
"@type": "Question",
name: "How long does setup take?",
acceptedAnswer: {
"@type": "Answer",
text: "The onboarding flow is being built for a sub-15-minute first run: upload invoice data, choose tone guardrails, and review your first follow-up sequence."
}
},
{
"@type": "Question",
name: "Who owns the data?",
acceptedAnswer: {
"@type": "Answer",
text: "You retain ownership of your invoice and customer data. We process it only to provide the service and you can request deletion at any time."
}
}
]
};

export default function RootLayout({
children
}: Readonly<{ children: React.ReactNode }>) {
return (
<html lang="en" className={`${inter.variable} ${manrope.variable}`}>
<body className="font-[var(--font-inter)] antialiased">
<a
href="#main-content"
className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
>
Skip to content
</a>
{children}
<script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
<script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
</body>
</html>
);
}