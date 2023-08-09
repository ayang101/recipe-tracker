import { Outlet, Link } from "react-router-dom";
import './App.css';

const Layout = () => {
  return (
    <>
        <nav>
          <ul>
            <li><Link to="/">meal quest</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
          </ul>
        </nav>
        <Outlet />
    </>
  )
};

export default Layout;