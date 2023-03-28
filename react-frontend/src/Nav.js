import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
        <nav>
          <ul>
            <li>
              <Link to="/recipes">List all</Link>
            </li>
            <li>
              <Link to="/recipes/form">Add +</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
    </>
  )
};

export default Layout;