// Scroll-triggered motion: sections ease in, the career bars draw, the numbers count up.
// All of it is skipped when the visitor prefers reduced motion (the CSS shows the final state).

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el: HTMLElement): void {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || reduceMotion) return;
  const duration = 1400;
  const start = performance.now();
  const tick = (now: number): void => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = String(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  el.textContent = '0';
  requestAnimationFrame(tick);
}

export function initMotion(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-gantt], [data-count]');

  if (!('IntersectionObserver' in window)) {
    for (const el of targets) el.classList.add('is-in');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-in');
        if (el.dataset.count) countUp(el);
        observer.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  for (const el of targets) observer.observe(el);
}
