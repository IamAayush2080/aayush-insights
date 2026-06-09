/* ── Shared Navigation & Footer injector ─────────────────────
   Clean nav: Tools | Writings ▾ | Projects ▾ | About | Contact | 🔍
   Writings dropdown: Blog, Thoughts, Reading List
   Projects dropdown: Projects, Changelog
   ─────────────────────────────────────────────────────────── */

(function() {
  const path  = window.location.pathname;
  const inSub = path.includes('/tools/') || path.includes('/blog/') || path.includes('/thoughts/');
  const root  = inSub ? '../' : '';
  const pg    = path.split('/').pop() || 'index.html';

  const isTools     = path.includes('/tools/');
  const isBlog      = path.includes('/blog/');
  const isThoughts  = path.includes('/thoughts/');
  const isProjects  = pg === 'projects.html';
  const isChangelog = pg === 'changelog.html';
  const isReading   = pg === 'reading-list.html';
  const isAbout     = pg === 'about.html';
  const isContact   = pg === 'contact.html';
  const isSearch    = pg === 'search.html';

  const isWritings  = isBlog || isThoughts || isReading;
  const isProjectsSection = isProjects || isChangelog;

  /* ── Inject CSS for dropdown ────────────────────────────── */
  if (!document.getElementById('nav-dropdown-style')) {
    const style = document.createElement('style');
    style.id = 'nav-dropdown-style';
    style.textContent = `
      .nav-dropdown { position:relative; }
      .nav-dropdown-toggle {
        font-size:0.85rem; font-weight:400;
        color:var(--text2); padding:6px 14px;
        border-radius:var(--r-sm); transition:var(--transition);
        letter-spacing:0.03em; cursor:pointer;
        background:none; border:none; font-family:var(--font-body);
        display:flex; align-items:center; gap:5px;
      }
      .nav-dropdown-toggle:hover { color:var(--text); background:var(--border); }
      .nav-dropdown-toggle.active { color:var(--gold); }
      .nav-dropdown-toggle svg { transition:transform 0.2s; }
      .nav-dropdown.open .nav-dropdown-toggle svg { transform:rotate(180deg); }
      .nav-dropdown-menu {
        position:absolute; top:calc(100% + 8px); left:50%;
        transform:translateX(-50%);
        background:var(--bg2); border:1px solid var(--border2);
        border-radius:var(--r-lg); padding:8px;
        min-width:180px; z-index:9999;
        box-shadow:0 8px 32px rgba(0,0,0,0.3);
        display:none; flex-direction:column; gap:2px;
        backdrop-filter:blur(16px);
      }
      .nav-dropdown.open .nav-dropdown-menu { display:flex; }
      .nav-dropdown-menu a {
        font-size:0.85rem; color:var(--text2);
        padding:8px 14px; border-radius:var(--r-sm);
        text-decoration:none; transition:var(--transition);
        display:flex; align-items:center; gap:10px;
      }
      .nav-dropdown-menu a:hover { color:var(--text); background:var(--border); }
      .nav-dropdown-menu a.active { color:var(--gold); background:var(--gold-dim); }
      .nav-dropdown-menu .menu-divider {
        height:1px; background:var(--border); margin:4px 8px;
      }
      .nav-dropdown-menu .menu-label {
        font-size:0.65rem; color:var(--text3); font-family:var(--font-mono);
        letter-spacing:0.15em; text-transform:uppercase;
        padding:4px 14px 2px;
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Build navbar ───────────────────────────────────────── */
  const nav = document.getElementById('navbar');
  if (nav) {
    const logo = nav.querySelector('.nav-logo');
    if (logo) logo.href = root + 'index.html';

    const ul = nav.querySelector('.nav-links');
    if (ul) {
      const chevron = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="12" height="12"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>`;

      ul.innerHTML = `
        <li><a href="${root}index.html" style="font-size:0.85rem;font-weight:400;color:var(--text2);padding:6px 14px;border-radius:var(--r-sm);transition:var(--transition);letter-spacing:0.03em;text-decoration:none;" onmouseover="this.style.background='var(--border)';this.style.color='var(--text)'" onmouseout="this.style.background='';this.style.color='var(--text2)'">Home</a></li>
        <li><a href="${root}tools/index.html" style="font-size:0.85rem;font-weight:400;color:${isTools?'var(--gold)':'var(--text2)'};padding:6px 14px;border-radius:var(--r-sm);transition:var(--transition);letter-spacing:0.03em;text-decoration:none;" onmouseover="this.style.background='var(--border)'" onmouseout="this.style.background=''">Tools</a></li>

        <li class="nav-dropdown" id="dd-writings">
          <button class="nav-dropdown-toggle${isWritings?' active':''}">
            Writings ${chevron}
          </button>
          <div class="nav-dropdown-menu">
            <div class="menu-label">Explore</div>
            <a href="${root}blog/index.html" class="${isBlog?'active':''}">📖 Articles & Research</a>
            <a href="${root}thoughts/index.html" class="${isThoughts?'active':''}">💭 Thoughts & Opinions</a>
            <div class="menu-divider"></div>
            <div class="menu-label">Resources</div>
            <a href="${root}reading-list.html" class="${isReading?'active':''}">📚 Reading List</a>
          </div>
        </li>

        <li class="nav-dropdown" id="dd-projects">
          <button class="nav-dropdown-toggle${isProjectsSection?' active':''}">
            Projects ${chevron}
          </button>
          <div class="nav-dropdown-menu">
            <a href="${root}projects.html" class="${isProjects?'active':''}">🚀 All Projects</a>
            <a href="${root}changelog.html" class="${isChangelog?'active':''}">📋 Changelog</a>
          </div>
        </li>

        <li><a href="${root}about.html" style="font-size:0.85rem;font-weight:400;color:${isAbout?'var(--gold)':'var(--text2)'};padding:6px 14px;border-radius:var(--r-sm);transition:var(--transition);letter-spacing:0.03em;text-decoration:none;" onmouseover="this.style.background='var(--border)'" onmouseout="this.style.background=''">About</a></li>
        <li><a href="${root}contact.html" style="font-size:0.85rem;font-weight:400;color:${isContact?'var(--gold)':'var(--text2)'};padding:6px 14px;border-radius:var(--r-sm);transition:var(--transition);letter-spacing:0.03em;text-decoration:none;" onmouseover="this.style.background='var(--border)'" onmouseout="this.style.background=''">Contact</a></li>
      `;

      // Dropdown toggle logic
      ['dd-writings','dd-projects'].forEach(id => {
        const dd  = ul.querySelector('#'+id);
        const btn = dd?.querySelector('.nav-dropdown-toggle');
        btn?.addEventListener('click', e => {
          e.stopPropagation();
          const isOpen = dd.classList.contains('open');
          document.querySelectorAll('.nav-dropdown').forEach(d=>d.classList.remove('open'));
          if (!isOpen) dd.classList.add('open');
        });
      });

      document.addEventListener('click', () => {
        document.querySelectorAll('.nav-dropdown').forEach(d=>d.classList.remove('open'));
      });
    }

    // Search button in nav
    const existingSearch = nav.querySelector('#nav-search-btn');
    if (!existingSearch) {
      const searchBtn = document.createElement('a');
      searchBtn.href = root + 'search.html';
      searchBtn.id   = 'nav-search-btn';
      searchBtn.title = 'Search';
      searchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>`;
      searchBtn.style.cssText = `color:var(--text2);display:flex;align-items:center;padding:6px;border-radius:var(--r-sm);transition:var(--transition);margin-right:4px;`;
      searchBtn.onmouseover = () => searchBtn.style.color='var(--gold)';
      searchBtn.onmouseout  = () => searchBtn.style.color='var(--text2)';
      const cta = nav.querySelector('.nav-cta');
      if (cta) nav.insertBefore(searchBtn, cta);
    }
  }

  /* ── Mobile nav ─────────────────────────────────────────── */
  const mob = document.getElementById('mobile-nav');
  if (mob) {
    mob.innerHTML = `
      <a href="${root}index.html">Home</a>
      <a href="${root}tools/index.html">⚙️ Tools</a>
      <a href="${root}about.html">👤 About</a>
      <div style="font-size:0.65rem;color:var(--text3);font-family:var(--font-mono);letter-spacing:0.15em;padding:8px 12px 2px;text-transform:uppercase;">Writings</div>
      <a href="${root}blog/index.html" style="padding-left:24px;">📖 Articles</a>
      <a href="${root}thoughts/index.html" style="padding-left:24px;">💭 Thoughts</a>
      <a href="${root}reading-list.html" style="padding-left:24px;">📚 Reading List</a>
      <div style="font-size:0.65rem;color:var(--text3);font-family:var(--font-mono);letter-spacing:0.15em;padding:8px 12px 2px;text-transform:uppercase;">Projects</div>
      <a href="${root}projects.html" style="padding-left:24px;">🚀 Projects</a>
      <a href="${root}changelog.html" style="padding-left:24px;">📋 Changelog</a>
      <a href="${root}contact.html">✉️ Contact</a>
      <a href="${root}search.html">🔍 Search</a>
    `;
  }

  /* ── Update nav CTA ─────────────────────────────────────── */
  const cta = document.querySelector('.nav-cta');
  if (cta && !inSub && pg === 'index.html') cta.href = '#main-tabs';

  /* ── Register Service Worker ────────────────────────────── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(root + 'sw.js').catch(()=>{});
    });
  }

  /* ── Back to top button ─────────────────────────────────── */
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.innerHTML = '↑';
  btn.title = 'Back to top';
  btn.style.cssText = `
    position:fixed; bottom:28px; right:28px; z-index:998;
    width:44px; height:44px; border-radius:50%;
    background:var(--gold); color:var(--bg);
    border:none; cursor:pointer; font-size:1.1rem; font-weight:700;
    opacity:0; transform:translateY(10px);
    transition:opacity 0.3s, transform 0.3s;
    box-shadow:0 4px 16px rgba(201,168,76,0.3);
    display:flex; align-items:center; justify-content:center;
  `;
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 300;
    btn.style.opacity = show ? '1' : '0';
    btn.style.transform = show ? 'translateY(0)' : 'translateY(10px)';
  });
  btn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

})();
