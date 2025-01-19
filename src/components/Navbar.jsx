import React from "react";
import { NavLink } from "react-router-dom";
import "../navbar.css";

const Navbar = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/login" 
              className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
            >
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/signup" 
              className={({ isActive }) => (isActive ? "navbar-link active" : "navbar-link")}
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
