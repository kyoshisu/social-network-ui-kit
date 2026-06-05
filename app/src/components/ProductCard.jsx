import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <article className="card">
      <img className="card__image" src={product.image} alt={product.title} />
      <div className="card__body">
        <h3 className="card__title">{product.title}</h3>
        <p className="card__text">{product.description.slice(0, 80)}...</p>
        <footer className="card__footer">
          <span className="card__meta">
            {product.category} · ${product.rating?.rate ?? '—'}
          </span>
          <Link to={`/list/${product.id}`} className="button button--primary button--small">
            Подробнее
          </Link>
        </footer>
      </div>
    </article>
  );
}

export default ProductCard;
