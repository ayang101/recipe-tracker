import { Outlet, Link } from "react-router-dom";
import './App.css';

const Layout = () => {
  return (
    <>
        <nav>
          <ul>
            <li><Link to="/">meal quest</Link></li>
            <li><Link to="/recipes">COOK</Link></li>
            <li><Link to="/meal-planner">PLAN</Link></li>
            <li><Link to="/grocery-list">SHOP</Link></li>
            <li><Link to="/logout">LOG OUT</Link></li>
          </ul>
        </nav>
        <Outlet />
    </>
  )
};

export default Layout;