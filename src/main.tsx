// Legacy Cloud now uses the PlayHost static template served from /site/.
// Redirect the SPA root to the template entry so all links inside the
// template work naturally.
const path = window.location.pathname;
if (!path.startsWith("/site/")) {
  window.location.replace("/site/index.html" + window.location.search + window.location.hash);
}
