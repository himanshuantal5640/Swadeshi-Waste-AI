
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Leaf, UserCircle } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return unsubscribe;
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-50 shadow backdrop-blur-lg transition-colors duration-300
        ${theme === "dark" ? "bg-[#061515]/90 border-b border-green-900" : "bg-white/90 border-b border-gray-300"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LEFT — LOGO */}
        <Link
          to="/"
          className={`text-2xl font-extrabold tracking-wide flex gap-2
            ${theme === "dark" ? "text-green-400" : "text-green-700"}
          `}
        >
          <Leaf className="w-7 h-7 text-green-500" />
          EcoVision
        </Link>

        {/* NAV LINKS */}
        <ul className="hidden md:flex gap-10 font-medium text-primary dark:text-dark-primary">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/waste-to-value">WasteToValue</Link></li>
          <li><Link to="/chat">EcoChat</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {/* THEME BUTTON */}
          <button onClick={toggleTheme} className="p-2 rounded-md bg-transparent cursor-pointer">
            {theme === "dark" ? (
              <Sun className="w-6 h-6 text-yellow-300" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* PROFILE / LOGIN SWITCH */}
          {user ? (
            <Link to="/profile">
              <UserCircle
                className={`w-9 h-9 cursor-pointer ${
                  theme === "dark"
                    ? "text-green-300 hover:text-green-400"
                    : "text-green-700 hover:text-green-900"
                }`}
              />
            </Link>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className={`text-base cursor-pointer ${
                theme === "dark" ? "text-green-100 hover:text-green-300" : "text-gray-700 hover:text-green-700"
              }`}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
