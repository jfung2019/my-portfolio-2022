import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <div className="bg-red-200">
        <NavLink to="/" className="p-4">Home</NavLink>
        <NavLink to="/Post" className="p-4">Post</NavLink>
        <NavLink to="/Experience" className="p-4">Experience</NavLink>
        <NavLink to="/Projects" className="p-4">Projects</NavLink>
        <NavLink to="/Contact" className="p-4">Contact</NavLink>
      </div>
    </header>
  )
}