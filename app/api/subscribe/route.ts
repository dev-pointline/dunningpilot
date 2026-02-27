import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
try {
const body = (await request.json()) as { email?: string; name?: string };

const email = String(body?.email ?? "")
.trim()
.toLowerCase();
const name = body?.name ? String(body.name).trim() : undefined;

if (!email || !EMAIL_REGEX.test(email)) {
return NextResponse.json(
{ success: false, message: "Please enter a valid email address." },
{ status: 400 }
);
}

console.log("[DunningPilot Waitlist Signup]", {
email,
name,
timestamp: new Date().toISOString()
});

return NextResponse.json({
success: true,
message: "You're on the waitlist!"
});
} catch (error) {
console.error("[DunningPilot Subscribe Error]", error);
return NextResponse.json(
{ success: false, message: "Something went wrong. Please try again." },
{ status: 500 }
);
}
}