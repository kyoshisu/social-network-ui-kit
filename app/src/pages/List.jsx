import { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

function List() {
  const { loadProducts } = useShop();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchList() {
      try {
        setLoading(true);
        setError('');
        const data = await loadProducts();
        if (!cancelled) {
          setItems(data);
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

    fetchList();

    return () => {
      cancelled = true;
    };
  }, [loadProducts]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="message message--error">{error}</p>;
  }

  return (
    <section className="page">
      <h1>Каталог товаров</h1>
      <div className="grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default List;
