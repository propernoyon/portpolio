import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Pages: portfolio (index.html), about.html, services.html, projects.html and the SMS sender (sms.html).
// Everything in /public (css, fonts, images, jQuery plugins) is copied as-is.
export default defineConfig({
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
