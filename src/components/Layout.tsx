import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useStore } from '../store';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-base-100">
            <nav className="navbar bg-primary text-primary-content">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">Sweet Days</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                                首页
                            </Link>
                        </li>
                        <li>
                            <Link to="/diary" className={location.pathname === '/diary' ? 'active' : ''}>
                                日记
                            </Link>
                        </li>
                        <li>
                            <Link to="/wishlist" className={location.pathname === '/wishlist' ? 'active' : ''}>
                                愿望清单
                            </Link>
                        </li>
                    </ul>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost">
                            {user}
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><button onClick={handleLogout}>退出登录</button></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
} 