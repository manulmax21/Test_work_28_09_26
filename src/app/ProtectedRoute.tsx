import { Navigate } from 'react-router-dom';
import { useSession } from '@/entities/session/model/useSession';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const credentials = useSession((s) => s.credentials);

  if (!credentials) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
