const API_URL = 'https://fakestoreapi.com';

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Не удалось загрузить каталог');
  }
  return response.json();
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Товар не найден');
  }
  return response.json();
}
