import { NextResponse } from "next/server";

/**
 * Server-side proxy to the Cloudflare email-worker.
 * Secrets stay on the server (never NEXT_PUBLIC_*):
 *
 *   EMAIL_WORKER_URL=https://email-worker.<account>.workers.dev
 *   EMAIL_WORKER_API_KEY=your-api-key
 */

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
  app?: string;
};

export async function POST(request: Request) {
  const workerUrl = process.env.EMAIL_WORKER_URL;
  const apiKey = process.env.EMAIL_WORKER_API_KEY;

  if (!workerUrl || !apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "Email service is not configured",
        code: "misconfigured",
      },
      { status: 500 },
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body", code: "invalid_json" },
      { status: 400 },
    );
  }

  const upstream = await fetch(`${workerUrl.replace(/\/$/, "")}/api/contact`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: body.name,
      email: body.email,
      message: body.message,
      subject: body.subject,
      app: body.app ?? "soralabs-landing",
    }),
  });

  const payload = await upstream.json().catch(() => ({
    ok: false,
    error: "Invalid response from email service",
  }));

  const retryAfter = upstream.headers.get("Retry-After");

  return NextResponse.json(payload, {
    status: upstream.status,
    headers: retryAfter ? { "Retry-After": retryAfter } : undefined,
  });
}
