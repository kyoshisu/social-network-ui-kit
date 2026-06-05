import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ShopProvider } from '../context/ShopContext';
import { AuthProvider } from '../context/AuthContext';
import { saveAuth } from '../utils/authStorage';

export function seedAuth() {
  saveAuth('test-token', { email: 'student@mail.ru', name: 'student' });
}

export function renderWithProviders(ui, { route = '/', withAuth = true } = {}) {
  if (withAuth) {
    seedAuth();
  } else {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-expires');
    localStorage.removeItem('auth-user');
  }

  return render(
    <AuthProvider>
      <ShopProvider>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </ShopProvider>
    </AuthProvider>
  );
}
