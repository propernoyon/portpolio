// Contact form handling (was assets/js/contact-form-script.js)

const ANIMATION_END =
  'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

function formError(): void {
  $('#contactForm')
    .removeClass()
    .addClass('shake animated')
    .one(ANIMATION_END, function () {
      $(this).removeClass();
    });
}

function submitMSG(valid: boolean, msg: string): void {
  const msgClasses = valid
    ? 'h3 text-center tada animated text-success'
    : 'h3 text-center text-danger';
  $('#msgSubmit').removeClass().addClass(msgClasses).text(msg);
}

interface ContactResponse {
  ok: boolean;
  message: string;
}

function formSuccess(msg: string): void {
  ($('#contactForm')[0] as HTMLFormElement).reset();
  submitMSG(true, msg);
}

async function submitForm(): Promise<void> {
  const $button = $('#submit');
  const $loading = $('#formLoading');
  $button.prop('disabled', true);
  $loading.show();

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: String($('#name').val() ?? ''),
        email: String($('#email').val() ?? ''),
        msg_subject: String($('#msg_subject').val() ?? ''),
        message: String($('#message').val() ?? ''),
        website: String($('#contactForm input[name="website"]').val() ?? ''),
      }),
    });
    const result = (await res.json()) as ContactResponse;
    if (result.ok) {
      formSuccess(result.message);
    } else {
      formError();
      submitMSG(false, result.message);
    }
  } catch {
    formError();
    submitMSG(false, 'Network error. Please try again.');
  } finally {
    $loading.hide();
    $button.prop('disabled', false);
  }
}

export function initContactForm(): void {
  $('#contactForm')
    .validator()
    .on('submit', (event) => {
      if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, 'Did you fill in the form properly?');
      } else {
        // everything looks good!
        event.preventDefault();
        void submitForm();
      }
    });
}
