import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api';
import { useShop } from '../context/ShopContext';
import Spinner from '../components/Spinner';

function Details() {
  const { id } = useParams();
  const { getProductFromCache, addToFavorites, removeFromFavorites, isFavorite } = useShop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError('');

        const cached = getProductFromCache(id);
        if (cached) {
          if (!cancelled) {
            setProduct(cached);
            setLoading(false);
          }
          return;
        }

        const data = await getProduct(id);
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Ошибка загрузки');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id, getProductFromCache]);

  const handleFavoriteClick = useCallback(() => {
    if (!product) return;
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  }, [product, isFavorite, removeFromFavorites, addToFavorites]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <section className="page">
        <p className="message message--error" role="alert">
          {error}
        </p>
        <Link to="/list" className="button button--secondary">
          Назад к списку
        </Link>
      </section>
    );
  }

  const inFavorites = isFavorite(product.id);

  return (
    <section className="page details">
      <Link to="/list" className="back-link">
        ← К списку
      </Link>
      <div className="details__layout">
        <img
          className="details__image"
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
        />
        <div className="details__info">
          <h1>{product.title}</h1>
          <p className="details__meta">
            Категория: {product.category} · Рейтинг: {product.rating?.rate} (
            {product.rating?.count} отзывов) · Цена: ${product.price}
          </p>
          <p className="details__description">{product.description}</p>
          <button
            type="button"
            className={'button ' + (inFavorites ? 'button--secondary' : 'button--primary')}
            onClick={handleFavoriteClick}
          >
            {inFavorites ? 'Убрать из избранного' : 'Добавить в избранное'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Details;
