const nav = document.querySelector('.nav');
const menuButton = document.querySelector('.menu-button');
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});

// Apparition douce des éléments au défilement.
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item, index) => {
    item.style.transitionDelay = `${(index % 3) * 75}ms`;
    observer.observe(item);
  });
} else {
  items.forEach(item => item.classList.add('visible'));
}

// Effet de profondeur discret sur le monogramme, sur ordinateur.
const art = document.querySelector('.hero-art');
if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  art.addEventListener('pointermove', event => {
    const rect = art.getBoundingClientRect();
    art.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width - .5) * 10}px`);
    art.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height - .5) * 10}px`);
  });
  art.addEventListener('pointerleave', () => {
    art.style.setProperty('--mx', '0px');
    art.style.setProperty('--my', '0px');
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
