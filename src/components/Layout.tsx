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

    // 导航菜单项配置
    const menuItems = [
        { path: '/', label: '首页', icon: '🏠' },
        { path: '/diary', label: '日记', icon: '📝' },
        { path: '/wishlist', label: '愿望清单', icon: '✨' }
    ];

    return (
        <div className="min-h-screen bg-base-100">
            {/* 导航栏 */}
            <nav className="navbar bg-primary text-primary-content sticky top-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems.map(item => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={location.pathname === item.path ? 'active' : ''}
                                    >
                                        {item.icon} {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost text-xl">Sweet Days</Link>
                </div>

                {/* 桌面端导航菜单 */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItems.map(item => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={location.pathname === item.path ? 'active' : ''}
                                >
                                    {item.icon} {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 用户菜单 */}
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost gap-2">
                            <span className="hidden sm:inline">{user}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <button onClick={handleLogout} className="text-error">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L15.586 9H7a1 1 0 100 2h8.586l-1.293 1.293z" clipRule="evenodd" />
                                    </svg>
                                    退出登录
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* 主要内容区域 */}
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {children}
            </main>

            {/* 底部导航栏（移动端） */}
            <div className="btm-nav lg:hidden">
                {menuItems.map(item => (
                    <button
                        key={item.path}
                        className={location.pathname === item.path ? 'active' : ''}
                        onClick={() => navigate(item.path)}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="btm-nav-label">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
} 