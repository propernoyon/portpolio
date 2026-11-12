// Entry point for the portfolio page. Runs in the same order the old
// <script> tags did: wow-anim, contact form, main.js, ripple.js.
// Each runs in isolation, like separate <script> tags, so one failing
// doesn't stop the others.
import { initTheme } from './scripts/theme';
import { initWow } from './scripts/wow-anim';
import { initContactForm } from './scripts/contact-form';
import { initSite } from './scripts/site';
import { initRipple } from './scripts/ripple';

for (const init of [initTheme, initWow, initContactForm, initSite, initRipple]) {
  try {
    init();
  } catch (err) {
    console.error(err);
  }
}
