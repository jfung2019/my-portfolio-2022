import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {}, [isOpen]);

  const handleNavMenuToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <header>
      <motion.div className="px-8 md:px-[80px] lg:px-[160px] bg-general-black flex flex-wrap justify-between items-center mx-auto py-8 font-DMSerifDisplay">
        <div className="z-20">
          <a href="/" className="flex items-center">
            <span className="text-2xl self-center font-semibold whitespace-nowrap text-white  ">
              Fung.Lam
            </span>
          </a>
        </div>

        <button onClick={handleNavMenuToggle} className="z-20">
          <div className="text-white text-left font-bold text-[24px] block md:hidden transition ease-in-out duration-[5000ms]">
            {isOpen ? "Close" : "Menu"}
          </div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: "-100vh" }}
              animate={{
                y: 0,
                transition: { ease: "linear", duration: 0.3 },
              }}
              exit={{
                x: "-100vw",
                transition: { ease: "linear", duration: 0.3 },
              }}
              className="absolute w-full bg-[#191919] right-0 h-screen top-0 block md:hidden z-10">
              <motion.div 
                  initial={{y: 100, scale: 0, x: -100}}
                  animate={{y: 0, scale: 1, x: [-400, 0], transition: {duration: 0.5}}}
              className="absolute bottom-0 left-0 text-white mt-[50px] px-8 mb-[100px] flex flex-col">
                <NavLink
                  onClick={handleNavMenuToggle}
                  to="/"
                  className="text-left font-bold text-[54px]">
                  Home
                </NavLink>
                <NavLink
                  onClick={handleNavMenuToggle}
                  to="/About"
                  className="text-left font-bold text-[54px]">
                  ABOUT ME
                </NavLink>
                <NavLink
                  onClick={handleNavMenuToggle}
                  to="/Projects"
                  className="text-left font-bold text-[54px]">
                  PROJECTS
                </NavLink>
                <NavLink
                  onClick={handleNavMenuToggle}
                  to="/Post"
                  className="text-left font-bold text-[54px]">
                  POST
                </NavLink>
                <NavLink
                  onClick={handleNavMenuToggle}
                  to="/Contact"
                  className="text-left font-bold text-[54px]">
                  CONTACT
                </NavLink>
              </motion.div>
              {/* <div className="absolute top-0 right-0 text-white mt-[50px] px-8">
              <button onClick={handleNavMenuToggle}>
                <h1 className="text-left font-bold text-[24px] mt-[-20px]">
                  Close
                </h1>
              </button>
            </div> */}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimateSharedLayout>
          <div className="hidden md:block">
            <NavLink to="/About" className="p-0 md:p-4 text-white">
              About
            </NavLink>
            <NavLink to="/Projects" className="p-0 md:p-4 text-white">
              Projects
            </NavLink>
            <NavLink to="/Post" className="p-0 md:p-4 text-white">
              Blogs
            </NavLink>
            <NavLink to="/Contact" className="p-0 md:p-4 text-white">
              Contact
            </NavLink>
          </div>
        </AnimateSharedLayout>
      </motion.div>
    </header>
  );
}
