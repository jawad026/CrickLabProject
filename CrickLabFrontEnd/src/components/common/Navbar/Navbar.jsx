import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      <nav className="bg-white border-gray-300 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/dixynhi69/image/upload/v1695276092/pngwing.com_metchc.png"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              CrickLab
            </span>
          </div>

          {/* Toggle button for smaller screens */}
          <button
            className="md:hidden p-2"
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div
            className={`${
              isNavOpen ? "block" : "hidden"
            } w-full md:w-auto md:block mt-4 md:mt-0  md:space-x-8`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <NavLink
                  exact
                  to="/"
                 
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/news"
                 
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                >
                  News
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/series"
                 
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                >
                  Series
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/teams"
                 
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                >
                  Teams
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                 
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
