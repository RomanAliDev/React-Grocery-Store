import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import logo from "../assets/logo.png";
import { IoCartOutline } from "react-icons/io5";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import api from "../../Api/Service";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const isActive = (path) => location.pathname === path;

  const loadCartCount = async () => {
    try {
      if (!userId) return;

      const res = await api.get(`/cart/${userId}`);

      const count =
        res.data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

      setCartCount(count);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadCartCount();

    const handleCartUpdate = () => {
      loadCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);
  const linkClass = (path) =>
    `relative px-2 py-1 transition ${
      isActive(path)
        ? "text-green-600 font-bold after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-green-500"
        : "text-gray-700 hover:text-green-600"
    }`;
  return (
    <div>
      {/* NAVBAR */}
      <div className="w-full flex justify-around items-center py-4 bg-white shadow-md fixed top-0 left-0 z-20">
        {/* LOGO */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-52" />
        </Link>

        {/* DESKTOP MENU */}
        <nav>
          <ul className="hidden md:flex gap-8 text-lg items-center">
            <li>
              <Link className={linkClass("/")} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={linkClass("/shop")} to="/shop">
                Shop
              </Link>
            </li>
            <li>
              <Link className={linkClass("/about")} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className={linkClass("/contact")} to="/contact">
                Contact
              </Link>
            </li>

            {!userId ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="px-4 py-1 border border-green-500 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition">
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/signup"
                    className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                  className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* CART */}
        <Link to="/cart" className="relative cursor-pointer">
          <IoCartOutline className="text-3xl text-gray-700" />
          <sup className="bg-green-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs absolute -top-2 -right-2">
            {cartCount}
          </sup>
        </Link>

        {/* MOBILE ICON */}
        <div className="md:hidden text-3xl">
          {isNavOpen ? (
            <HiMenuAlt3 onClick={() => setIsNavOpen(false)} />
          ) : (
            <HiMenuAlt1 onClick={() => setIsNavOpen(true)} />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isNavOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-30 p-6 flex flex-col gap-6 text-lg">
          <Link onClick={() => setIsNavOpen(false)} to="/">
            Home
          </Link>
          <Link onClick={() => setIsNavOpen(false)} to="/shop">
            Shop
          </Link>
          <Link onClick={() => setIsNavOpen(false)} to="/about">
            About
          </Link>
          <Link onClick={() => setIsNavOpen(false)} to="/contact">
            Contact
          </Link>

          <div className="mt-auto flex">
            <Link
              to="/login"
              className="w-1/2 text-center py-3 border-t border-green-500 text-green-600 font-bold"
              onClick={() => setIsNavOpen(false)}>
              Login
            </Link>

            <Link
              to="/signup"
              className="w-1/2 text-center py-3 bg-green-600 text-white font-bold"
              onClick={() => setIsNavOpen(false)}>
              Signup
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
