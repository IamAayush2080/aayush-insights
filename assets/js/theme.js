/* ── Dark / Light mode toggle ──────────────────────────────── */
(function() {
  const saved = localStorage.getItem('aayush-theme');
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const current = document.documentElement.getAttribute('data-theme');
  btn.textContent = current === 'light' ? '🌙' : '☀️';
  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    document.documentElement.setAttribute('data-theme', isLight ? '' : 'light');
    localStorage.setItem('aayush-theme', isLight ? 'dark' : 'light');
    btn.textContent = isLight ? '☀️' : '🌙';
  });
}

document.addEventListener('DOMContentLoaded', initThemeToggle);
