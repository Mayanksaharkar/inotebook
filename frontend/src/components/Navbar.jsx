/* eslint-disable react/prop-types */
// import {  } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../icon/book.png";

const Navbar = () => {
  const navigate = useNavigate();

  let isLoggedin = localStorage.getItem("token");
  console.log("isLoggedin:", isLoggedin);

  const handleLogoutClick = () => {
    console.log("logout click");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoggedin) {
    return (
      <div className="bg-base-200 sticky top-0 drop-shadow-xl">
        <div className="navbar neutral">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52  text-primary"
              >
                <li>
                  <Link to="/" className="text-xl mx-2 ">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-xl mx-2 ">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/notesboard" className="text-xl mx-2 ">
                    Notes
                  </Link>
                </li>
              </ul>
            </div>
            <a
              href="#"
              className="flex items-center  text-2xl font-semibold "
            >
              <img className="w-8 h-8 " src={icon} alt="logo" />
              INoteBook
            </a>
          </div>
          <div className="navbar-center hidden lg:flex text-xl text-primary">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/" className="text-xl mx-2">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-xl mx-2 ">
                  About
                </Link>
              </li>
              <li>
                <Link to="/notesboard" className="text-xl mx-2">
                  Notes
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <button className="btn" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-neutral  sticky top-0">
        <div className="navbar neutral ">
          <div className="navbar-start ">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-xl "
              >
                <li>
                  <Link to="/" className="text-xl mx-2">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-xl mx-2">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <a
              href="#"
              className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="w-8 h-8 " src={icon} alt="logo" />
              INoteBook
            </a>
          </div>
          <div className="navbar-center hidden lg:flex text-xl ">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/" className="text-xl mx-2">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-xl mx-2 ">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <Link className="btn m-2" to="/login">
              Sign in
            </Link>
            <Link className="btn" to="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
