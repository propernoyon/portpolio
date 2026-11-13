// Contact form: checks the fields, posts to the /api/contact serverless function
// and reports the result next to the button.

interface ContactResponse {
  ok: boolean;
  message: string;
}

const MESSAGES: Record<string, string> = {
  name: 'Enter your name.',
  email: 'Enter an email address like name@example.com.',
  msg_subject: 'Enter a subject.',
  message: 'Write your message.',
};

type Field = HTMLInputElement | HTMLTextAreaElement;

function showError(field: Field, text: string): void {
  field.setAttribute('aria-invalid', text ? 'true' : 'false');
  const error = document.getElementById(`${field.id}-error`);
  if (error) error.textContent = text;
}

function check(field: Field): boolean {
  const ok = field.checkValidity();
  showError(field, ok ? '' : (MESSAGES[field.id] ?? 'Check this field.'));
  return ok;
}

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('#contactForm');
  if (!form) return;

  const button = form.querySelector<HTMLButtonElement>('#submit')!;
  const status = form.querySelector<HTMLElement>('#msgSubmit')!;
  const fields = Array.from(form.querySelectorAll<Field>('[data-field]'));
  const value = (id: string): string => (form.querySelector<Field>(`#${id}`)?.value ?? '').trim();

  const setStatus = (text: string, kind: 'ok' | 'error' | '' = ''): void => {
    status.textContent = text;
    status.className = `form-status${kind ? ` is-${kind}` : ''}`;
  };

  for (const field of fields) {
    field.addEventListener('blur', () => {
      if (field.value || field.getAttribute('aria-invalid') === 'true') check(field);
    });
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') check(field);
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const invalid = fields.filter((field) => !check(field));
    if (invalid.length) {
      setStatus('Some fields need your attention.', 'error');
      invalid[0]!.focus();
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending…';
    setStatus('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: value('name'),
          email: value('email'),
          msg_subject: value('msg_subject'),
          message: value('message'),
          website: form.querySelector<HTMLInputElement>('input[name="website"]')?.value ?? '',
        }),
      });
      const result = (await res.json()) as ContactResponse;
      if (result.ok) {
        form.reset();
        setStatus('Message sent. I will reply by email.', 'ok');
      } else {
        setStatus(result.message || 'Your message was not sent. Try again.', 'error');
      }
    } catch {
      setStatus('Your message was not sent because of a network problem. Try again.', 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Send message';
    }
  });
}
