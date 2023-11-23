import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuccessModal } from 'src/utils/Modal';
import { TokenExists, removeTokens } from 'src/utils/Token';
import logo from '../assets/RUNFIX.png'


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showLogOut, setshowLogOut] = useState(TokenExists());
  const [succesLogOut, setsuccesLogOut] = useState(false);

  const navegarLogin = () => {
    navigate('/login');
  };

  const logOut = () => {
    removeTokens();
    setshowLogOut(false);
    setsuccesLogOut(true);

    setTimeout(() => {
      setsuccesLogOut(false);
      navigate('/home');
    }, 3000);
  };

  return (
    <>
      {succesLogOut && <SuccessModal text={'Log out exitoso'} />}
      <nav className="bg-azul  w-full  top-0 left-0  border-gray-200 z-20 sticky">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">

            <img
              src={logo}
              className="h-10 ml-6"
              alt="Runfix logo"
            />
          </a>
          <div className="flex md:order-2">
            {showLogOut ? (
              <button
                type="button"
                className="buttonBlueNavbarStyle"
                onClick={logOut}
                color='#FFBD59'
              >
                Log out
              </button>
            ) : (
              <button
                type="button"
                className="buttonBlueNavbarStyle"
                onClick={navegarLogin}
                color='#FFBD59'
              >
                Log in
              </button>
            )}
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
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
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
    </>
  );
};

export default Navbar;
