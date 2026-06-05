const PRODUCTS_KEY = 'offline-products';
const PRODUCT_PREFIX = 'offline-product-';

export function saveProductsCache(data) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data));
}

export function getProductsCache() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProductCache(id, data) {
  localStorage.setItem(PRODUCT_PREFIX + id, JSON.stringify(data));
}

export function getProductCache(id) {
  try {
    const raw = localStorage.getItem(PRODUCT_PREFIX + id);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
