import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Favourites from './Favourites';
import { renderWithProviders } from '../test/test-utils';

const sampleProduct = {
  id: 2,
  title: 'Рюкзак',
  description: 'Удобный рюкзак',
  image: 'bag.jpg',
  category: 'bags',
  price: 30,
  rating: { rate: 3.8, count: 5 }
};

describe('Favourites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('показывает пустое состояние', () => {
    renderWithProviders(<Favourites />, { route: '/favourites' });
    expect(screen.getByText('Пока ничего не добавлено.')).toBeInTheDocument();
  });

  it('показывает товар и удаляет', async () => {
    localStorage.setItem(
      'shop-favorites',
      JSON.stringify([{ product: sampleProduct, quantity: 2 }])
    );

    const user = userEvent.setup();
    renderWithProviders(<Favourites />, { route: '/favourites' });

    expect(screen.getByText('Рюкзак')).toBeInTheDocument();
    expect(screen.getByText(/Количество: 2/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Удалить Рюкзак/ }));

    expect(screen.getByText('Пока ничего не добавлено.')).toBeInTheDocument();
  });
});
