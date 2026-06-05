function About() {
  return (
    <section className="page about">
      <h1>О проекте</h1>
      <p>
        Учебное приложение для курса по React. Используются React Router, запросы к
        открытому API и Context API для кэша каталога и избранного.
      </p>
      <p>
        Данные товаров берутся с{' '}
        <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer">
          fakestoreapi.com
        </a>
        . UI оформлен в стиле UI Kit социальной сети.
      </p>
    </section>
  );
}

export default About;
