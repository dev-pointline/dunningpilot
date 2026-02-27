import { headers } from "next/headers";
import { NextResponse } from "next/server";

type SubscribeBody = {
email?: string;
name?: string;
source?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

function sanitizeSource(source?: string): string {
if (!source || typeof source !== "string") return "landing-page";
const cleaned = source
.toLowerCase()
.trim()
.replace(/[^a-z0-9-_ ]/g, "")
.replace(/\s+/g, "-")
.slice(0, 64);

return cleaned || "landing-page";
}

function cleanName(name?: string): string | null {
if (!name || typeof name !== "string") return null;
const trimmed = name.trim().slice(0, 120);
return trimmed.length ? trimmed : null;
}

export async function POST(request: Request) {
let body: SubscribeBody;

try {
body = (await request.json()) as SubscribeBody;
} catch {
return NextResponse.json(
{ success: false, message: "Invalid request payload." },
{ status: 400 }
);
}

const email = (body.email ?? "").trim().toLowerCase();
const source = sanitizeSource(body.source);
const name = cleanName(body.name);

if (!EMAIL_REGEX.test(email)) {
return NextResponse.json(
{ success: false, message: "Please provide a valid email address." },
{ status: 400 }
);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
return NextResponse.json(
{
success: false,
message:
"Waitlist is temporarily unavailable. Please email hello@dunningpilot.com and we’ll add you manually.",
},
{ status: 503 }
);
}

const requestHeaders = await headers();
const userAgent = requestHeaders.get("user-agent")?.slice(0, 250) ?? "unknown";
const referer = requestHeaders.get("referer")?.slice(0, 250) ?? null;

const payload = [
{
email,
source,
metadata: {
name,
referer,
user_agent: userAgent,
},
},
];

try {
const insertResponse = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
method: "POST",
headers: {
apikey: supabaseServiceRoleKey,
Authorization: `Bearer ${supabaseServiceRoleKey}`,
"Content-Type": "application/json",
Prefer: "return=representation",
},
body: JSON.stringify(payload),
cache: "no-store",
});

if (insertResponse.ok) {
return NextResponse.json({
success: true,
message: "You're on the waitlist!",
});
}

const errorPayload = (await insertResponse.json().catch(() => null)) as
| { code?: string; message?: string }
| null;

const duplicateDetected =
insertResponse.status === 409 ||
errorPayload?.code === "23505" ||
(errorPayload?.message ?? "").toLowerCase().includes("duplicate");

if (duplicateDetected) {
return NextResponse.json({
success: true,
message: "You're already on the waitlist — we’ll notify you at launch.",
});
}

console.error("Waitlist insert failed", {
status: insertResponse.status,
code: errorPayload?.code ?? "unknown",
source,
});

return NextResponse.json(
{
success: false,
message:
"We couldn't save your request right now. Please try again in a minute.",
},
{ status: 500 }
);
} catch (error) {
console.error("Waitlist request failed", {
reason: error instanceof Error ? error.message : "unknown",
source,
});

return NextResponse.json(
{
success: false,
message:
"We couldn't save your request right now. Please try again in a minute.",
},
{ status: 500 }
);
}
}