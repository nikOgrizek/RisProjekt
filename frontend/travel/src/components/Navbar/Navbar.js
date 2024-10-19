// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import Avtentikacija from "../Avtentikacija/Auth";
import PotUredi from "../Pot/urediPot";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Avtentikacija />
        </li>
        <li>
          <PotUredi />
        </li>
        {/* Add other navbar items as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
