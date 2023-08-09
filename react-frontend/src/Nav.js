import { Outlet, Link } from "react-router-dom";
import './App.css';

const Layout = () => {
  return (
    <>
        <nav>
          <ul>
            <li><Link to="/">meal quest</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
          </ul>
        </nav>
        <Outlet />
    </>
  )
};

export default Layout;