// app/components/Footer.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa"; // Import social and contact icons
import { IoGlobeOutline } from "react-icons/io5"; // Already using this for language

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C1F34] text-gray-300 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative z-40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
        {/* Column 1: Hotel Info & Social */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/">
            <Image
              src="/images/logo.png" // Consider a white/transparent version of your logo for dark backgrounds
              alt="Hotel Amin International Logo"
              width={180} // Adjust size for footer
              height={180}
              className="object-contain h-auto w-auto mb-4"
            />
          </Link>
          <p className="text-sm leading-relaxed mb-4">
            Experience unparalleled comfort and luxury at Hotel Amin
            International. Your perfect getaway awaits in the heart of Cox's
            Bazar.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
            >
              <FaFacebookF className="text-2xl" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
            >
              <FaTwitter className="text-2xl" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
            >
              <FaInstagram className="text-2xl" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
            >
              <FaLinkedinIn className="text-2xl" />
            </Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-5">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/accommodation"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Accommodation
              </Link>
            </li>
            <li>
              <Link
                href="/restaurants"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Restaurants
              </Link>
            </li>
            <li>
              <Link
                href="/offers"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Special Offers
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-5">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-center md:justify-start gap-3">
              <FaMapMarkerAlt className="text-yellow-400 text-xl flex-shrink-0" />
              <span>
                123 Hotel Avenue, Sea Beach Road,
                <br /> Cox's Bazar 4700, Bangladesh
              </span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <FaPhoneAlt className="text-yellow-400 text-xl flex-shrink-0" />
              <span>+880 123 456 7890</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <FaEnvelope className="text-yellow-400 text-xl flex-shrink-0" />
              <span>info@hotelamin.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <IoGlobeOutline className="text-yellow-400 text-xl flex-shrink-0" />
              <span>www.hotelamin.com</span>
            </li>
          </ul>
        </div>

        {/* Column 4: We Accept & Newsletter (Example) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-5">
            Payment Partners
          </h3>
          <p className="mb-4 text-sm">
            We accept major payment methods for your convenience:
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
            <Link
              href="#"
              className="flex items-center justify-center h-12 w-24 bg-white rounded-md p-2 shadow-lg transition-transform hover:scale-105"
            >
              <Image
                src="/images/bkash.png"
                alt="bkash"
                width={80}
                height={40}
                className="object-contain"
              />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center h-12 w-24 bg-white rounded-md p-2 shadow-lg transition-transform hover:scale-105"
            >
              <Image
                src="/images/nagad.png"
                alt="Nagad"
                width={80}
                height={40}
                className="object-contain"
              />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center h-12 w-24 bg-white rounded-md p-2 shadow-lg transition-transform hover:scale-105"
            >
              <Image
                src="/images/city-bank.png"
                alt="City Bank"
                width={80}
                height={40}
                className="object-contain"
              />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center h-12 w-24 bg-white rounded-md p-2 shadow-lg transition-transform hover:scale-105"
            >
              <Image
                src="/images/visa-card.png"
                alt="Visa Card"
                width={80}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Optional: Newsletter Signup */}
          <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
          <p className="mb-3 text-sm">
            Stay updated with our latest offers and news.
          </p>
          <div className="w-full">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-3"
            />
            <button className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 shadow-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} Hotel Amin International. All rights
          reserved.
        </p>
        <p className="mt-1">Designed by SHIHAB, MARISHAT , NAFIS.</p>
      </div>
    </footer>
  );
};

export default Footer;
