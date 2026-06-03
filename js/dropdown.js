(function () {
  const dropdowns = document.querySelectorAll('.dropdown');

  function closeAll(except) {
    dropdowns.forEach(function (dd) {
      if (dd !== except) {
        dd.classList.remove('dropdown--open');
        const toggle = dd.querySelector('.dropdown__toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  dropdowns.forEach(function (dropdown) {
    const toggle = dropdown.querySelector('.dropdown__toggle');
    const menu = dropdown.querySelector('.dropdown__menu');
    const items = dropdown.querySelectorAll('.dropdown__item');
    const valueEl = dropdown.querySelector('.dropdown__value');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('dropdown--open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      closeAll(isOpen ? dropdown : null);
    });

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        items.forEach(function (i) {
          i.classList.remove('dropdown__item--selected');
        });
        item.classList.add('dropdown__item--selected');
        if (valueEl) valueEl.textContent = item.textContent.trim();
        dropdown.classList.remove('dropdown--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  });

  document.addEventListener('click', function () {
    closeAll(null);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll(null);
  });
})();
