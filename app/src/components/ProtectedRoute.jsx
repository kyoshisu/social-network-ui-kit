import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isTokenValid } from '../utils/authStorage';
import Spinner from './Spinner';

function ProtectedRoute() {
  const { loading, logout } = useAuth();
  const location = useLocation();
  const valid = isTokenValid();

  useEffect(() => {
    if (!loading && !valid) {
      logout();
    }
  }, [loading, valid, logout]);

  if (loading) {
    return <Spinner />;
  }

  if (!valid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
