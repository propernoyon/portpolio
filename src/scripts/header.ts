// Sticky header: hairline once the page scrolls, mobile menu, and the
// "you are here" marker in the side index on the services and projects pages.

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');

  if (header) {
    const onScroll = (): void => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (nav && toggle) {
    const setOpen = (open: boolean): void => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  initDocIndex();
}

function initDocIndex(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.doc-index a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const byId = new Map(links.map((link) => [link.hash.slice(1), link]));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) link.classList.remove('is-current');
        byId.get(entry.target.id)?.classList.add('is-current');
      }
    },
    { rootMargin: '-25% 0px -65% 0px' },
  );
  for (const id of byId.keys()) {
    const target = document.getElementById(id);
    if (target) observer.observe(target);
  }
}
