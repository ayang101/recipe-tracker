import { Outlet, Link } from "react-router-dom";
import './App.css';

const Layout = () => {
  return (
    <>
        <nav className="nav">
          <div className="nav-item">
            <Link to="/">Home</Link>
          </div>
          <div className="nav-item">
            <Link to="/recipes">List all</Link>
          </div>
          <div className="nav-item">
            <Link to="/recipes/import">Import Recipe</Link>
          </div>
          <div className="nav-item">
            <Link to="/recipes/custom">Custom Recipe</Link>
          </div>
        </nav>
        <Outlet />
    </>
  )
};

export default Layout;