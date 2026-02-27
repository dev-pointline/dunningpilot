import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

type SubscribeBody = {
email?: string;
name?: string;
source?: string;
};

type RateRecord = {
count: number;
resetAt: number;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;

const globalRateStore = globalThis as typeof globalThis & {
__dunningpilotRateLimit?: Map<string, RateRecord>;
};

const rateLimitStore =
globalRateStore.__dunningpilotRateLimit ?? new Map<string, RateRecord>();

if (!globalRateStore.__dunningpilotRateLimit) {
globalRateStore.__dunningpilotRateLimit = rateLimitStore;
}

function sanitizeSource(raw?: string): string {
if (!raw || typeof raw !== "string") return "landing-page";
const safe = raw
.toLowerCase()
.trim()
.replace(/[^a-z0-9-_ ]/g, "")
.replace(/\s+/g, "-")
.slice(0, 64);

return safe || "landing-page";
}

function sanitizeName(raw?: string): string | null {
if (!raw || typeof raw !== "string") return null;
const trimmed = raw.trim().slice(0, 120);
return trimmed.length ? trimmed : null;
}

function getClientIp(headerStore: Headers): string {
const forwardedFor = headerStore.get("x-forwarded-for");
if (forwardedFor) {
return forwardedFor.split(",")[0]?.trim() || "unknown";
}
return headerStore.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
const now = Date.now();

for (const [key, value] of rateLimitStore.entries()) {
if (value.resetAt <= now) {
rateLimitStore.delete(key);
}
}

const current = rateLimitStore.get(ip);

if (!current || current.resetAt <= now) {
rateLimitStore.set(ip, {
count: 1,
resetAt: now + RATE_LIMIT_WINDOW_MS
});
return { allowed: true, retryAfter: 0 };
}

if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
const retryAfter = Math.ceil((current.resetAt - now) / 1000);
return { allowed: false, retryAfter };
}

rateLimitStore.set(ip, {
count: current.count + 1,
resetAt: current.resetAt
});

return { allowed: true, retryAfter: 0 };
}

export async function POST(request: Request) {
let body: SubscribeBody;

try {
body = (await request.json()) as SubscribeBody;
} catch {
return NextResponse.json(
{
success: false,
error: {
code: "INVALID_JSON",
message: "Request body must be valid JSON."
}
},
{ status: 400 }
);
}

const headerStore = await headers();
const ip = getClientIp(headerStore);
const rate = checkRateLimit(ip);

if (!rate.allowed) {
return NextResponse.json(
{
success: false,
error: {
code: "RATE_LIMITED",
message: "Too many requests. Please try again shortly."
}
},
{
status: 429,
headers: {
"Retry-After": String(rate.retryAfter)
}
}
);
}

const email = (body.email ?? "").trim().toLowerCase();
const source = sanitizeSource(body.source);
const name = sanitizeName(body.name);

if (!EMAIL_REGEX.test(email)) {
return NextResponse.json(
{
success: false,
error: {
code: "INVALID_EMAIL",
message: "Please provide a valid email address."
}
},
{ status: 400 }
);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRole) {
return NextResponse.json(
{
success: false,
error: {
code: "SERVICE_UNAVAILABLE",
message:
"Waitlist is temporarily unavailable. Please email hello@dunningpilot.com."
}
},
{ status: 503 }
);
}

const supabase = createClient(supabaseUrl, supabaseServiceRole, {
auth: {
persistSession: false,
autoRefreshToken: false
}
});

const metadata = {
name,
referrer: headerStore.get("referer")?.slice(0, 240) ?? null,
user_agent: headerStore.get("user-agent")?.slice(0, 240) ?? null
};

const { error } = await supabase.from("waitlist").insert({
email,
source,
metadata
});

if (error) {
if (error.code === "23505") {
return NextResponse.json({
success: true,
duplicate: true,
message: "You're already on the waitlist — we'll notify you at launch."
});
}

console.error("waitlist_insert_error", {
code: error.code,
source
});

return NextResponse.json(
{
success: false,
error: {
code: "SERVER_ERROR",
message: "We couldn't save your request right now. Please try again."
}
},
{ status: 500 }
);
}

return NextResponse.json({
success: true,
duplicate: false,
message: "You're on the waitlist!"
});
}