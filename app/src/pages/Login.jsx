import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function validateLogin(value) {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return true;
  }
  return /^[a-zA-Z0-9._-]{3,}$/.test(value);
}

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = location.state?.from?.pathname || '/';
      navigate(redirect, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  function validateForm() {
    const next = {};

    if (!validateLogin(email)) {
      next.email = 'Введите email или логин';
    }

    if (password.length < 6) {
      next.password = 'Пароль должен быть не менее 6 символов';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      const redirect = location.state?.from?.pathname || '/';
      navigate(redirect, { replace: true });
    } catch (err) {
      setApiError(err.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page login-page">
      <h1>Вход</h1>
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <label className="field">
          <span>Email или логин</span>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>

        <label className="field">
          <span>Пароль</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {errors.password && <span className="field-error">{errors.password}</span>}
        </label>

        {apiError && (
          <p className="message message--error" role="alert">
            {apiError}
          </p>
        )}

        <button type="submit" className="button button--primary" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
      <p className="login-hint">
        eve.holt@reqres.in / cityslicka или emilys / emilyspass
      </p>
    </section>
  );
}

export default Login;
