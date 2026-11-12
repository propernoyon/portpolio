// Water ripple effect on the home section (was js/ripple.js)
export function initRipple(): void {
  $(() => {
    $('#home-parallex').ripples({
      resolution: 256,
      dropRadius: 20,
      perturbance: 0.03,
      interactive: true,
    });
  });
}
