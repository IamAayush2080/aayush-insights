/* ── Shared Navigation & Footer injector ─────────────────────
   Determines if we're in root or a subfolder and sets paths */

(function() {
  const path = window.location.pathname;
  const inSub = path.includes('/tools/') || path.includes('/blog/') || path.includes('/thoughts/');
  const root  = inSub ? '../' : '';

  /* ── Inject navbar ──────────────────────────────────────── */
  const nav = document.getElementById('navbar');
  if (nav) {
    // Update logo href
    const logo = nav.querySelector('.nav-logo');
    if (logo) logo.href = root + 'index.html';

    // Rebuild nav links
    const ul = nav.querySelector('.nav-links');
    if (ul) {
      // Determine active page
      const pg = path.split('/').pop();
      const isTools    = path.includes('/tools/');
      const isBlog     = path.includes('/blog/');
      const isThoughts = path.includes('/thoughts/');
      const isProjects = pg === 'projects.html';
      const isReading  = pg === 'reading-list.html';
      const isContact  = pg === 'contact.html';

      ul.innerHTML = `
        <li><a href="${root}index.html#about">About</a></li>
        <li><a href="${root}tools/index.html"${isTools?' class="active"':''}>Tools</a></li>
        <li><a href="${root}blog/index.html"${isBlog?' class="active"':''}>Writings</a></li>
        <li><a href="${root}thoughts/index.html"${isThoughts?' class="active"':''}>Thoughts</a></li>
        <li><a href="${root}projects.html"${isProjects?' class="active"':''}>Projects</a></li>
        <li><a href="${root}reading-list.html"${isReading?' class="active"':''}>Reading</a></li>
        <li><a href="${root}contact.html"${isContact?' class="active"':''}>Contact</a></li>
      `;
    }
  }

  /* ── Inject mobile nav ──────────────────────────────────── */
  const mob = document.getElementById('mobile-nav');
  if (mob) {
    mob.innerHTML = `
      <a href="${root}index.html#about">About</a>
      <a href="${root}tools/index.html">Tools</a>
      <a href="${root}blog/index.html">Writings</a>
      <a href="${root}thoughts/index.html">Thoughts</a>
      <a href="${root}projects.html">Projects</a>
      <a href="${root}reading-list.html">Reading</a>
      <a href="${root}contact.html">Contact</a>
    `;
  }

  /* ── Update nav CTA href ────────────────────────────────── */
  const cta = document.querySelector('.nav-cta');
  if (cta && !inSub) cta.href = '#main-tabs';

  /* ── Back to top button ─────────────────────────────────── */
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.innerHTML = '↑';
  btn.title = 'Back to top';
  btn.style.cssText = `
    position:fixed; bottom:28px; right:28px; z-index:999;
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
  btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
})();
