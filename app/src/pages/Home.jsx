import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="page home">
      <h1>Добро пожаловать</h1>
      <p>
        Это учебный каталог на React. Здесь можно посмотреть список товаров,
        открыть карточку с подробностями и добавить понравившееся в избранное.
      </p>
      <Link to="/list" className="button button--primary">
        Перейти в каталог
      </Link>
    </section>
  );
}

export default Home;
