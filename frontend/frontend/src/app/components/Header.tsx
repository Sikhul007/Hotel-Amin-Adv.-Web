// app/components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link"; // Ensure Link is imported
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";

// useRouter is imported but not strictly needed for basic Link components.
// It would be needed if you were programmatically navigating, e.g., on a button click
// that doesn't correspond directly to an existing Link href.
import { useRouter } from "next/navigation"; // Keep this if you use it elsewhere, but it's not the issue here.

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Accommodation", href: "/all-rooms" },
  { name: "Restaurants", href: "/restaurant" },
  { name: "Offers", href: "/offers" },
  { name: "Gallery", href: "/gallery" },
  { name: "About-Us", href: "/about-us" },
];

const Header: React.FC = () => {
  const router = useRouter(); // Still here if needed for other programmatic navigation
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    // Main header container: Absolute position, full width, transparent with blur
    <header className="absolute top-0 left-0 w-full z-50 text-white bg-black/30 backdrop-blur-md transition-all duration-300">
      {/* Desktop & Mobile Top Bar */}
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.png" // Ensure this is a transparent PNG for best results
            alt="Hotel Amin International Logo"
            width={120} // Adjust size as needed for optimal display
            height={120}
            className="h-auto w-auto object-contain"
            priority // Prioritize loading for LCP
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-grow justify-center space-x-8 text-lg font-medium">
          {navLinks.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href} // This will correctly point to /restaurant
              className={`relative py-1 group transition-colors duration-200 ${
                pathname === link.href
                  ? "text-yellow-400 font-semibold"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {link.name}
              {/* Underline effect */}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${
                  pathname === link.href ? "scale-x-100" : ""
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions (Right Side) */}
        <div className="hidden md:flex items-center space-x-6">
          <FaShoppingCart className="text-xl cursor-pointer hover:text-yellow-400 transition-colors duration-200" />

          {/* Desktop Sign In Button - Linked to /auth */}
          <Link href="/auth" passHref legacyBehavior>
            <button className="bg-yellow-500 text-white text-base font-semibold px-5 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300 shadow-md">
              Sign In
            </button>
          </Link>

          {/* Language Dropdown */}
          <div className="relative group">
            <select className="bg-white/20 text-white text-sm pl-3 pr-8 py-2 rounded-full appearance-none focus:outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer transition-colors duration-200 hover:bg-white/30">
              <option value="English" className="bg-gray-800 text-white">
                English
              </option>
              <option value="বাংলা" className="bg-gray-800 text-white">
                বাংলা
              </option>
              <option value="Arabic" className="bg-gray-800 text-white">
                Arabic
              </option>
            </select>
            <IoGlobeOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
          </div>

          {/* Theme Toggle (Simplified for cleaner look) */}
          <label className="flex cursor-pointer items-center space-x-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-sun hover:text-yellow-400 transition-colors duration-200"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <input type="checkbox" className="hidden" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-moon hover:text-yellow-400 transition-colors duration-200"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-3xl focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg flex flex-col items-center py-8 space-y-6 shadow-lg z-40 animate-fade-in-down">
          {/* Nav Links */}
          {navLinks.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-xl font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "text-yellow-400 font-bold"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Actions */}
          <div className="flex flex-col items-center space-y-4 pt-4 border-t border-gray-700 w-full px-4">
            <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-yellow-400 transition-colors duration-200" />

            {/* Mobile Sign In Button - Linked to /auth */}
            <Link href="/auth" passHref legacyBehavior>
              <button className="bg-yellow-500 text-white text-base font-semibold px-6 py-2 rounded-full w-full max-w-xs hover:bg-yellow-600 transition-colors duration-300 shadow-md">
                Sign In
              </button>
            </Link>

            {/* Language Dropdown */}
            <div className="relative group w-full max-w-xs">
              <select className="bg-white/20 text-white text-base pl-4 pr-10 py-3 rounded-full appearance-none focus:outline-none focus:ring-1 focus:ring-yellow-400 cursor-pointer w-full transition-colors duration-200 hover:bg-white/30">
                <option value="English" className="bg-gray-800 text-white">
                  English
                </option>
                <option value="বাংলা" className="bg-gray-800 text-white">
                  বাংলা
                </option>
                <option value="Arabic" className="bg-gray-800 text-white">
                  Arabic
                </option>
              </select>
              <IoGlobeOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-xl pointer-events-none" />
            </div>

            {/* Theme Toggle */}
            <label className="flex cursor-pointer items-center space-x-3 text-white text-lg mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-sun hover:text-yellow-400 transition-colors duration-200"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <input type="checkbox" className="hidden" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-moon hover:text-yellow-400 transition-colors duration-200"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
