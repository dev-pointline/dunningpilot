import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
subsets: ["latin"],
variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
subsets: ["latin"],
variable: "--font-space"
});

const siteUrl = "https://dunningpilot.com";

export const metadata: Metadata = {
metadataBase: new URL(siteUrl),
title: "DunningPilot | AI Invoice Follow-Up Waitlist",
description:
"Automate invoice follow-ups, protect client relationships, and improve cash flow. DunningPilot is launching soon—join the waitlist for early access.",
keywords: [
"accounts receivable automation for agencies",
"invoice follow up automation",
"AI dunning software",
"collect unpaid invoices faster",
"QuickBooks reminder alternative"
],
alternates: {
canonical: siteUrl
},
openGraph: {
type: "website",
url: siteUrl,
siteName: "DunningPilot",
title: "Collect invoices faster with AI follow-ups",
description:
"DunningPilot is designed for agencies and bookkeepers that need faster invoice collection without awkward client chasing."
},
twitter: {
card: "summary_large_image",
title: "Collect invoices faster with AI follow-ups",
description:
"Launching soon: DunningPilot helps teams send smarter reminders and improve cash flow. Join the waitlist."
},
icons: {
icon: "/favicon.ico"
}
};

export const viewport: Viewport = {
width: "device-width",
initialScale: 1,
viewportFit: "cover",
themeColor: "#ffffff"
};

const organizationSchema = {
"@context": "https://schema.org",
"@type": "Organization",
name: "DunningPilot",
url: siteUrl,
description:
"Pre-launch software designed to help agencies and bookkeepers automate invoice follow-ups and improve cash flow.",
sameAs: [
"https://x.com",
"https://github.com",
"https://www.producthunt.com"
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
text: "We're in pre-launch validation now. Waitlist members get the first invites as soon as private beta opens."
}
},
{
"@type": "Question",
name: "Is invoice data secure?",
acceptedAnswer: {
"@type": "Answer",
text: "Security is being designed into the product from day one with encrypted transport and role-based access controls. Early users will receive clear data-handling documentation before onboarding."
}
},
{
"@type": "Question",
name: "Who owns my data?",
acceptedAnswer: {
"@type": "Answer",
text: "You keep ownership of your invoice and client communication data. DunningPilot is planned to operate as a processing layer, not a data owner."
}
},
{
"@type": "Question",
name: "Can I switch from an existing AR tool later?",
acceptedAnswer: {
"@type": "Answer",
text: "Yes. The onboarding flow is being built to support CSV import first, then accounting-tool sync so switching does not require a full rebuild."
}
}
]
};

export default function RootLayout({
children
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="en">
<body
className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen antialiased`}
>
{children}
<Script
id="organization-schema"
type="application/ld+json"
strategy="afterInteractive"
dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
<Script
id="faq-schema"
type="application/ld+json"
strategy="afterInteractive"
dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
</body>
</html>
);
}