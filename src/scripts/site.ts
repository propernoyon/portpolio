// Navigation, smooth scroll, counters, fancybox, mixitup, parallax (was js/main.js)

export function initSite(): void {
  const $body = $('body');
  const $window = $(window);

  /* ============================= Preload ============================== */
  $window.load(() => {
    // Animate loader off screen
    $('.se-pre-con').fadeOut('slow');
  });

  /* ============================= Navigation ============================== */
  $('.navbar-collapse').on('click', () => {
    $('.navbar-collapse').collapse('hide');
  });

  $window.scroll(() => {
    if (($('.navbar').offset()?.top ?? 0) > 50) {
      $('.navbar-default').addClass('small');
    } else {
      $('.navbar-default').removeClass('small');
    }
  });

  /* ============================= Smooth scroll ============================== */
  $(() => {
    $('.navbar-default a[href^="#"], a.smooth-scroll[href^="#"]').on('click', function (event) {
      const $anchor = $(this);
      $('html, body')
        .stop()
        .animate({ scrollTop: ($($anchor.attr('href') as string).offset()?.top ?? 0) - 1 }, 1000);
      event.preventDefault();
    });
  });

  /* ============================= Scroll spy ============================== */
  $body.scrollspy({ target: '.navbar-collapse', offset: 15 });

  /* ============================= Counter up ============================== */
  $('.Count').each(function () {
    $(this)
      .prop('Counter', 0)
      .animate(
        { Counter: $(this).text() } as unknown as JQuery.PlainObject,
        {
          duration: 5000,
          easing: 'swing',
          step: (now: number) => {
            $(this).text(Math.ceil(now));
          },
        },
      );
  });

  /* ============================= Fancybox ============================== */
  $('.fancybox-buttons').fancybox({
    openEffect: 'fade',
    closeEffect: 'fade',
    prevEffect: 'fade',
    prevSpeed: 550,
    nextEffect: 'fade',
    nextSpeed: 550,
    closeBtn: true,
    helpers: {
      title: { type: 'inside' },
      buttons: {},
    },
  });

  $(() => {
    $('.fancybox').fancybox();
  });

  /* ============================= MixItUp ============================== */
  $(() => {
    $('#portfoliolist').mixItUp({
      selectors: { target: '.portfolio', filter: '.filter' },
      load: { filter: 'all' },
    });
  });

  /* ============================= Parallax ============================== */
  $(() => {
    $('.parallax').scrolly({ bgParallax: true });
  });
}
