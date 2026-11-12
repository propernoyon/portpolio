// Vercel serverless function: emails "Contact Now" form messages to you via Resend.
// Needs RESEND_API_KEY and CONTACT_TO_EMAIL set in Vercel → Settings → Environment Variables.
// CONTACT_FROM_EMAIL is optional: until you verify mdnoyon.com in Resend, leave it unset
// and the default onboarding@resend.dev sender is used (it can only send to your own
// Resend account email, which is exactly what this form needs).

interface ContactRequest {
  name?: string;
  email?: string;
  msg_subject?: string;
  message?: string;
  website?: string; // hidden honeypot field; real visitors leave it empty
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: { ok: boolean; message: string }, status = 200): Response =>
  Response.json(body, { status });

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
  if (!apiKey || !to) return json({ ok: false, message: 'Email is not configured on the server' }, 500);

  let input: ContactRequest;
  try {
    input = (await request.json()) as ContactRequest;
  } catch {
    return json({ ok: false, message: 'Invalid request' }, 400);
  }

  // Bots fill every field; pretend success so they don't retry.
  if (input.website) return json({ ok: true, message: 'Message Submitted!' });

  const name = (input.name ?? '').trim().slice(0, 200);
  const email = (input.email ?? '').trim().slice(0, 200);
  const subject = (input.msg_subject ?? '').trim().slice(0, 300);
  const message = (input.message ?? '').trim().slice(0, 5000);

  if (!name || !email || !subject || !message)
    return json({ ok: false, message: 'Please fill in all fields.' }, 400);
  if (!EMAIL_RE.test(email)) return json({ ok: false, message: 'Please enter a valid email address.' }, 400);

  const html = `
    <div style="font-family:sans-serif;line-height:1.6;color:#333;max-width:600px">
      <h2 style="margin:0 0 12px">New message from mdnoyon.com</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr style="border:0;border-top:1px solid #eee">
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email, // hit "Reply" in Gmail to answer the visitor directly
        subject: `[Contact] ${subject}`,
        html,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      }),
    });
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text());
      return json({ ok: false, message: 'Sorry, your message could not be sent. Please try again later.' }, 502);
    }
    return json({ ok: true, message: 'Message Submitted!' });
  } catch (err) {
    console.error(err);
    return json({ ok: false, message: 'Sorry, your message could not be sent. Please try again later.' }, 502);
  }
}
