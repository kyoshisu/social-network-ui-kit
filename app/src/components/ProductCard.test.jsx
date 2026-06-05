import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

const product = {
  id: 1,
  title: 'Тестовый товар',
  description: 'Короткое описание товара для проверки',
  image: 'https://example.com/img.jpg',
  category: 'electronics',
  rating: { rate: 4.5 }
};

describe('ProductCard', () => {
  it('показывает название и мета', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(screen.getByText('Тестовый товар')).toBeInTheDocument();
    expect(screen.getByText(/electronics/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Подробнее' })).toHaveAttribute('href', '/list/1');
  });
});
