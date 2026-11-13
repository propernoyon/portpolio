import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Three pages: the portfolio (index.html), ERP projects (projects.html) and the SMS sender (sms.html).
// Everything in /public (css, fonts, images, jQuery plugins) is copied as-is.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
        sms: resolve(import.meta.dirname, 'sms.html'),
      },
    },
  },
});
