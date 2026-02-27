import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
subsets: ["latin"],
variable: "--font-inter",
});

const manrope = Manrope({
subsets: ["latin"],
variable: "--font-manrope",
});

const siteUrl = "https://dunningpilot.com";

export const metadata: Metadata = {
metadataBase: new URL(siteUrl),
title: "Invoice Follow-Up Automation | DunningPilot Waitlist",
description:
"Automate polite invoice follow-ups for agencies and bookkeepers. Launching soon—join the waitlist for early access.",
keywords: [
"invoice follow-up automation",
"accounts receivable automation for agencies",
"polite payment reminder software",
"dunning management for bookkeepers",
"reduce late invoice payments",
],
alternates: {
canonical: "/",
},
openGraph: {
title: "DunningPilot | Get Paid Faster Without Awkward Chasing",
description:
"A pre-launch tool designed to help agencies and bookkeepers chase overdue invoices with less manual work. Join the waitlist.",
url: siteUrl,
siteName: "DunningPilot",
locale: "en_GB",
type: "website",
images: [
{
url: "/og-image.png",
width: 1200,
height: 630,
alt: "DunningPilot dashboard preview with overdue invoices, follow-up timeline, and waitlist CTA.",
},
],
},
twitter: {
card: "summary_large_image",
title: "DunningPilot | Invoice Follow-Up Automation Waitlist",
description:
"Launching soon for agencies and bookkeepers. Join the waitlist for early access.",
images: ["/og-image.png"],
},
icons: {
icon: "/favicon.ico",
},
};

export const viewport: Viewport = {
width: "device-width",
initialScale: 1,
themeColor: "#ffffff",
};

const organizationSchema = {
"@context": "https://schema.org",
"@type": "Organization",
name: "DunningPilot",
url: siteUrl,
logo: `${siteUrl}/logo.png`,
description:
"DunningPilot is a pre-launch workflow tool designed to help agencies and bookkeeping firms manage invoice follow-ups with less manual effort.",
sameAs: [
"https://x.com/dunningpilot",
"https://www.producthunt.com/products/dunningpilot",
],
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
text: "We are onboarding waitlist members in small cohorts. Join the waitlist and we will email you as soon as your cohort opens.",
},
},
{
"@type": "Question",
name: "Will DunningPilot send emails automatically?",
acceptedAnswer: {
"@type": "Answer",
text: "The product is being designed with approval controls and tone guardrails so teams can choose exactly when reminders are sent.",
},
},
{
"@type": "Question",
name: "Do I keep ownership of my invoice data?",
acceptedAnswer: {
"@type": "Answer",
text: "Yes. Your data remains yours, and the platform is being built with export and deletion workflows.",
},
},
{
"@type": "Question",
name: "Can I switch from QuickBooks or Xero?",
acceptedAnswer: {
"@type": "Answer",
text: "That is the plan. We are building import and planned integrations so you can start without rebuilding your workflow.",
},
},
],
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
const jsonLd = [organizationSchema, faqSchema];

return (
<html lang="en" className={`${inter.variable} ${manrope.variable}`}>
<head>
<link rel="icon" href="/favicon.ico" />
{jsonLd.map((schema, index) => (
<script
key={`jsonld-${index}`}
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
))}
</head>
<body
className="font-[var(--font-inter)] antialiased"
style={
{
"--font-display": "var(--font-manrope)",
} as React.CSSProperties
}
>
{children}
</body>
</html>
);
}