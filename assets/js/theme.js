/* ── Theme System — applies instantly before render ────────── */

// Apply saved theme IMMEDIATELY (before DOMContentLoaded)
// This prevents flash of wrong theme on mobile
(function() {
  const saved = localStorage.getItem('aayush-theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

// Init toggle button after DOM ready
document.addEventListener('DOMContentLoaded', function() {
  function initToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    btn.textContent = isLight ? '🌙' : '☀️';
    btn.addEventListener('click', function() {
      const nowLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (nowLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('aayush-theme', 'dark');
        btn.textContent = '☀️';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('aayush-theme', 'light');
        btn.textContent = '🌙';
      }
    });
  }
  initToggle();
  // Also try again after nav.js injects the button
  setTimeout(initToggle, 200);
});
