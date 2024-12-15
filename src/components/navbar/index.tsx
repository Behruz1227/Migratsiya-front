import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LanguageSelect from "./languageOption";
import { davlat } from "../../assets";

interface NavigationItem {
  name: string;
  path: string;
}

interface NavbarProps {
  navigation: NavigationItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navigation }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Extract the text after the last '/' in the pathname
  const currentPath = location.pathname.split("/").filter(Boolean).pop();

  return (
    <nav className="bg-[#0086D1]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#0086D1] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="shrink-0 items-center hidden sm:block">
              <img className="h-10 w-auto" src={davlat} alt="Your Company" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={() =>
                      currentPath === item.path.split("/").filter(Boolean).pop()
                        ? "rounded-md bg-[#04466c] px-3 py-2 text-sm font-medium text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium hover:bg-[#579bc3] text-white"
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <LanguageSelect />

            <div className="relative ml-3">
              <div className="flex gap-3">
                <div className="flex items-center justify-center text-white">
                  <p>Name</p>
                </div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={() =>
                currentPath === item.path.split("/").filter(Boolean).pop()
                  ? "block rounded-md bg-[#04466c] px-3 py-2 text-base font-medium text-white"
                  : "block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#579bc3]"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
