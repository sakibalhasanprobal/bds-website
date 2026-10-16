/* ==========================================================================
   Md. Sakib Al Hasan Probal — portfolio
   Edit the CONTENT section below to change services, projects and the shelf.
   ========================================================================== */
(() => {
  'use strict';

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ------------------------------------------------------------------------
     CONTENT
     ------------------------------------------------------------------------ */
  const SERVICES = [
    {
      title: 'Website development',
      points: [
        'Build fast websites with Next.js, React & TypeScript',
        'Static-first pages that load instantly and cost almost nothing to host',
        'Bilingual sites — Bangla and English side by side',
        'Clean, maintainable code that the next developer can pick up',
        'Launch-ready: domain, analytics and handover included',
      ],
      desc: 'I build and ship production websites end to end — from the first wireframe to a live URL. My latest build is the official site of the Bogura Debating Society.',
      cta: true,
    },
    {
      title: 'UI design & animation',
      points: ['Responsive layouts', 'Scroll-driven motion', 'Micro-interactions', 'Dark & light themes', 'Accessible components', 'Bangla typography'],
      desc: 'Interfaces that feel considered — purposeful motion, clear hierarchy and layouts that work just as well on a phone as on a wide screen.',
    },
    {
      title: 'Content management',
      points: ['Admin panels with Sveltia CMS', 'Content in JSON & Markdown', 'Git-backed publishing', 'GitHub OAuth login', 'Notices, blogs & events', 'Image uploads'],
      desc: 'Sites the owners can update themselves. Save in the admin panel, it commits to GitHub, the site rebuilds and goes live in a minute or two — no database, no server.',
    },
    {
      title: 'SEO & performance',
      points: ['Per-page titles, descriptions & canonicals', 'Open Graph share images', 'hreflang for multilingual sites', 'Sitemaps & robots.txt', 'Schema.org markup', 'Image compression & cache headers'],
      desc: 'Everything search engines and link previews need, built in from the start — plus the small details that keep pages fast on slow connections.',
    },
    {
      title: 'Backend & integrations',
      points: ['Cloudflare Functions', 'REST APIs', 'Forms & thank-you flows', 'OAuth sign-in', 'Node.js', 'Third-party embeds'],
      desc: 'The pieces behind the page — serverless functions, sign-in, forms that actually reach someone, and integrations with the tools you already use.',
    },
    {
      title: 'Deployment & hosting',
      points: ['Cloudflare Pages', 'GitHub workflows', 'Custom domains & DNS', 'Environment variables & secrets', 'Caching strategy', 'Admin guides & documentation'],
      desc: 'I take a site the last mile — hosting, domains, secrets and a written guide — so the people who own it can run it without me.',
    },
  ];

  const PROJECTS = [
    {
      title: ['Bogura', 'debating', 'Society website'],
      desc: 'The official bilingual (Bangla & English) website of the Bogura Debating Society. A fully static Next.js site whose content lives in JSON and Markdown and is edited through its own admin panel — save, it commits to GitHub, Cloudflare Pages rebuilds, and the change is live in a minute or two. Covers events, notices, a motion bank, the committee and a complete SEO layer.',
      tags: ['Next.js 15', 'React 19', 'Tailwind CSS 4', 'Sveltia CMS', 'Cloudflare Pages'],
      media: { type: 'laptop+phone', src: 'assets/work-bds.jpg', phone: 'assets/work-bds-mobile.jpg', alt: 'Bogura Debating Society website home page' },
      links: [
        { label: 'Live Site', href: 'https://boguradebatingsociety.pages.dev', primary: true },
        { label: 'GitHub', href: 'https://github.com/sakibalhasanprobal/bds-website' },
      ],
    },
    {
      title: ['Personal', 'portfolio', 'This website'],
      desc: 'A dark, motion-heavy personal site built from scratch with plain HTML, CSS and JavaScript — no framework and no build step. An interactive particle portrait, scroll-driven reveals, a pinned showcase shelf and a playable Breakout game, all under a few hundred kilobytes.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Canvas'],
      media: { type: 'laptop', screen: 'dash', label: 'portfolio / v1' },
      links: [
        { label: 'You are here', href: '#home', primary: true },
        { label: 'GitHub', href: 'https://github.com/sakibalhasanprobal' },
      ],
    },
    {
      title: ['Next', 'project', 'Coming soon'],
      desc: 'Add your next project here — a short paragraph about what it is, who it is for, the stack you used and the part you are proudest of. Swap the mockup for a real screenshot in assets/.',
      tags: ['Your stack', 'Here'],
      media: { type: 'phones', screen: 'app' },
      links: [{ label: 'Live Demo', href: '#', primary: true }, { label: 'GitHub', href: 'https://github.com/sakibalhasanprobal' }],
    },
    {
      title: ['Open', 'slot', 'Your idea here'],
      desc: 'This space is waiting for the next build. Need a website for your organisation, business or event? Tell me what you have in mind and it could be the project that fills it.',
      tags: ['Available', 'Freelance'],
      media: { type: 'laptop', screen: 'app', label: 'your project' },
      links: [{ label: 'Start a project', href: '#contact', primary: true }],
    },
  ];

  const SHELF = [
    { name: 'Orbit', sub: 'liquid tab bar', tag: 'Navigation', demo: 'nav', title: 'Navigation' },
    { name: 'Frost', sub: 'glass segmented control', tag: 'Navigation', demo: 'glass' },
    { name: 'Cipher', sub: 'a code field that seals itself', tag: 'Form', demo: 'otp', title: 'OTP Verification' },
    { name: 'Drop', sub: 'animated download button', tag: 'Animation', demo: 'dl', title: 'Download' },
    { name: 'Ember', sub: 'a switch with a glow', tag: 'Input', demo: 'toggle', title: 'Settings' },
    { name: 'Pulse', sub: 'submit button animation', tag: 'Form', demo: 'submit', title: 'Submit' },
  ];

  /* ------------------------------------------------------------------------
     RENDER
     ------------------------------------------------------------------------ */
  const arrowSE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M7 7l10 10M17 9v8H9"/></svg>';
  const arrowNE = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M9 7h8v8"/></svg>';
  const ghIcon = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>';
  const pad = (n) => String(n).padStart(2, '0');

  // services accordion
  const acc = $('#accordion');
  acc.innerHTML = SERVICES.map((s, i) => `
    <div class="acc${i === 0 ? ' is-open' : ''}">
      <button class="acc__head" aria-expanded="${i === 0}" aria-controls="acc-${i}" id="acc-h-${i}">
        <span class="acc__num">${pad(i + 1)}</span>
        <span class="acc__title">${s.title}</span>
        <span class="acc__icon">${arrowSE}</span>
      </button>
      <div class="acc__body" id="acc-${i}" role="region" aria-labelledby="acc-h-${i}">
        <div class="acc__inner"><div class="acc__content">
          <ul class="acc__list">${s.points.map((p) => `<li>${p}</li>`).join('')}</ul>
          <div class="acc__desc"><p>${s.desc}</p>${s.cta ? `<a href="#project" class="sq-btn sq-btn--light">View projects ${arrowNE}</a>` : ''}</div>
        </div></div>
      </div>
    </div>`).join('');
  $$('.acc__head', acc).forEach((btn) => btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const open = !item.classList.contains('is-open');
    $$('.acc', acc).forEach((a) => { a.classList.remove('is-open'); $('.acc__head', a).setAttribute('aria-expanded', 'false'); });
    if (open) { item.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
  }));

  // projects
  const mediaHTML = (m) => {
    const screen = (kind, label) => m.src && kind === 'img'
      ? `<img src="${m.src}" alt="${m.alt || ''}" loading="lazy" />`
      : `<span class="screen screen--${kind}">${label ? `<span class="screen__label">${label}</span>` : ''}</span>`;
    if (m.type === 'phones') {
      return `<div class="stage"><div class="stage__inner">
        <div class="phone phone--solo">${screen(m.screen)}</div><div class="phone phone--solo">${screen('dash')}</div>
      </div></div>`;
    }
    const lap = `<div class="laptop"><div class="laptop__screen">${m.src ? screen('img') : screen(m.screen, m.label)}</div><div class="laptop__base"></div></div>`;
    const phone = m.phone ? `<div class="phone"><img src="${m.phone}" alt="" loading="lazy" /></div>` : '';
    return `<div class="stage"><div class="stage__inner">${lap}${phone}</div></div>`;
  };
  $('#workList').innerHTML = PROJECTS.map((p, i) => `
    <article class="project">
      <div class="project__media" data-reveal>${mediaHTML(p.media)}</div>
      <div class="project__body" data-reveal>
        <div class="project__num mono">${pad(i + 1)}</div>
        <h3 class="project__title grad">${p.title[0]} <em class="serif">${p.title[1]}</em><br>${p.title[2]}</h3>
        <p class="project__desc">${p.desc}</p>
        <div class="project__tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        <div class="project__links">${p.links.map((l) => {
          const ext = /^https?:/.test(l.href);
          return `<a class="pill ${l.primary ? 'pill--light' : 'pill--ghost'}" href="${l.href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${l.label} ${l.label === 'GitHub' ? ghIcon : arrowNE}</a>`;
        }).join('')}</div>
      </div>
    </article>`).join('');

  // shelf
  const demoHTML = {
    nav: '<div class="d-nav__bar"><i class="d-nav__blob"></i><span>⌂</span><span>✦</span><span>♡</span><span>☰</span></div>',
    glass: '<div class="d-glass__bar"><i class="d-glass__thumb"></i><span>Today</span><span>Week</span><span>Tasks</span></div>',
    otp: '<div class="d-otp__boxes"><i>4</i><i>8</i><i>1</i><i>7</i></div><div class="d-otp__ok">✓ Number verified</div>',
    dl: '<div class="d-dl__arrow"></div><div class="d-dl__btn"><span>Download</span></div>',
    toggle: '<div class="d-toggle__sw"></div><small>Dark mode</small>',
    submit: '<div class="d-submit__btn">Submit</div><div class="d-submit__ring"></div>',
  };
  $('#shelfTrack').innerHTML = SHELF.map((s, i) => `
    <div class="item${i === 0 ? ' is-active' : ''}">
      <div class="item__card">
        <div class="item__demo d-${s.demo}" style="display:grid;place-items:center;align-content:center">
          <div class="item__demo-bar"><i></i><i></i><i></i>${s.name} · html · css</div>
          ${s.title ? `<div class="demo-title">${s.title}</div>` : ''}${demoHTML[s.demo]}
        </div>
        <div class="item__info">
          <div class="item__row"><span class="item__name">${s.name}</span><span class="item__tag">${pad(i + 1)}</span></div>
          <p class="item__sub">${s.sub}</p>
          <div class="item__meta"><span>0 deps · <b>${s.tag}</b></span><span>Live ↗</span></div>
        </div>
      </div>
    </div>`).join('');
  $('#shelfDots').innerHTML = SHELF.map((_, i) => `<i${i === 0 ? ' class="on"' : ''}></i>`).join('');
  $('#shelfTotal').textContent = SHELF.length;
  $('#shelfCount').textContent = SHELF.length;

  // marquees
  $$('.marquee').forEach((m, i) => {
    const items = m.dataset.items.split('|');
    const chips = items.map((t) => `<span class="chip">${t}</span>`).join('');
    // repeat until one half is comfortably wider than any screen, then double for a seamless loop
    const reps = Math.max(2, Math.ceil(16 / items.length));
    const half = chips.repeat(reps);
    m.innerHTML = `<div class="marquee__track" style="--dur:${38 + i * 6}s">${half}${half}</div>`;
  });

  // wrap reveal-line contents
  $$('[data-reveal-line] > span').forEach((s) => { s.innerHTML = `<i>${s.innerHTML}</i>`; });

  // about: split into words for the scroll reveal
  const aboutText = $('#aboutText');
  const splitWords = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
          else { const w = document.createElement('span'); w.className = 'w'; w.textContent = part; frag.appendChild(w); }
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) splitWords(n);
    });
  };
  splitWords(aboutText);
  const words = $$('.w', aboutText);

  $('#year').textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------------
     LOADER
     ------------------------------------------------------------------------ */
  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const loader = $('#loader');
  const lines = $$('.loader__line', loader);
  lines.forEach((l) => { l.innerHTML = [...l.dataset.word].map((c) => `<span data-c="${c}">${c}</span>`).join(''); });
  const letters = $$('.loader__line span', loader);

  function runLoader(done) {
    if (REDUCED) { letters.forEach((s) => s.classList.add('in')); return setTimeout(done, 200); }
    const t0 = performance.now();
    const DUR = 1700;
    letters.forEach((s, i) => setTimeout(() => s.classList.add('in'), 60 + i * 55));
    const count = $('#loaderCount');
    (function tick(now) {
      const t = clamp((now - t0) / DUR, 0, 1);
      count.textContent = String(Math.round(t * 100)).padStart(3, '0');
      letters.forEach((s, i) => {
        const settle = 0.35 + (i / letters.length) * 0.55;
        s.textContent = t >= settle ? s.dataset.c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      });
      if (t < 1) requestAnimationFrame(tick); else setTimeout(done, 280);
    })(t0);
  }

  /* ------------------------------------------------------------------------
     HERO — interactive particle portrait
     ------------------------------------------------------------------------ */
  const hero = {
    canvas: $('#heroCanvas'), ctx: null, dpr: 1, W: 0, H: 0,
    parts: [], buckets: [], stars: [], bright: [],
    mouse: { x: -9999, y: -9999, active: false },
    img: null, running: false, visible: true, started: false, glitch: null, nextGlitch: 0,
  };

  function heroInit() {
    const c = hero.canvas;
    hero.ctx = c.getContext('2d');
    if (!hero.ctx || !window.PORTRAIT_SRC) { document.documentElement.classList.add('no-canvas'); return; }
    const img = new Image();
    img.onload = () => { hero.img = img; heroBuild(); heroStart(); };
    img.onerror = () => document.documentElement.classList.add('no-canvas');
    img.src = window.PORTRAIT_SRC;

    const setMouse = (e) => {
      const r = c.getBoundingClientRect();
      hero.mouse.x = e.clientX - r.left; hero.mouse.y = e.clientY - r.top; hero.mouse.active = true;
    };
    c.addEventListener('pointermove', setMouse);
    c.addEventListener('pointerdown', setMouse);
    c.addEventListener('pointerleave', () => { hero.mouse.active = false; hero.mouse.x = hero.mouse.y = -9999; });
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => hero.img && heroBuild(true), 200); });
    new IntersectionObserver(([e]) => { hero.visible = e.isIntersecting; if (hero.visible) heroStart(); }).observe(c);
  }

  function heroBuild(keep) {
    const c = hero.canvas;
    const rect = c.getBoundingClientRect();
    hero.dpr = Math.min(devicePixelRatio || 1, 2);
    hero.W = rect.width; hero.H = rect.height;
    c.width = Math.round(hero.W * hero.dpr); c.height = Math.round(hero.H * hero.dpr);

    // portrait box: square photo, anchored to the bottom, centred
    const mobile = hero.W < 700;
    const boxH = Math.min(hero.H * (mobile ? 0.64 : 0.94), hero.W * (mobile ? 1.3 : 0.9));
    const boxX = (hero.W - boxH) / 2;
    // desktop: anchored to the bottom; mobile: lifted so the title sits below the shoulders
    const boxY = mobile ? Math.max(hero.H * 0.09, hero.H - boxH - hero.H * 0.27) : hero.H - boxH;
    const cell = Math.max(mobile ? 4 : 5, Math.round(boxH / (mobile ? 115 : 150)));
    const cols = Math.floor(boxH / cell), rows = Math.floor(boxH / cell);

    const off = document.createElement('canvas');
    off.width = cols; off.height = rows;
    const octx = off.getContext('2d', { willReadFrequently: true });
    octx.drawImage(hero.img, 0, 0, cols, rows);
    let data;
    try { data = octx.getImageData(0, 0, cols, rows).data; }
    catch (err) { document.documentElement.classList.add('no-canvas'); return; }

    const LEVELS = 28;
    hero.buckets = Array.from({ length: LEVELS }, () => []);
    hero.parts = []; hero.bright = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const L = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        let v = clamp((L - 12.5) / 118, 0, 1);
        v = Math.pow(v, 0.62);
        // soften the square edge of the photo
        const ex = Math.min(x, cols - 1 - x) / (cols * 0.12);
        v *= clamp(ex, 0, 1);
        if (v < 0.075) continue;
        const hx = boxX + x * cell + cell / 2, hy = boxY + y * cell + cell / 2;
        const p = {
          hx, hy,
          x: hx + (Math.random() - 0.5) * hero.W * 0.9,
          y: hy + (Math.random() - 0.2) * hero.H * 0.8,
          vx: 0, vy: 0,
          s: cell * (0.28 + 0.62 * v),
          v,
          d: Math.random() * 0.9, // intro delay
        };
        if (REDUCED || keep) { p.x = hx; p.y = hy; }
        hero.parts.push(p);
        hero.buckets[Math.min(LEVELS - 1, Math.floor(v * LEVELS))].push(p);
        if (v > 0.55) hero.bright.push(p);
      }
    }
    hero.cell = cell;
    hero.bucketColors = hero.buckets.map((_, k) => {
      const g = (k + 0.5) / LEVELS;
      const base = 30 + g * 225;
      return `rgb(${Math.round(base * 0.9)},${Math.round(base * 0.93)},${Math.round(Math.min(255, base * 1.02 + 8))})`;
    });
    // starfield in the upper part
    hero.stars = Array.from({ length: Math.round(hero.W * hero.H / 6000) }, () => ({
      x: Math.random() * hero.W, y: Math.random() * hero.H * 0.75,
      r: Math.random() < 0.85 ? 0.7 : 1.3, p: Math.random() * Math.PI * 2, sp: 0.6 + Math.random() * 1.8,
    }));
    if (keep) hero.started = true;
  }

  function heroStart() {
    if (hero.running || !hero.parts.length || !hero.visible) return;
    hero.running = true;
    requestAnimationFrame(heroFrame);
  }

  const BLUES = ['#e6edff', '#b9c8ff', '#8aa2ff', '#5f7dff', '#c7d3ff', '#3f5bd9'];
  let heroT0 = 0;
  function heroFrame(now) {
    if (!hero.visible) { hero.running = false; return; }
    const { ctx, dpr, W, H } = hero;
    const ready = document.body.classList.contains('is-ready');
    if (ready && !heroT0) heroT0 = now;
    const it = ready ? (now - heroT0) / 1000 : 0; // seconds since intro start

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // stars
    ctx.fillStyle = '#fff';
    for (const s of hero.stars) {
      ctx.globalAlpha = 0.15 + 0.45 * (0.5 + 0.5 * Math.sin(now / 1000 * s.sp + s.p));
      ctx.fillRect(s.x, s.y, s.r, s.r);
    }
    ctx.globalAlpha = 1;

    // occasional horizontal glitch band
    if (!REDUCED && now > hero.nextGlitch) {
      const y = hero.H * (0.25 + Math.random() * 0.6);
      hero.glitch = { y0: y, y1: y + hero.cell * (2 + Math.random() * 6), dx: (Math.random() - 0.5) * 50, until: now + 90 + Math.random() * 120 };
      hero.nextGlitch = now + 1800 + Math.random() * 2800;
    }
    const g = hero.glitch && now < hero.glitch.until ? hero.glitch : null;

    // physics
    const m = hero.mouse, R = Math.max(70, hero.cell * 18), R2 = R * R;
    for (const p of hero.parts) {
      let k = 0.07;
      if (!hero.started) {
        const local = clamp((it - p.d * 0.9) / 1.1, 0, 1);
        k = local <= 0 ? 0 : 0.012 + 0.07 * local;
      }
      let tx = p.hx, ty = p.hy;
      if (m.active) {
        const dx = p.x - m.x, dy = p.y - m.y, d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const d = Math.sqrt(d2) || 1, f = (1 - d / R);
          tx += (dx / d) * f * R * 0.55; ty += (dy / d) * f * R * 0.55;
        }
      }
      p.vx = (p.vx + (tx - p.x) * k) * 0.8;
      p.vy = (p.vy + (ty - p.y) * k) * 0.8;
      p.x += p.vx; p.y += p.vy;
    }
    if (!hero.started && it > 2.4) hero.started = true;

    // draw, batched by brightness
    for (let b = 0; b < hero.buckets.length; b++) {
      const list = hero.buckets[b];
      if (!list.length) continue;
      ctx.fillStyle = hero.bucketColors[b];
      for (const p of list) {
        const off = g && p.hy > g.y0 && p.hy < g.y1 ? g.dx : 0;
        const h = p.s / 2;
        ctx.fillRect(p.x - h + off, p.y - h, p.s, p.s);
      }
    }
    // blue mosaic "tiles" flickering over the light areas
    if (hero.bright.length && it > 0.8) {
      const n = Math.min(hero.bright.length, REDUCED ? 0 : 140);
      for (let i = 0; i < n; i++) {
        const p = hero.bright[(Math.random() * hero.bright.length) | 0];
        ctx.fillStyle = BLUES[(Math.random() * BLUES.length) | 0];
        ctx.globalAlpha = 0.55 + Math.random() * 0.45;
        const s = hero.cell * 0.92;
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(heroFrame);
  }

  /* ------------------------------------------------------------------------
     SCROLL-DRIVEN STUFF
     ------------------------------------------------------------------------ */
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
  $$('[data-reveal], [data-reveal-line]').forEach((el) => io.observe(el));

  const navLinks = $$('.nav a');
  const sections = $$('[data-section]');
  const progress = $('#progressBar');
  const shelf = $('#showcase'), track = $('#shelfTrack'), viewport = $('.shelf__viewport');
  const shelfItems = $$('.item', track), shelfDots = $$('#shelfDots i');
  const stages = () => $$('.stage');
  const desktopShelf = () => innerWidth > 980;
  let lastActive = -1;

  function setShelfIndex(idx) {
    if (idx === lastActive) return;
    lastActive = idx;
    shelfItems.forEach((it, i) => it.classList.toggle('is-active', i === idx));
    shelfDots.forEach((d, i) => d.classList.toggle('on', i === idx));
    $('#shelfIndex').textContent = idx + 1;
  }

  function onScroll() {
    const y = scrollY, vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    progress.style.width = `${(y / Math.max(1, max)) * 100}%`;

    // active nav
    const mid = y + vh * 0.4;
    let current = 'home';
    for (const s of sections) if (s.offsetTop <= mid) current = s.dataset.section;
    navLinks.forEach((a) => a.classList.toggle('is-active', a.dataset.nav === current));

    // about word reveal
    const r = aboutText.getBoundingClientRect();
    const p = clamp((vh * 0.88 - r.top) / (r.height + vh * 0.35), 0, 1);
    const on = REDUCED ? words.length : Math.round(p * words.length);
    for (let i = 0; i < words.length; i++) words[i].classList.toggle('on', i < on);

    // pinned shelf
    if (desktopShelf()) {
      const top = shelf.offsetTop, h = shelf.offsetHeight - vh;
      const sp = clamp((y - top) / h, 0, 1);
      const dist = track.scrollWidth - viewport.clientWidth + 44;
      track.style.transform = `translate3d(${-sp * Math.max(0, dist)}px,0,0)`;
      $('#shelfBar').style.width = `${sp * 100}%`;
      $('#shelfP').textContent = sp.toFixed(2);
      setShelfIndex(Math.round(sp * (shelfItems.length - 1)));
    }

    // gentle parallax on project stages
    if (!REDUCED) for (const st of stages()) {
      const b = st.getBoundingClientRect();
      if (b.bottom < 0 || b.top > vh) continue;
      const c = (b.top + b.height / 2 - vh / 2) / vh;
      st.style.setProperty('--py', `${(-c * 26).toFixed(1)}px`);
    }
  }
  let ticking = false;
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  addEventListener('resize', onScroll);

  // mobile shelf: update index from horizontal swipe
  viewport.addEventListener('scroll', () => {
    if (desktopShelf()) return;
    const w = shelfItems[0].offsetWidth + 18;
    setShelfIndex(clamp(Math.round(viewport.scrollLeft / w), 0, shelfItems.length - 1));
  }, { passive: true });

  // mobile menu
  const burger = $('#burger'), menu = $('#mobileMenu');
  const toggleMenu = (open) => {
    burger.setAttribute('aria-expanded', open); menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', !open); document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggleMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => toggleMenu(false)));

  /* ------------------------------------------------------------------------
     ARCADE — Breakout with HELLO WORLD bricks
     ------------------------------------------------------------------------ */
  const FONT = {
    H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
    E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
    L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
    O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
    W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'],
    R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
    D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  };
  const game = { canvas: $('#arcadeCanvas'), W: 1000, H: 625, state: 'ready', bricks: [], visible: false, raf: 0 };

  function gameBuild() {
    const cell = 26, gap = 6, cols = 29;
    const x0 = (game.W - cols * cell) / 2, y0 = 60;
    game.bricks = [];
    ['HELLO', 'WORLD'].forEach((word, row) => {
      [...word].forEach((ch, li) => {
        FONT[ch].forEach((line, ry) => [...line].forEach((bit, rx) => {
          if (bit === '1') game.bricks.push({ x: x0 + (li * 6 + rx) * cell, y: y0 + (row * 9 + ry) * cell, w: cell - gap, h: cell - gap, alive: true });
        }));
      });
    });
    game.total = game.bricks.length;
    game.paddle = { x: game.W / 2, y: game.H - 36, w: 170, h: 10 };
    resetBall();
  }
  function resetBall() {
    game.ball = { x: game.paddle.x, y: game.paddle.y - 16, r: 8, vx: 0, vy: 0, stuck: true };
  }
  function launch() {
    if (game.state === 'won') gameBuild();
    if (!game.ball.stuck) return;
    const a = (-Math.PI / 2) + (Math.random() - 0.5) * 0.9;
    game.ball.vx = Math.cos(a) * 7.5; game.ball.vy = Math.sin(a) * 7.5; game.ball.stuck = false;
    game.state = 'play'; status();
    loop();
  }
  function status(msg) {
    const left = game.bricks.filter((b) => b.alive).length;
    const text = msg || (game.state === 'play' ? `${game.total - left} / ${game.total} broken` : game.state === 'won' ? 'Broken. It still ships.' : 'Ready');
    $('#arcadeStatus').textContent = text;
    $('#arcadePlay').textContent = game.state === 'play' ? 'Playing' : game.state === 'won' ? 'Again' : 'Play';
  }
  function gameSize() {
    const c = game.canvas, dpr = Math.min(devicePixelRatio || 1, 2);
    const w = c.clientWidth;
    c.width = Math.round(w * dpr); c.height = Math.round(w * (game.H / game.W) * dpr);
    game.scale = c.width / game.W;
    draw();
  }
  function step(dt) {
    const b = game.ball, p = game.paddle;
    if (b.stuck) { b.x = p.x; b.y = p.y - 16; return; }
    const steps = 3;
    for (let s = 0; s < steps; s++) {
      b.x += (b.vx * dt) / steps; b.y += (b.vy * dt) / steps;
      if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx); }
      if (b.x > game.W - b.r) { b.x = game.W - b.r; b.vx = -Math.abs(b.vx); }
      if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy); }
      // paddle
      if (b.vy > 0 && b.y + b.r >= p.y && b.y + b.r <= p.y + p.h + 10 && b.x > p.x - p.w / 2 - b.r && b.x < p.x + p.w / 2 + b.r) {
        const hit = clamp((b.x - p.x) / (p.w / 2), -1, 1);
        const speed = Math.min(11, Math.hypot(b.vx, b.vy) * 1.015);
        const ang = -Math.PI / 2 + hit * 1.05;
        b.vx = Math.cos(ang) * speed; b.vy = Math.sin(ang) * speed; b.y = p.y - b.r;
      }
      // bricks
      for (const k of game.bricks) {
        if (!k.alive) continue;
        if (b.x + b.r > k.x && b.x - b.r < k.x + k.w && b.y + b.r > k.y && b.y - b.r < k.y + k.h) {
          k.alive = false;
          const ox = Math.min(b.x + b.r - k.x, k.x + k.w - (b.x - b.r));
          const oy = Math.min(b.y + b.r - k.y, k.y + k.h - (b.y - b.r));
          if (ox < oy) b.vx = -b.vx; else b.vy = -b.vy;
          status();
          break;
        }
      }
      if (b.y > game.H + 20) { game.state = 'ready'; resetBall(); status('Missed — press Play'); return; }
    }
    if (game.bricks.every((k) => !k.alive)) { game.state = 'won'; resetBall(); status(); }
  }
  function draw() {
    const c = game.canvas, ctx = c.getContext('2d');
    ctx.setTransform(game.scale, 0, 0, game.scale, 0, 0);
    ctx.clearRect(0, 0, game.W, game.H);
    for (const k of game.bricks) {
      if (!k.alive) continue;
      ctx.fillStyle = '#f2f0ea';
      ctx.fillRect(k.x, k.y, k.w, k.h);
      ctx.fillStyle = '#050505';
      ctx.fillRect(k.x + k.w * 0.3, k.y + k.h * 0.3, k.w * 0.4, k.h * 0.4);
    }
    const p = game.paddle, b = game.ball;
    ctx.fillStyle = '#e8e4dc';
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(p.x - p.w / 2, p.y, p.w, p.h, 5) : ctx.rect(p.x - p.w / 2, p.y, p.w, p.h); ctx.fill();
    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
  }
  let lastT = 0;
  function loop() {
    cancelAnimationFrame(game.raf);
    lastT = performance.now();
    const f = (now) => {
      const dt = clamp((now - lastT) / 16.67, 0, 3); lastT = now;
      step(dt); draw();
      if (game.state === 'play' && game.visible) game.raf = requestAnimationFrame(f);
      else if (game.state === 'play') { /* paused offscreen */ }
    };
    game.raf = requestAnimationFrame(f);
  }
  function gameInit() {
    gameBuild(); gameSize(); status();
    const c = game.canvas;
    c.tabIndex = 0;
    const move = (e) => {
      const r = c.getBoundingClientRect();
      game.paddle.x = clamp(((e.clientX - r.left) / r.width) * game.W, game.paddle.w / 2, game.W - game.paddle.w / 2);
      if (game.state !== 'play') draw();
    };
    c.addEventListener('pointermove', move);
    c.addEventListener('pointerdown', (e) => { move(e); launch(); });
    c.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        game.paddle.x = clamp(game.paddle.x + (e.key === 'ArrowLeft' ? -40 : 40), game.paddle.w / 2, game.W - game.paddle.w / 2);
        if (game.state !== 'play') draw(); e.preventDefault();
      }
      if (e.key === ' ' || e.key === 'Enter') { launch(); e.preventDefault(); }
    });
    $('#arcadePlay').addEventListener('click', launch);
    addEventListener('resize', gameSize);
    new IntersectionObserver(([e]) => {
      game.visible = e.isIntersecting;
      if (game.visible && game.state === 'play') loop();
    }).observe(c);
  }

  /* ------------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------------ */
  heroInit();
  gameInit();
  onScroll();
  const start = () => runLoader(() => {
    loader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
    setTimeout(() => loader.classList.add('is-gone'), 1200);
    onScroll();
  });
  if (document.fonts && document.fonts.ready) Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(start);
  else start();
})();
