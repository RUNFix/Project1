import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-800  w-full  top-0 left-0  border-gray-200 z-20 sticky">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowra text-gray-50">
            RUNFIX
          </span>
          <img
            src="https://img.icons8.com/emoji/48/racing-car.png"
            className="h-8 ml-4"
            alt="Runfix logo"
          />
        </a>
        <div className="flex md:order-2">
          <button type="button" className="buttonBlueNavbarStyle">
            Get started
          </button>

          <button type="button" className="grayBlueNavbarStyle ">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 bg-slate-800"
          id="navbar-sticky"
        >
          <ul className="ulNavbarStyle">
            <li>
              <a href="#" className="linkStyle">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="linkStyle">
                About
              </a>
            </li>
            <li>
              <a href="#" className="linkStyle">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="linkStyle">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
