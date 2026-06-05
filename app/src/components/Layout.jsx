import { NavLink } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function Layout({ children }) {
  const { favorites } = useShop();

  return (
    <div className="app">
      <header className="navbar">
        <div className="container navbar__inner">
          <NavLink to="/" className="navbar__brand">
            <span className="navbar__logo" />
            Каталог
          </NavLink>
          <nav className="navbar__nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                'navbar__link' + (isActive ? ' navbar__link--active' : '')
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/list"
              className={({ isActive }) =>
                'navbar__link' + (isActive ? ' navbar__link--active' : '')
              }
            >
              Товары
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                'navbar__link' + (isActive ? ' navbar__link--active' : '')
              }
            >
              О нас
            </NavLink>
            <span className="navbar__badge">Избранное: {favorites.length}</span>
          </nav>
        </div>
      </header>
      <main className="container main">{children}</main>
    </div>
  );
}

export default Layout;
