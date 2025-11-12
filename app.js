// app.js — enhanced interactions: typed intro, reveal, blobs parallax, progress bar, theme, etc.
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = ['home','about','projects','resume','contact'].map(id => document.getElementById(id));
  const drawer = document.getElementById('mobileDrawer');
  const drawerBg = document.getElementById('drawerBg');
  const menuBtn = document.getElementById('menuBtn');
  const closeDrawer = document.getElementById('closeDrawer');
  const themeToggle = document.getElementById('themeToggle');
  const toTop = document.getElementById('toTop');
  const yearEl = document.getElementById('year');
  const progress = document.getElementById('progress');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Smooth nav scrolling and active state ----------
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href') || ('#' + link.dataset.target);
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeDrawerIfOpen();
    });
  });

  function updateActiveNav() {
    const offset = window.scrollY + (window.innerHeight * 0.35);
    let current = 'home';
    for (const s of sections) if (s && s.offsetTop <= offset) current = s.id;
    navLinks.forEach(a => {
      const t = (a.getAttribute('href') || '#' + a.dataset.target).replace('#','');
      a.classList.toggle('active', t === current);
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('resize', () => setTimeout(updateActiveNav, 150));
  updateActiveNav();

  // ---------- Mobile drawer ----------
  function closeDrawerIfOpen(){
    if (!drawer) return;
    if (!drawer.classList.contains('hidden')) drawer.classList.add('hidden');
  }
  if (menuBtn) menuBtn.addEventListener('click', () => drawer.classList.remove('hidden'));
  if (closeDrawer) closeDrawer.addEventListener('click', () => drawer.classList.add('hidden'));
  if (drawerBg) drawerBg.addEventListener('click', () => drawer.classList.add('hidden'));
  document.addEventListener('keyup', (e) => { if (e.key === 'Escape') closeDrawerIfOpen(); });

  // ---------- Theme toggle (dark <-> light) ----------
  (function initTheme(){
    const stored = localStorage.getItem('site-theme');
    if (stored === 'light') document.documentElement.classList.add('light-theme');
    else document.documentElement.classList.remove('light-theme'); // default is dark variables
  })();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nowLight = document.documentElement.classList.toggle('light-theme');
      localStorage.setItem('site-theme', nowLight ? 'light' : 'dark');
      // small visual feedback
      themeToggle.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 420 });
    });
  }

  // ---------- Reveal on scroll (float-up + glow) & section sweep ----------
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  const sweepEls = Array.from(document.querySelectorAll('.sweep'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // add sweep effect to parent section if present
        const sect = entry.target.closest('section.sweep');
        if (sect && !sect.classList.contains('revealed')) {
          sect.classList.add('revealed');
          // remove sweep after animation duration
          setTimeout(() => sect.classList.remove('revealed'), 1200);
        }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // ---------- Typed hero intro ----------
  (function typedIntro(){
    const el = document.getElementById('typed-line');
    if (!el) return;
    const full = el.textContent.trim();
    el.textContent = '';
    const chars = Array.from(full);
    let i = 0;
    const speed = 50; // ms per char
    const delay = 500;
    setTimeout(() => {
      const t = setInterval(() => {
        el.textContent += chars[i++] || '';
        if (i >= chars.length) clearInterval(t);
      }, speed);
    }, delay);
  })();

  // ---------- Scroll progress bar ----------
  function updateProgress(){
    const doc = document.documentElement;
    const total = doc.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    progress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress);
  updateProgress();

  // ---------- Back to top visibility ----------
  function updateToTop(){
    if (!toTop) return;
    if (window.scrollY > window.innerHeight * 0.6) toTop.classList.remove('hidden');
    else toTop.classList.add('hidden');
  }
  window.addEventListener('scroll', updateToTop);
  updateToTop();
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---------- Parallax glow blobs (simple: move decorative elements based on scroll) ----------
  (function createBlobs(){
    // Add a few decorative blobs behind main content (non-interactive)
    const blobs = [];
    const blobConfig = [
      { left: '5%', top: '70%', size: 380, color: 'rgba(124,58,237,0.07)' },
      { left: '88%', top: '10%', size: 320, color: 'rgba(6,182,212,0.06)' },
      { left: '10%', top: '10%', size: 260, color: 'rgba(124,58,237,0.05)' }
    ];
    blobConfig.forEach(cfg => {
      const d = document.createElement('div');
      d.setAttribute('aria-hidden','true');
      Object.assign(d.style, {
        position:'fixed',
        left:cfg.left,
        top:cfg.top,
        width: cfg.size + 'px',
        height: cfg.size + 'px',
        borderRadius:'50%',
        background: `radial-gradient(circle at 30% 30%, ${cfg.color}, transparent 30%)`,
        filter:'blur(40px)',
        zIndex:0,
        pointerEvents:'none',
        transform:'translate3d(0,0,0)'
      });
      document.body.appendChild(d);
      blobs.push(d);
    });

    // on scroll, move blobs slightly for parallax
    window.addEventListener('scroll', () => {
      const sc = window.scrollY;
      blobs.forEach((b, idx) => {
        const speed = 0.06 + idx * 0.02;
        b.style.transform = `translateY(${sc * speed}px)`;
      });
    });
  })();

  // ---------- Contact form demo ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type=submit]');
      const prev = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending...';
      setTimeout(() => {
        btn.textContent = prev;
        btn.disabled = false;
        alert('Thank you! This is a demo form — integrate a backend or email service for live messages.');
        contactForm.reset();
      }, 900);
    });
  }

  // ---------- Safety: if anything fails, core HTML still visible ----------
});
