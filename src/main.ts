// Entry point for every page (home, about, services, projects).
// Each feature looks for its own markup and does nothing when it is not on the page.
// They run in isolation so one failing does not stop the others.
import './styles/site.css';
import { initTheme } from './scripts/theme';
import { initHeader } from './scripts/header';
import { initMotion } from './scripts/motion';
import { initWorkFilter } from './scripts/work-filter';
import { initContactForm } from './scripts/contact-form';

document.documentElement.classList.add('js');

for (const init of [initTheme, initHeader, initMotion, initWorkFilter, initContactForm]) {
  try {
    init();
  } catch (err) {
    console.error(err);
  }
}
