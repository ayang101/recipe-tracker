import { Outlet, Link } from "react-router-dom";
import './App.css';

const Layout = () => {
  return (
    <>
        <nav>
          <ul>
            <li><Link className="link" to="/">meal quest</Link></li>
            <li style={{float: 'right', paddingRight: 50}}><Link className="link" to="/login">LOG IN</Link></li>
            <li style={{float: 'right'}}><Link className="link" to="/signup">SIGN UP</Link></li>
          </ul>
        </nav>
        <Outlet />
    </>
  )
};

export default Layout;