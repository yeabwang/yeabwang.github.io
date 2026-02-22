document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupHamburger();
  setupActiveNav();
  setupReveal();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ── Dark / Light ────────────────────────────────────────────── */
function setupTheme() {
  const root = document.documentElement;
  const btn  = document.getElementById('theme-toggle');

  const saved       = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  apply(saved || (prefersDark ? 'dark' : 'light'));

  btn.addEventListener('click', () => {
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}

/* ── Hamburger ───────────────────────────────────────────────── */
function setupHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
    })
  );
}

/* ── Active nav on scroll ────────────────────────────────────── */
function setupActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting)
        links.forEach(l =>
          l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`)
        );
    }),
    { rootMargin: '-35% 0px -60% 0px' }
  ).observe
    ? sections.forEach(s =>
        new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting)
              links.forEach(l =>
                l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`)
              );
          },
          { rootMargin: '-35% 0px -60% 0px' }
        ).observe(s)
      )
    : null;
}

/* ── Scroll Reveal ───────────────────────────────────────────── */
function setupReveal() {
  const els = document.querySelectorAll('.reveal');
  const io  = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  els.forEach((el, i) => {
    // Stagger siblings within the same parent
    const siblings = [...el.parentElement.querySelectorAll('.reveal')];
    const idx      = siblings.indexOf(el);
    el.style.transitionDelay = `${idx * 80}ms`;
    io.observe(el);
  });
}
