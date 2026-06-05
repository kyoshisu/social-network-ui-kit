import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo
} from 'react';
import { getProducts } from '../api';

const STORAGE_KEY = 'shop-favorites';

const ShopContext = createContext(null);

function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [favorites, setFavorites] = useState(() => readFavorites());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

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
      const found = prev.find((item) => item.product.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromFavorites = useCallback((id) => {
    setFavorites((prev) => prev.filter((item) => item.product.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.product.id === id),
    [favorites]
  );

  const favoritesCount = useMemo(
    () => favorites.reduce((sum, item) => sum + item.quantity, 0),
    [favorites]
  );

  const value = useMemo(
    () => ({
      products,
      productsLoaded,
      favorites,
      favoritesCount,
      loadProducts,
      getProductFromCache,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }),
    [
      products,
      productsLoaded,
      favorites,
      favoritesCount,
      loadProducts,
      getProductFromCache,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop только внутри ShopProvider');
  }
  return context;
}
