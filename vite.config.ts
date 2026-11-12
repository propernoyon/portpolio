import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Two pages: the portfolio (index.html) and the SMS sender (sms.html).
// Everything in /public (css, fonts, images, jQuery plugins) is copied as-is.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        sms: resolve(import.meta.dirname, 'sms.html'),
      },
    },
  },
});
