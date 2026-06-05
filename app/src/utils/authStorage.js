const TOKEN_KEY = 'auth-token';
const EXPIRES_KEY = 'auth-expires';
const USER_KEY = 'auth-user';

export function saveAuth(token, user) {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRES_KEY, String(expiresAt));
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getAuth() {
  const token = localStorage.getItem(TOKEN_KEY);
  const expires = localStorage.getItem(EXPIRES_KEY);
  const userRaw = localStorage.getItem(USER_KEY);

  if (!token || !expires) {
    return null;
  }

  if (Date.now() > Number(expires)) {
    clearAuth();
    return null;
  }

  let user = null;
  if (userRaw) {
    try {
      user = JSON.parse(userRaw);
    } catch {
      user = null;
    }
  }

  return { token, user };
}

export function isTokenValid() {
  return getAuth() !== null;
}
