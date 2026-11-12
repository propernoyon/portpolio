// Vercel serverless function: sends an SMS through GreenWeb (was sms.php).
// The token is read from the SMS_API_TOKEN environment variable set in Vercel.

const GREENWEB_URL = 'http://api.greenweb.com.bd/api.php?json';

interface SmsRequest {
  number?: string;
  text?: string;
}

const json = (body: { ok: boolean; message: string }, status = 200): Response =>
  Response.json(body, { status });

export async function POST(request: Request): Promise<Response> {
  const token = process.env.SMS_API_TOKEN;
  if (!token) return json({ ok: false, message: 'SMS_API_TOKEN is not configured' }, 500);

  let input: SmsRequest;
  try {
    input = (await request.json()) as SmsRequest;
  } catch {
    return json({ ok: false, message: 'Invalid request' }, 400);
  }

  const to = (input.number ?? '').trim();
  const message = (input.text ?? '').trim();
  if (!to || !message) return json({ ok: false, message: 'Number and message are required' }, 400);

  try {
    const res = await fetch(GREENWEB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ to, message, token }),
    });
    const result = await res.text();
    if (res.ok && result) return json({ ok: true, message: 'message Send successfully' });
    return json({ ok: false, message: result || `SMS gateway error (${res.status})` }, 502);
  } catch (err) {
    return json({ ok: false, message: err instanceof Error ? err.message : 'SMS gateway unreachable' }, 502);
  }
}
