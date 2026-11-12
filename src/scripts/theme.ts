// Light / dark theme switcher.
// The initial theme is applied by a tiny inline script in <head> (so the page
// never flashes the wrong colours); this module wires up the toggle button,
// remembers the visitor's choice, and follows the device setting until they choose.

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const META_COLORS: Record<Theme, string> = { light: '#ffffff', dark: '#0c1416' };

const root = document.documentElement;
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable (private mode etc.) — theme still applies for this visit */
  }
}

export function currentTheme(): Theme {
  return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function updateButton(button: HTMLButtonElement, theme: Theme): void {
  const next = theme === 'dark' ? 'light' : 'dark';
  button.setAttribute('aria-label', `Switch to ${next} theme`);
  button.setAttribute('title', `Switch to ${next} theme`);
  button.setAttribute('aria-pressed', String(theme === 'dark'));
}

function applyTheme(theme: Theme, animate: boolean): void {
  if (animate) {
    root.classList.add('theme-switching');
    window.setTimeout(() => root.classList.remove('theme-switching'), 400);
  }
  root.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLORS[theme]);
  const button = document.getElementById('themeToggle') as HTMLButtonElement | null;
  if (button) updateButton(button, theme);
}

export function initTheme(): void {
  applyTheme(savedTheme() ?? (systemDark.matches ? 'dark' : 'light'), false);

  const button = document.getElementById('themeToggle') as HTMLButtonElement | null;
  button?.addEventListener('click', () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
    saveTheme(next);
  });

  // Follow the device's light/dark setting until the visitor picks one.
  systemDark.addEventListener('change', (event) => {
    if (!savedTheme()) applyTheme(event.matches ? 'dark' : 'light', true);
  });
}
