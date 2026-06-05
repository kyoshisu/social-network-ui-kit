import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import FavoriteItem from '../components/FavoriteItem';

function Favourites() {
  const { favorites, removeFromFavorites } = useShop();

  const handleRemove = useCallback(
    (id) => {
      removeFromFavorites(id);
    },
    [removeFromFavorites]
  );

  const list = useMemo(() => favorites, [favorites]);

  if (list.length === 0) {
    return (
      <section className="page">
        <h1>Избранное</h1>
        <p className="empty-text">Пока ничего не добавлено.</p>
        <Link to="/list" className="button button--primary">
          Перейти в каталог
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Избранное</h1>
      <ul className="fav-list">
        {list.map((item) => (
          <li key={item.product.id}>
            <FavoriteItem item={item} onRemove={handleRemove} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Favourites;
