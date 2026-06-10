/* ── Aayush Insights Service Worker ───────────────────────────
   Caches core assets for offline use
   Cache version: bump this when you deploy updates         */

const CACHE_NAME = 'aayush-insights-v3';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/css/theme.css',
  '/assets/js/main.js',
  '/assets/js/theme.js',
  '/assets/js/nav.js',
  '/tools/index.html',
  '/blog/index.html',
  '/thoughts/index.html',
  '/contact.html',
  '/projects.html',
  '/reading-list.html',
  '/search.html',
  '/404.html',
];

/* ── Install: cache core assets ───────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: remove old caches ──────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: cache-first for assets, network-first for pages ─ */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external APIs (currency, IP lookup etc)
  if (!url.hostname.includes('is-a.dev') && !url.hostname.includes('github.io') && !url.hostname.includes('localhost')) {
    return;
  }

  // CSS / JS / images — cache first
  if (
    event.request.url.includes('/assets/') ||
    event.request.url.endsWith('.css') ||
    event.request.url.endsWith('.js') ||
    event.request.url.endsWith('.jpg') ||
    event.request.url.endsWith('.png') ||
    event.request.url.endsWith('.svg')
  ) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // HTML pages — network first, fall back to cache, then 404
  event.respondWith(
    fetch(event.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return res;
      })
      .catch(() =>
        caches.match(event.request)
          .then(cached => cached || caches.match('/404.html'))
      )
  );
});
