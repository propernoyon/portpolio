// Scroll-reveal animations (was js/wow-anim.js)
export function initWow(): void {
  const wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 200, // default
    mobile: true, // default
    live: true, // default
  });
  wow.init();
}
