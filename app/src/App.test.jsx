import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';
import { seedAuth } from './test/test-utils';

function renderApp(route, withAuth = true) {
  if (withAuth) {
    seedAuth();
  } else {
    localStorage.clear();
  }

  return render(
    <AuthProvider>
      <ShopProvider>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </ShopProvider>
    </AuthProvider>
  );
}

describe('маршруты App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('открывает главную', async () => {
    renderApp('/');
    expect(await screen.findByText('Добро пожаловать')).toBeInTheDocument();
  });

  it('открывает о нас', async () => {
    renderApp('/about');
    expect(
      await screen.findByText('Учебный сайт для курса Разработка прототипов программных решений.')
    ).toBeInTheDocument();
  });

  it('открывает избранное', async () => {
    renderApp('/favourites');
    expect(await screen.findByRole('heading', { name: 'Избранное' })).toBeInTheDocument();
    expect(await screen.findByText('Пока ничего не добавлено.')).toBeInTheDocument();
  });

  it('перенаправляет на вход без токена', async () => {
    renderApp('/', false);
    expect(await screen.findByRole('heading', { name: 'Вход' })).toBeInTheDocument();
  });
});
