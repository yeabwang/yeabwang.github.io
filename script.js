/* ── Feather icons init ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  feather.replace();
  init();
});

function init() {
  setupThemeToggle();
  setupHamburger();
  setupActiveNavOnScroll();
  document.getElementById('year').textContent = new Date().getFullYear();
}

/* ── Dark / Light Mode ───────────────────────────────────────── */
function setupThemeToggle() {
  const root    = document.documentElement;
  const btn     = document.getElementById('theme-toggle');
  const iconEl  = document.getElementById('theme-icon');

  // Restore saved preference or use system default
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Swap icon: moon → shown in light mode (click to go dark), sun → shown in dark mode
    iconEl.setAttribute('data-feather', theme === 'dark' ? 'sun' : 'moon');
    feather.replace(); // re-render all feather icons
  }
}

/* ── Hamburger Menu ──────────────────────────────────────────── */
function setupHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ── Active Nav Link on Scroll ───────────────────────────────── */
function setupActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}
