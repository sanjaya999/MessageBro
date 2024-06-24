import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <div className="navigation">
          <ul className="navlink">
            <li>
              <NavLink to="/home" className="home">
                Home
              </NavLink>
            </li>
            {user ? (
              <>
                <li className="username">
                  <span className='UserName'>{user.data.userName || user.data.user.userName}</span>
                </li>
                <li className="logout">
                  <button className="welogout"onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register" className="login">
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="login">
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
