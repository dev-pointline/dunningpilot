import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
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
title: "Invoice Follow-Up Automation | DunningPilot",
description:
"Reduce manual invoice chasing with polite follow-up automation for agencies and bookkeepers. Launching soon—join the waitlist for early access.",
keywords: [
"invoice follow-up automation",
"accounts receivable automation for agencies",
"dunning software for bookkeepers",
"polite payment reminder workflow",
"reduce late invoice payments"
],
alternates: {
canonical: "/"
},
openGraph: {
type: "website",
url: siteUrl,
siteName: "DunningPilot",
title: "DunningPilot | Get Paid Faster Without Awkward Chasing",
description:
"A pre-launch workflow tool designed for agencies and bookkeeping firms to automate invoice follow-ups. Launching soon—join the waitlist.",
images: [
{
url: "/og-image.png",
width: 1200,
height: 630,
alt: "DunningPilot preview with overdue queue, follow-up timeline, and waitlist CTA"
}
]
},
twitter: {
card: "summary_large_image",
title: "DunningPilot | Invoice Follow-Up Automation Waitlist",
description:
"Launching soon for agencies and bookkeepers. Join the waitlist for early access.",
images: ["/og-image.png"]
},
icons: {
icon: "/favicon.ico"
}
};

export const viewport: Viewport = {
width: "device-width",
initialScale: 1,
themeColor: "#ffffff"
};

const organizationSchema = {
"@context": "https://schema.org",
"@type": "Organization",
name: "DunningPilot",
url: siteUrl,
description:
"Pre-launch software designed to help agencies and bookkeeping firms run polite, consistent invoice follow-ups.",
sameAs: [
"https://x.com/dunningpilot",
"https://www.producthunt.com/products/dunningpilot"
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
text: "We are onboarding early users in small cohorts. Join the waitlist and we will email you when your cohort opens."
}
},
{
"@type": "Question",
name: "Who owns uploaded invoice data?",
acceptedAnswer: {
"@type": "Answer",
text: "You keep ownership of your data. The platform is being built with export and deletion controls."
}
},
{
"@type": "Question",
name: "Can I switch from QuickBooks or Xero?",
acceptedAnswer: {
"@type": "Answer",
text: "That is a launch priority. Planned integrations and CSV import are designed to make switching straightforward."
}
}
]
};

export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en" className={`${inter.variable} ${manrope.variable}`}>
<head>
<link rel="icon" href="/favicon.ico" sizes="any" />
<script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
<script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
</head>
<body>{children}</body>
</html>
);
}