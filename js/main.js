document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach((a) => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
  document.querySelectorAll('.nav-mobile a').forEach((a) => {
    a.addEventListener('click', () => {
      const menu = document.getElementById('mobileNav');
      if (menu) menu.classList.remove('open');
    });
  });
});
