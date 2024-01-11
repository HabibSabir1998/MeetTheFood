import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { MdOutlineFastfood } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { useSidebarContext } from "../../context/sidebarContext";

const Navbar = () => {
  const { openSidebar } = useSidebarContext();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <nav
      className={`navbar bg-orange flex align-center ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="container w-100">
        <div className="navbar-content text-white">
          <div className="brand-and-toggler flex align-center justify-between">
            <div className="flex flex-row">
           
            <Link to="/" className="navbar-brand fw-3 fs-22 flex align-center">
              <MdOutlineFastfood />
              <span className="navbar-brand-text fw-7">Meet The Meals.</span>
            </Link>
            <Link to="/favourite" className="navbar-brand fw-2 fs-16 flex align-center  mx-4">
              <span className="navbar-brand-text fw-7">Favourites</span>
            </Link>
            <Link to="/aboutme" className="navbar-brand fw-2 fs-16 flex align-center  mx-4">
              <span className="navbar-brand-text fw-7">About Me</span>
            </Link>
            </div>
            <div className="navbar-btns flex align-center">
              <button
                type="button"
                className="navbar-show-btn text-white"
                onClick={() => openSidebar()}
              >
                <IoMdMenu size={27} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;