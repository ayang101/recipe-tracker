import { Outlet, Link } from "react-router-dom";
import './App.css';

const Layout = () => {
  return (
    <>
        <nav>
          <ul>
            <li><Link to="/">meal quest</Link></li>
            <li><Link to="/login">LOG IN</Link></li>
            <li><Link to="/signup">SIGN UP</Link></li>
          </ul>
        </nav>
        <Outlet />
    </>
  )
};

export default Layout;