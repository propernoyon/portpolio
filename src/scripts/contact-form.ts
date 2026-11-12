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

function formSuccess(): void {
  ($('#contactForm')[0] as HTMLFormElement).reset();
  submitMSG(true, 'Message Submitted!');
}

function submitForm(): void {
  // Initiate variables with form content
  const name = String($('#name').val() ?? '');
  const email = String($('#email').val() ?? '');
  const msgSubject = String($('#msg_subject').val() ?? '');
  const message = String($('#message').val() ?? '');

  $.ajax({
    type: 'POST',
    url: 'assets/php/form-process.php',
    data:
      'name=' + name + '&email=' + email + '&msg_subject=' + msgSubject + '&message=' + message,
    success(text: string) {
      if (text == 'success') {
        formSuccess();
      } else {
        formError();
        submitMSG(false, text);
      }
    },
  });
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
        submitForm();
      }
    });
}
