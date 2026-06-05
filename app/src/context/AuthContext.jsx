import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import { loginRequest } from '../api/auth';
import { getAuth, saveAuth, clearAuth, isTokenValid } from '../utils/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    if (auth) {
      setUser(auth.user);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await loginRequest(email, password);
    saveAuth(result.token, result.user);
    setUser(result.user);
    return result.user;
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  const checkAuth = useCallback(() => {
    if (!isTokenValid()) {
      clearAuth();
      setUser(null);
      return false;
    }
    const auth = getAuth();
    if (auth?.user) {
      setUser(auth.user);
      return true;
    }
    return false;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user) && isTokenValid(),
      login,
      logout,
      checkAuth
    }),
    [user, loading, login, logout, checkAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth только внутри AuthProvider');
  }
  return context;
}
