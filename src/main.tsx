// Legacy Cloud uses the static template served at /site/.
// Redirect the SPA entry to it.
const path = window.location.pathname;
if (!path.startsWith("/site/")) {
  window.location.replace("/site/index.html" + window.location.search + window.location.hash);
}
