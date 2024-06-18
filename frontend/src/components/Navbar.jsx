import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext); // Assuming you have a logout function in your AuthContext

  return (
    <header>
      <nav>
        <div className="navigation">
          <ul className="navlink">
            <li>
              <NavLink to="/Home" className={({ isActive }) => `${isActive ? "yes-nav-text" : "no-nav-text"}`}>
                Home
              </NavLink>
            </li>
            {user ? (
              <>
                <span>{user.data.userName || user.data.user.userName}</span>
                <li className="start">
                  <button onClick={logout} className="logout">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="start">
                  <NavLink to="/register" className="login">
                    Register
                  </NavLink>
                </li>
                <li className="start">
                  <NavLink to="/Login" className="login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
