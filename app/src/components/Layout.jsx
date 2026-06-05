import { memo, useCallback } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import NetworkStatus from './NetworkStatus';

function Layout() {
  const { favoritesCount } = useShop();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = useCallback(
    ({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : ''),
    []
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login', { replace: true });
  }, [logout, navigate]);

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
            <div className="navbar__auth">
              <NetworkStatus />
              {isAuthenticated && user ? (
                <>
                  <span className="navbar__user">{user.name}</span>
                  <button type="button" className="button button--secondary button--small" onClick={handleLogout}>
                    Выйти
                  </button>
                </>
              ) : (
                <NavLink to="/login" className="button button--primary button--small">
                  Войти
                </NavLink>
              )}
            </div>
          </nav>
        </div>
      </header>
      <main className="container main">
        <Outlet />
      </main>
    </div>
  );
}

export default memo(Layout);
