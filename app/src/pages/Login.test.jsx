        import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../context/AuthContext';

function renderLogin() {
  return render(
    <AuthProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );
}

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('показывает ошибки валидации', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByRole('button', { name: 'Войти' }));

    expect(screen.getByText('Введите email или логин')).toBeInTheDocument();
    expect(screen.getByText('Пароль должен быть не менее 6 символов')).toBeInTheDocument();
  });
});
