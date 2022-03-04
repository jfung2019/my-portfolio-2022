import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <div className="bg-red-200">
        <NavLink to="/" exact >Home</NavLink>
        <NavLink to="/About">About</NavLink>
        <NavLink to="/Post">Post</NavLink>
        <NavLink to="/Projects">Projects</NavLink>
      </div>
    </header>

  )
}