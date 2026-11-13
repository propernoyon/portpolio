// "Work I have done" filter on the home page.

type TransitionDocument = Document & { startViewTransition?: (update: () => void) => unknown };

export function initWorkFilter(): void {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const items = Array.from(document.querySelectorAll<HTMLElement>('.work-item'));
  if (!buttons.length || !items.length) return;

  // Show how many items sit behind each filter.
  for (const button of buttons) {
    const cat = button.dataset.filter;
    const count = cat === 'all' ? items.length : items.filter((item) => item.dataset.cat === cat).length;
    const badge = document.createElement('small');
    badge.textContent = String(count);
    button.append(badge);
  }

  // Named items let the browser slide the cards into their new places.
  items.forEach((item, i) => {
    item.style.setProperty('view-transition-name', `work-${i}`);
  });

  const apply = (cat: string): void => {
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.filter === cat));
    for (const item of items) item.hidden = cat !== 'all' && item.dataset.cat !== cat;
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const cat = button.dataset.filter ?? 'all';
      const doc = document as TransitionDocument;
      if (doc.startViewTransition && !reduceMotion) doc.startViewTransition(() => apply(cat));
      else apply(cat);
    });
  }
}
