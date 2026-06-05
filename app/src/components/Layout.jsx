import { memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function Layout({ children }) {
  const { favoritesCount } = useShop();

  const linkClass = useCallback(
    ({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : ''),
    []
  );

  return (
    <div className="app">
      <header className="navbar">
        <div className="container navbar__inner">
          <NavLink to="/" className="navbar__brand">
            <span className="navbar__logo" aria-hidden="true" />
            Каталог
          </NavLink>
          <nav className="navbar__nav" aria-label="Основная навигация">
            <NavLink to="/" end className={linkClass}>
              Главная
            </NavLink>
            <NavLink to="/list" className={linkClass}>
              Товары
            </NavLink>
            <NavLink to="/favourites" className={linkClass}>
              Избранное
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              О нас
            </NavLink>
            <span className="navbar__badge">В избранном: {favoritesCount}</span>
          </nav>
        </div>
      </header>
      <main className="container main">{children}</main>
    </div>
  );
}

export default memo(Layout);
