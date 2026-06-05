import { createContext, useContext, useState, useCallback } from 'react';
import { getProducts } from '../api';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const loadProducts = useCallback(async () => {
    if (productsLoaded) {
      return products;
    }
    const data = await getProducts();
    setProducts(data);
    setProductsLoaded(true);
    return data;
  }, [products, productsLoaded]);

  const getProductFromCache = useCallback(
    (id) => products.find((item) => String(item.id) === String(id)),
    [products]
  );

  const addToFavorites = useCallback((product) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  }, []);

  const removeFromFavorites = useCallback((id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.id === id),
    [favorites]
  );

  const value = {
    products,
    productsLoaded,
    favorites,
    loadProducts,
    getProductFromCache,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop только внутри ShopProvider');
  }
  return context;
}
