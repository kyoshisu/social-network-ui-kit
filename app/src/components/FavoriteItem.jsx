import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

function FavoriteItem({ item, onRemove }) {
  const { product, quantity } = item;

  const handleRemove = useCallback(() => {
    onRemove(product.id);
  }, [onRemove, product.id]);

  return (
    <article className="fav-item">
      <img
        className="fav-item__image"
        src={product.image}
        alt={product.title}
        loading="lazy"
        width={80}
        height={80}
      />
      <div className="fav-item__body">
        <h3 className="fav-item__title">
          <Link to={`/list/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="fav-item__meta">
          Количество: {quantity} · {product.category} · ${product.price}
        </p>
      </div>
      <button
        type="button"
        className="button button--secondary button--small"
        onClick={handleRemove}
        aria-label={'Удалить ' + product.title + ' из избранного'}
      >
        Удалить
      </button>
    </article>
  );
}

export default memo(FavoriteItem);
