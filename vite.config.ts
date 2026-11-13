import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { siteChrome } from './site-chrome.ts';

// Pages: portfolio (index.html), about.html, services.html, projects.html and the SMS sender (sms.html).
// The shared header, footer and career chart come from site-chrome.ts.
// Styles and scripts live in /src and are bundled with hashed file names.
// Everything in /public (images, robots.txt, sitemap.xml, 404.html) is copied as-is.
export default defineConfig({
  plugins: [siteChrome()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        services: resolve(import.meta.dirname, 'services.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
        sms: resolve(import.meta.dirname, 'sms.html'),
      },
    },
  },
});
