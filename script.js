document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Toggle menu
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.setAttribute('data-visible', !isExpanded);
    
    // Bloquear scroll quando o menu está aberto
    document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navLinks.setAttribute('data-visible', 'false');
      document.body.style.overflow = 'auto';
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.getAttribute('data-visible') === 'true') {
      menuToggle.setAttribute('aria-expanded', 'false');
      navLinks.setAttribute('data-visible', 'false');
      document.body.style.overflow = 'auto';
    }
  });

  // Esconder navbar no scroll down
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      document.querySelector('.navbar').classList.remove('hidden');
      return;
    }
    
    if (currentScroll > lastScroll && !navLinks.getAttribute('data-visible')) {
      document.querySelector('.navbar').classList.add('hidden');
    } else {
      document.querySelector('.navbar').classList.remove('hidden');
    }
    lastScroll = currentScroll;
  });
});