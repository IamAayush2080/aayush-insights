/* ── Aayush Insights — Shared Nav Injector v4 ────────────────
   Dropdown nav: Tools | Writings▾ | Projects▾ | About | Contact | 🔍
   Writings: Articles, Thoughts, Reading List
   Projects: Projects, Changelog
   ─────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {

  const path  = window.location.pathname;
  const inSub = /\/(tools|blog|thoughts)\//.test(path);
  const root  = inSub ? '../' : '';
  const pg    = path.split('/').pop() || 'index.html';

  const isTools    = path.includes('/tools/');
  const isBlog     = path.includes('/blog/');
  const isThoughts = path.includes('/thoughts/');
  const isWritings = isBlog || isThoughts || pg === 'reading-list.html';
  const isProjSec  = pg === 'projects.html' || pg === 'changelog.html';
  const isAbout    = pg === 'about.html';
  const isContact  = pg === 'contact.html';

  /* ── Dropdown CSS ─────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    .nav-links { display:flex; align-items:center; gap:2px; list-style:none; }
    .nav-links > li { position:relative; }
    .nav-links a, .nav-dd-btn {
      font-size:0.83rem; font-weight:400; color:var(--text2);
      padding:6px 12px; border-radius:var(--r-sm);
      transition:var(--transition); letter-spacing:0.02em;
      text-decoration:none; cursor:pointer;
      background:none; border:none; font-family:var(--font-body);
      display:flex; align-items:center; gap:4px;
      white-space:nowrap;
    }
    .nav-links a:hover, .nav-dd-btn:hover { color:var(--text); background:rgba(255,255,255,0.06); }
    .nav-links a.active, .nav-dd-btn.active { color:var(--gold); }
    .nav-dd-chevron { transition:transform 0.2s; width:11px; height:11px; }
    .nav-dd-open .nav-dd-chevron { transform:rotate(180deg); }
    .nav-dd-menu {
      position:absolute; top:calc(100% + 6px); left:50%;
      transform:translateX(-50%) translateY(-4px);
      background:var(--bg2); border:1px solid var(--border2);
      border-radius:var(--r-lg); padding:6px;
      min-width:190px; z-index:9999;
      box-shadow:0 8px 32px rgba(0,0,0,0.4);
      opacity:0; pointer-events:none;
      transition:opacity 0.15s ease, transform 0.15s ease;
    }
    .nav-dd-open .nav-dd-menu {
      opacity:1; pointer-events:all;
      transform:translateX(-50%) translateY(0);
    }
    .nav-dd-menu a {
      padding:8px 12px; border-radius:var(--r-sm);
      color:var(--text2); display:flex; align-items:center; gap:9px;
      font-size:0.83rem; text-decoration:none;
    }
    .nav-dd-menu a:hover { color:var(--text); background:rgba(255,255,255,0.06); }
    .nav-dd-menu a.active { color:var(--gold); background:var(--gold-dim); }
    .nav-dd-divider { height:1px; background:var(--border); margin:4px 6px; }
    .nav-dd-label {
      font-size:0.63rem; color:var(--text3); font-family:var(--font-mono);
      letter-spacing:0.15em; text-transform:uppercase; padding:6px 12px 2px;
    }
    #nav-search-icon {
      color:var(--text2); display:flex; align-items:center;
      padding:6px 8px; border-radius:var(--r-sm);
      transition:var(--transition); text-decoration:none;
    }
    #nav-search-icon:hover { color:var(--gold); background:rgba(255,255,255,0.06); }
    /* Mobile nav labels */
    .mob-section-label {
      font-size:0.63rem; color:var(--text3); font-family:var(--font-mono);
      letter-spacing:0.15em; text-transform:uppercase;
      padding:10px 12px 4px; display:block;
    }
    #mobile-nav a { padding:9px 20px; display:block; font-size:0.92rem; color:var(--text2); text-decoration:none; transition:var(--transition); }
    #mobile-nav a:hover { color:var(--text); background:rgba(255,255,255,0.04); }
    #mobile-nav a.sub { padding-left:32px; font-size:0.85rem; }
  `;
  document.head.appendChild(style);

  /* ── Chevron SVG ──────────────────────────────────────── */
  const chev = `<svg class="nav-dd-chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>`;

  /* ── Build nav-links ──────────────────────────────────── */
  const ul = document.querySelector('#navbar .nav-links');
  if (ul) {
    ul.innerHTML = `
      <li>
        <a href="${root}index.html">Home</a>
      </li>
      <li>
        <a href="${root}tools/index.html" ${isTools?'class="active"':''}>Tools</a>
      </li>
      <li id="dd-writings">
        <button class="nav-dd-btn ${isWritings?'active':''}" id="dd-writings-btn">
          Writings ${chev}
        </button>
        <div class="nav-dd-menu">
          <div class="nav-dd-label">Read</div>
          <a href="${root}blog/index.html" ${isBlog?'class="active"':''}>📖Personal Research  &amp; Articles </a>
          <a href="${root}thoughts/index.html" ${isThoughts?'class="active"':''}>💭 Thoughts &amp; Opinions</a>
          <div class="nav-dd-divider"></div>
          <div class="nav-dd-label">Resources</div>
          <a href="${root}reading-list.html" ${pg==='reading-list.html'?'class="active"':''}>📚 Reading List</a>
        </div>
      </li>
      <li id="dd-projects">
        <button class="nav-dd-btn ${isProjSec?'active':''}" id="dd-projects-btn">
          Projects ${chev}
        </button>
        <div class="nav-dd-menu">
          <a href="${root}projects.html" ${pg==='projects.html'?'class="active"':''}>🚀 All Projects</a>
          <a href="${root}changelog.html" ${pg==='changelog.html'?'class="active"':''}>📋 Changelog</a>
        </div>
      </li>
      <li>
        <a href="${root}about.html" ${isAbout?'class="active"':''}>About</a>
      </li>
      <li>
        <a href="${root}contact.html" ${isContact?'class="active"':''}>Contact</a>
      </li>
    `;

    // Add search icon
    const searchLi = document.createElement('li');
    searchLi.innerHTML = `<a href="${root}search.html" id="nav-search-icon" title="Search">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" width="17" height="17"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
    </a>`;
    ul.appendChild(searchLi);

    // Dropdown logic
    ['dd-writings','dd-projects'].forEach(id => {
      const li  = document.getElementById(id);
      const btn = document.getElementById(id+'-btn');
      if (!li || !btn) return;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = li.classList.contains('nav-dd-open');
        document.querySelectorAll('.nav-dd-open').forEach(el => el.classList.remove('nav-dd-open'));
        if (!isOpen) li.classList.add('nav-dd-open');
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.nav-dd-open').forEach(el => el.classList.remove('nav-dd-open'));
    });
  }

  /* ── Update logo href ─────────────────────────────────── */
  const logo = document.querySelector('#navbar .nav-logo');
  if (logo) logo.href = root + 'index.html';

  /* ── Update nav-cta ───────────────────────────────────── */
  const cta = document.querySelector('.nav-cta');
  if (cta) {
    if (pg === 'index.html' || pg === '') {
      cta.href = '#main-tabs';
      cta.textContent = 'Explore →';
    } else if (isTools) {
      cta.href = 'index.html';
      cta.textContent = '← All Tools';
    } else {
      cta.href = root + 'index.html';
      cta.textContent = '← Home';
    }
  }

  /* ── Mobile nav ───────────────────────────────────────── */
  const mob = document.getElementById('mobile-nav');
  if (mob) {
    mob.innerHTML = `
      <a href="${root}index.html">🏠 Home</a>
      <a href="${root}tools/index.html">⚙️ Tools</a>
      <a href="${root}about.html">👤 About</a>
      <span class="mob-section-label">Writings</span>
      <a href="${root}blog/index.html" class="sub">📖 Articles</a>
      <a href="${root}thoughts/index.html" class="sub">💭 Thoughts</a>
      <a href="${root}reading-list.html" class="sub">📚 Reading List</a>
      <span class="mob-section-label">Projects</span>
      <a href="${root}projects.html" class="sub">🚀 Projects</a>
      <a href="${root}changelog.html" class="sub">📋 Changelog</a>
      <a href="${root}contact.html">✉️ Contact</a>
      <a href="${root}search.html">🔍 Search</a>
    `;
  }

  /* ── Service Worker ───────────────────────────────────── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(root + 'sw.js').catch(() => {});
    });
  }

  /* ── Back to top ──────────────────────────────────────── */
  const topBtn = document.createElement('button');
  topBtn.innerHTML = '↑';
  topBtn.title = 'Back to top';
  topBtn.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:997;width:40px;height:40px;border-radius:50%;background:var(--gold);color:var(--bg);border:none;cursor:pointer;font-size:1rem;font-weight:700;opacity:0;transform:translateY(8px);transition:opacity 0.3s,transform 0.3s;box-shadow:0 4px 16px rgba(201,168,76,0.35);';
  document.body.appendChild(topBtn);
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 300;
    topBtn.style.opacity = show ? '1' : '0';
    topBtn.style.transform = show ? 'translateY(0)' : 'translateY(8px)';
  }, {passive:true});
  topBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

});
