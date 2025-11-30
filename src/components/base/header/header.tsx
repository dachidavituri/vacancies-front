import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { links } from "@/data";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#0C1220] text-[#DDE2E9] shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-2xl font-bold text-[#F5C96B]">
          Gstore Jobs
        </NavLink>

        <nav className="hidden space-x-6 md:flex">
          {links.map((link) => (
            <NavLink key={link.name} to={link.path}>
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="flex flex-col gap-3 space-y-2 bg-[#0C1220] px-6 pb-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
