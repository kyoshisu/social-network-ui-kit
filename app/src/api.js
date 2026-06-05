import {
  getProductsCache,
  saveProductsCache,
  getProductCache,
  saveProductCache
} from './utils/offlineCache';

const API_URL = 'https://fakestoreapi.com';
const OFFLINE_MSG = 'Вы находитесь в офлайн-режиме';

async function fetchWithCache(url, cacheKey) {
  if (!navigator.onLine) {
    const cached = cacheKey === 'products' ? getProductsCache() : getProductCache(cacheKey);
    if (cached) {
      return cached;
    }
    throw new Error(OFFLINE_MSG);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка запроса');
    }
    const data = await response.json();

    if (cacheKey === 'products') {
      saveProductsCache(data);
    } else {
      saveProductCache(cacheKey, data);
    }

    return data;
  } catch (err) {
    const cached = cacheKey === 'products' ? getProductsCache() : getProductCache(cacheKey);
    if (cached) {
      return cached;
    }
    if (!navigator.onLine || err.message === 'Failed to fetch') {
      throw new Error(OFFLINE_MSG);
    }
    throw err;
  }
}

export async function getProducts() {
  return fetchWithCache(`${API_URL}/products`, 'products');
}

export async function getProduct(id) {
  const data = await fetchWithCache(`${API_URL}/products/${id}`, String(id));
  if (!data) {
    throw new Error('Товар не найден');
  }
  return data;
}

export { OFFLINE_MSG };
