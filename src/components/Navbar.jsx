import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary stiky-top bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container" style={{ maxWidth: "1200px" }}>
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => {
                  console.log(isActive);
                  return isActive ? "nav-link active" : "nav-link";
                }}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/playlist">
                Playlist
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/playlist/new">
                Create Playlist
              </Link>
            </li>
          </ul>
          <div className="d-flex" role="search">
            <button
              className="btn btn-outline-danger btn-sm"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
