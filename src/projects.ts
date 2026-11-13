// Entry point for /projects: theme toggle + mobile menu only (no home-page plugins needed).
import { initTheme } from './scripts/theme';

try {
  initTheme();
} catch (err) {
  console.error(err);
}

// Close the mobile menu after a link is tapped (same behaviour as the home page).
$('.navbar-collapse').on('click', () => {
  $('.navbar-collapse').collapse('hide');
});
