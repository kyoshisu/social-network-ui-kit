(function () {
  const navbars = document.querySelectorAll('.navbar');

  navbars.forEach(function (navbar) {
    const toggle = navbar.querySelector('.navbar__toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      const isOpen = navbar.classList.toggle('navbar--open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target) && navbar.classList.contains('navbar--open')) {
        navbar.classList.remove('navbar--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
