import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { canAccessAdmin, getAdminSessionRole } from '../lib/adminAuth';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const role = getAdminSessionRole();
  const location = useLocation();

  if (!canAccessAdmin(role)) {
    return <Navigate to="/admin-access" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
