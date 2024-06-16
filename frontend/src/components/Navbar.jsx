import React from 'react'
import { NavLink } from "react-router-dom";


function Navbar() {
  return (
    
    
    <header>
    <nav>
      <div className="navigation">
        <ul className="navlink">
          <li>
            <NavLink to="/Home"  className ={ ({isActive})=> `${isActive? "yes-nav-text" : "no-nav-text"}`}>
            
              Home
            </NavLink>
          </li>
         
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
          
        </ul>
      </div>
    </nav>
  </header>

  )
}

export default Navbar