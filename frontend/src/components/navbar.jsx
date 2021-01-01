import React from 'react';
import '../styles/navbar.css';
import { FaSignInAlt, FaLink, FaUser } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#">
            <FaLink className="icons" />
            My URL'S
          </a>
        </li>
        <li>
          <a href="#">
            <FaUser className="icons" />
            About US
          </a>
        </li>
        <li>
          <a href="#">
            <FaSignInAlt className="icons" />
            Sign In/Up
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
