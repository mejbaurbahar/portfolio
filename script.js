/*==================== AOS INITIALIZATION ====================*/
window.addEventListener('load', () => {
  AOS.init({ duration: 900, offset: 80, once: true });
});

/*==================== DARK / LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme   = 'dark-theme';
const iconTheme   = 'fa-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon  = localStorage.getItem('selected-icon');

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem('selected-theme', document.body.classList.contains(darkTheme) ? 'dark' : 'light');
  localStorage.setItem('selected-icon',  themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun');
});

/*==================== SCROLL HEADER ====================*/
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scroll-header', window.scrollY >= 80);
  document.getElementById('scroll-up').classList.toggle('show-scroll', window.scrollY >= 560);
});

/*==================== QUALIFICATION TABS ====================*/
document.querySelectorAll('[data-target]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-content]').forEach(c => c.classList.remove('qualification-active'));
    document.querySelectorAll('[data-target]').forEach(t => t.classList.remove('qualification-active'));
    document.querySelector(tab.dataset.target).classList.add('qualification-active');
    tab.classList.add('qualification-active');
  });
});

/*==================== SWIPER PORTFOLIO ====================*/
new Swiper('.portfolio-container', {
  cssMode: false,
  grabCursor: true,
  spaceBetween: 40,
  loop: true,
  autoplay: { delay: 3500, disableOnInteraction: false },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
});

/*==================== TYPED TEXT ====================*/
const typedEl   = document.getElementById('typed-text');
const phrases   = [
  'Senior Software Engineer QA',
  'AI Testing Specialist',
  'Security Researcher',
  'Automation Architect',
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = phrases[phraseIdx];
  typedEl.textContent = deleting
    ? current.substring(0, charIdx--)
    : current.substring(0, charIdx++);

  let delay = deleting ? 55 : 90;

  if (!deleting && charIdx === current.length + 1) {
    delay = 1800;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 350;
  }

  setTimeout(typeLoop, delay);
}
typeLoop();

/*==================== COUNTER ANIMATION ====================*/
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const step = target / (duration / 16);
  let current = 0;

  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = '1';
      animateCount(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.home-stat-number[data-target]').forEach(el => counterObserver.observe(el));

/*==================== ACTIVE NAV ON SCROLL ====================*/
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-link'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active-link');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));
