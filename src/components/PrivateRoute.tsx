import { Navigate } from 'react-router';
import { useStore } from '../store';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const isAuthenticated = useStore(state => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
} 