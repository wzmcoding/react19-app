import { Link } from "react-router";

export default function Header() {
    return (
        <nav>
            <Link to="/"><button className="btn btn-link">Home</button></Link>
            <Link to="/login"><button className="btn btn-link">Login</button></Link>
            <Link to="/not-found"><button className="btn btn-link">404</button></Link>
        </nav>
    );
}