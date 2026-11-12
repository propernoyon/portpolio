// SMS form: posts to the /api/sms serverless function (was the PHP block in sms.php)

interface SmsResponse {
  ok: boolean;
  message: string;
}

const form = document.querySelector<HTMLFormElement>('form.contact1-form')!;
const okEl = document.getElementById('sms-ok')!;
const wrongEl = document.getElementById('sms-wrong')!;
const submitBtn = form.querySelector<HTMLInputElement>('input[type="submit"]')!;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  okEl.textContent = '';
  wrongEl.textContent = '';
  submitBtn.disabled = true;

  const data = new FormData(form);
  try {
    const res = await fetch('/api/sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: String(data.get('number') ?? ''),
        text: String(data.get('text') ?? ''),
      }),
    });
    const result = (await res.json()) as SmsResponse;
    if (result.ok) okEl.textContent = result.message;
    else wrongEl.textContent = result.message;
  } catch (err) {
    wrongEl.textContent = err instanceof Error ? err.message : 'Request failed';
  } finally {
    submitBtn.disabled = false;
  }
});
