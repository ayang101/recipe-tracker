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
              <Link to="/recipes/import">Import Recipe</Link>
            </li>
            <li>
              <Link to="/recipes/custom">Custom Recipe</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
    </>
  )
};

export default Layout;