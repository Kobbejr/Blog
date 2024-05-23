import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <div className="nav-links">
        <Link to="/">HOME</Link>
        {currentUser && <Link to="/add-post">ADD POST</Link>}
      </div>
      <div className="auth-links">
        {currentUser ? (
          <>
            <p id="logged-user">{currentUser.email}</p>
            <button className="logout-button" onClick={logout}>
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <Link to="/login">LOGIN</Link>
            <Link to="/register">REGISTER</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
