import { renderHook, act } from '@testing-library/react';
import { ShopProvider, useShop } from './ShopContext';

const wrapper = ({ children }) => <ShopProvider>{children}</ShopProvider>;

const sampleProduct = {
  id: 5,
  title: 'Куртка',
  description: 'Описание',
  image: 'img.jpg',
  category: 'men',
  price: 55,
  rating: { rate: 4, count: 10 }
};

describe('ShopContext избранное', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('добавляет товар и увеличивает количество', () => {
    const { result } = renderHook(() => useShop(), { wrapper });

    act(() => {
      result.current.addToFavorites(sampleProduct);
    });

    expect(result.current.isFavorite(5)).toBe(true);
    expect(result.current.favoritesCount).toBe(1);

    act(() => {
      result.current.addToFavorites(sampleProduct);
    });

    expect(result.current.favoritesCount).toBe(2);
    expect(result.current.favorites[0].quantity).toBe(2);
  });

  it('удаляет товар из избранного', () => {
    const { result } = renderHook(() => useShop(), { wrapper });

    act(() => {
      result.current.addToFavorites(sampleProduct);
      result.current.removeFromFavorites(5);
    });

    expect(result.current.isFavorite(5)).toBe(false);
    expect(result.current.favorites.length).toBe(0);
  });

  it('сохраняет в localStorage', () => {
    const { result } = renderHook(() => useShop(), { wrapper });

    act(() => {
      result.current.addToFavorites(sampleProduct);
    });

    const saved = JSON.parse(localStorage.getItem('shop-favorites'));
    expect(saved[0].product.id).toBe(5);
    expect(saved[0].quantity).toBe(1);
  });
});
