/* =========================================================
   AVA SINCLAIR PORTFOLIO — MAIN JS
   ========================================================= */

// ---- THEME TOGGLE ----
(function initTheme() {
  // Apply saved theme immediately (before render) to avoid flash
  const saved = localStorage.getItem('as-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved === 'dark' ? 'dark' : '');

  function buildToggle() {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle day/night mode');
    btn.innerHTML = `
      <span class="theme-toggle-thumb"></span>
      <span class="theme-toggle-icon-day">☀</span>
      <span class="theme-toggle-icon-night">☽</span>
    `;
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = isDark ? '' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('as-theme', next === 'dark' ? 'dark' : 'light');
    });
    return btn;
  }

  // Insert into every nav's cta area
  document.querySelectorAll('.nav-cta').forEach(cta => {
    cta.insertBefore(buildToggle(), cta.firstChild);
  });
})();

// ---- CURSOR ----
(function initCursor() {
  const cursor = document.createElement('div');
  const ring = document.createElement('div');
  cursor.className = 'cursor';
  ring.className = 'cursor-ring';
  document.body.append(cursor, ring);

  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .photo-item, .work-card, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
      ring.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.opacity = '0.5';
    });
  });
})();

// ---- NAV SCROLL ----
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ---- HAMBURGER ----
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ---- SCROLL REVEAL ----
(function initScrollReveal() {
  const els = document.querySelectorAll('.scroll-reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => io.observe(el));
})();

// ---- PHOTO FILTER ----
(function initPhotoFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const photoItems = document.querySelectorAll('.photo-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      photoItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.opacity = show ? '1' : '0.2';
        item.style.pointerEvents = show ? '' : 'none';
      });
    });
  });
})();

// ---- LIGHTBOX ----
(function initLightbox() {
  const items = document.querySelectorAll('.photo-item[data-lightbox]');
  if (!items.length) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox-close">Close ✕</button>
    <div class="lightbox-content" id="lbContent"></div>
  `;
  document.body.appendChild(lb);

  const content = lb.querySelector('#lbContent');
  const closeBtn = lb.querySelector('.lightbox-close');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const svg = item.querySelector('svg');
      if (svg) {
        content.innerHTML = svg.outerHTML;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
})();

// ---- SMOOTH ANCHOR ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- PAGE TRANSITION HINT ----
document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"])').forEach(a => {
  a.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href.startsWith('http')) return;
    // Native navigation is fine; this is just for effect
  });
});

console.log('%cAva Sinclair Portfolio — 2026', 'font-family: Georgia, serif; font-size: 18px; color: #c8a97e;');
