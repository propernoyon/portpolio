// Shared page chrome for the static pages.
// index.html, about.html, services.html and projects.html contain small
// placeholders that this Vite plugin swaps for the shared markup at build time:
//
//   <!--@header home-->   site header, with the named page marked as current
//   <!--@footer-->        site footer
//   <!--@career-->        the career timeline chart
//
// Edit the menu, footer or career history here once and every page follows.
import type { Connect, Plugin } from 'vite';

type PageKey = 'home' | 'about' | 'services' | 'projects';

const NAV: { key: PageKey | 'contact'; href: string; label: string }[] = [
  { key: 'home', href: '/', label: 'Home' },
  { key: 'about', href: '/about', label: 'About' },
  { key: 'services', href: '/services', label: 'Services' },
  { key: 'projects', href: '/projects', label: 'Projects' },
  { key: 'contact', href: '/#contact', label: 'Contact' },
];

const SOCIAL = [
  { href: 'https://www.linkedin.com/in/tisnoyon/', label: 'LinkedIn' },
  { href: 'https://github.com/propernoyon', label: 'GitHub' },
  { href: 'https://x.com/NoyonToriqul', label: 'X' },
  { href: 'https://www.facebook.com/tisnoyon/', label: 'Facebook' },
  { href: 'https://www.instagram.com/n0_y_0n', label: 'Instagram' },
  { href: 'https://www.pinterest.com/tinoyon/', label: 'Pinterest' },
];

/** Career history, drawn as a schedule chart. Years are inclusive. */
const FIRST_YEAR = 2015;
const LAST_YEAR = 2026;
const CAREER: { name: string; what: string; from: number; to: number; kind: 'edu' | 'work' | 'latest'; href?: string }[] = [
  { name: 'Feni Government Computer Institute', what: 'Education', from: 2015, to: 2019, kind: 'edu' },
  { name: 'Techno PC', what: 'ERP for plastic bottle manufacturing', from: 2021, to: 2022, kind: 'work', href: '/projects#techno-pc' },
  { name: 'Primitek Group', what: 'ERP for non-woven bag manufacturing', from: 2022, to: 2024, kind: 'work', href: '/projects#primitek-group' },
  { name: 'MEP Group', what: 'Selected ERP modules', from: 2023, to: 2024, kind: 'work', href: '/projects#mep-group' },
  { name: 'Starline Group', what: 'Manufacturing ERP, eight modules', from: 2024, to: 2026, kind: 'latest', href: '/projects#starline-group' },
];

function header(current: string): string {
  const links = NAV.map(({ key, href, label }) => {
    const here = key === current ? ' aria-current="page"' : '';
    return `<li><a href="${href}"${here}>${label}</a></li>`;
  }).join('\n          ');

  return `<a class="skip-link" href="#main">Skip to main content</a>
  <header class="site-header" data-header>
    <div class="wrap header-inner">
      <a class="brand" href="/" aria-label="Md Noyon – home">
        <span class="brand-mark">MATC</span>
        <span class="brand-name">Md Noyon</span>
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Primary" data-nav>
        <ul>
          ${links}
        </ul>
      </nav>
      <div class="header-tools">
        <button type="button" class="icon-btn theme-toggle" id="themeToggle" aria-label="Switch to dark theme" title="Switch to dark theme" aria-pressed="false">
          <svg class="icon-moon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
          <svg class="icon-sun" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
        <button type="button" class="icon-btn menu-toggle" aria-controls="site-nav" aria-expanded="false" data-menu-toggle>
          <span class="visually-hidden">Menu</span>
          <span class="menu-bars" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>
      </div>
    </div>
  </header>`;
}

function footer(): string {
  const nav = NAV.map(({ href, label }) => `<li><a href="${href}">${label}</a></li>`).join('\n            ');
  const social = SOCIAL.map(
    ({ href, label }) => `<li><a href="${href}" target="_blank" rel="me noopener">${label}</a></li>`,
  ).join('\n            ');

  return `<footer class="site-footer">
    <div class="wrap footer-inner">
      <div class="footer-brand">
        <p class="brand"><span class="brand-mark">MATC</span><span class="brand-name">Md Noyon</span></p>
        <p>Software engineer building ERP systems and custom web applications. Feni, Bangladesh and Lisbon, Portugal.</p>
      </div>
      <nav aria-label="Footer">
        <h2>Site</h2>
        <ul class="footer-links">
            ${nav}
        </ul>
      </nav>
      <nav aria-label="Profiles">
        <h2>Profiles</h2>
        <ul class="footer-links">
            ${social}
        </ul>
      </nav>
    </div>
    <div class="wrap footer-base">
      <p>© 2026 Md Noyon (Toriqul Islam Noyon)</p>
    </div>
  </footer>`;
}

function career(): string {
  const years: string[] = [];
  for (let y = FIRST_YEAR; y <= LAST_YEAR; y++) {
    years.push(`<li><span class="yy">${String(y).slice(0, 2)}</span>${String(y).slice(2)}</li>`);
  }
  const rows = CAREER.map((item, i) => {
    const s = item.from - FIRST_YEAR + 1;
    const e = item.to - FIRST_YEAR + 1;
    const name = item.href ? `<a href="${item.href}">${item.name}</a>` : item.name;
    return `<li class="gantt-row is-${item.kind}" style="--s:${s};--e:${e};--i:${i}">
          <div class="gantt-label">
            <strong>${name}</strong>
            <span class="gantt-what">${item.what}</span>
            <span class="gantt-years">${item.from}–${item.to}</span>
          </div>
          <div class="gantt-track" aria-hidden="true"><span class="gantt-bar"></span></div>
        </li>`;
  }).join('\n        ');

  return `<div class="gantt" data-gantt style="--cols:${LAST_YEAR - FIRST_YEAR + 1}">
      <ol class="gantt-axis" aria-hidden="true">
        ${years.join('')}
      </ol>
      <ul class="gantt-rows">
        ${rows}
      </ul>
      <ul class="gantt-legend" aria-hidden="true">
        <li class="is-edu"><span></span>Education</li>
        <li class="is-work"><span></span>Client ERP project</li>
        <li class="is-latest"><span></span>Most recent project</li>
      </ul>
    </div>`;
}

/** Lets /about, /services, /projects and /sms work in `vite dev` and `vite preview` like they do on Vercel. */
const cleanUrls: Connect.NextHandleFunction = (req, _res, next) => {
  const [path, query] = (req.url ?? '').split('?');
  if (path && ['/about', '/services', '/projects', '/sms'].includes(path)) {
    req.url = `${path}.html${query ? `?${query}` : ''}`;
  }
  next();
};

export function siteChrome(): Plugin {
  return {
    name: 'site-chrome',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replace(/<!--@header (\w+)-->/g, (_m, page: string) => header(page))
          .replace(/<!--@footer-->/g, footer())
          .replace(/<!--@career-->/g, career());
      },
    },
    configureServer(server) {
      server.middlewares.use(cleanUrls);
    },
    configurePreviewServer(server) {
      server.middlewares.use(cleanUrls);
    },
  };
}
