import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { ShopProvider } from './context/ShopContext';

function renderApp(route) {
  return render(
    <ShopProvider>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </ShopProvider>
  );
}

describe('маршруты App', () => {
  it('открывает главную', async () => {
    renderApp('/');
    expect(await screen.findByText('Добро пожаловать')).toBeInTheDocument();
  });

  it('открывает о нас', async () => {
    renderApp('/about');
    expect(await screen.findByText('Учебный сайт для курса Разработка прототипов программных решений.')).toBeInTheDocument();
  });

  it('открывает избранное', async () => {
    renderApp('/favourites');
    expect(await screen.findByRole('heading', { name: 'Избранное' })).toBeInTheDocument();
    expect(await screen.findByText('Пока ничего не добавлено.')).toBeInTheDocument();
  });
});
