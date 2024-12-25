import { NavLink, Link } from "react-router";

export default function Header() {
    return (
        <nav>
            {/* NavLink 可以很方便的展示激活状态样式 */}
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-500" : "")}>
                Home
            </NavLink>
            <Link to="/not-found"><button className="btn btn-link">404</button></Link>
        </nav>
    );
}