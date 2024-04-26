import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <div>
        <div>
          <nav className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-white text-lg font-semibold ml-2">
                  Managment Prox
                </span>
              </div>
              <div className="hidden md:block">
                <Link to="/" className="NavarIcon">Home</Link>
                <Link to="/about" className="NavarIcon">About</Link>
                <Link to="/services" className="NavarIcon">Services</Link>
                <Link to="/contact" className="NavarIcon">Contact</Link>
              </div>
            </div>
          </nav>
        </div>
        <aside className="w-64 min-h-screen flex flex-col justify-between">
            <div className="p-4">
              <ul className="mt-4 pl-4">
                <li>
                  <Link to="/FormTable" className="AsideMenu">MASTERS</Link>
                </li>
                <li>
                  <Link to="/Testing" className="AsideMenu">PERMISSION</Link>
                </li>
                <li>
                  <Link to="#" className="AsideMenu">BULK UPLOAD</Link>
                </li>
                <li>
                  <Link to="#" className="AsideMenu">FILE UPLOAD</Link>
                </li>
                <li>
                  <Link to="#" className="AsideMenu">PDF</Link>
                </li>
              </ul>
            </div>
            <div className="pb-4 hover:bg-gray-700">
              <Link to="#" className="text-white hover:text-gray-300 mt-auto block border-t border-white pt-5 pl-12 text-xl">Logout</Link>
            </div>
          </aside>
        <main>

        </main>
      </div>
    </>
  );
}

export default NavBar;


