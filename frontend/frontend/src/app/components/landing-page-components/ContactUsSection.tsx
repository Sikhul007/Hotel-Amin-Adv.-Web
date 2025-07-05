// app/components/ContactUsSectionNew.tsx (or ContactUsSection.tsx if you renamed it)
"use client";

import React from "react";
import Link from "next/link";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"; // These are indeed brand icons
import {
  faEnvelope, // <--- Corrected: Import faEnvelope from solid icons
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; // Import solid icons library as well

// Add needed icons to the library
// Ensure faEnvelope is added from the solid set
library.add(fas, faFacebookF, faInstagram, faWhatsapp, faYoutube, faEnvelope);

const ContactUsSection: React.FC = () => {
  // Keeping the name as ContactUsSection based on your snippet
  return (
    <div className="w-full bg-[#F5F3E9]  py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 text-center">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1F34] mb-2">
        CONTACT <span className="text-yellow-500">US</span>
      </h2>
      <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8"></div>{" "}
      {/* Underline */}
      <p className="text-gray-700 mb-10 text-base sm:text-lg max-w-3xl mx-auto">
        Feel free to reach us for any queries. We will respond even if we are
        fully booked.
      </p>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 text-left md:text-center">
        {/* HOTEL ADDRESS */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0C1F34] mb-4">
            HOTEL ADDRESS
          </h3>
          <p className="text-gray-700 leading-relaxed text-base">
            Hotel Amin International
            <br />
            28-29, Hotel Motel Zone, Kolatoli,
            <br />
            Cox's Bazar, Bangladesh.
          </p>
          <p className="text-gray-700 leading-relaxed text-base mt-4">
            Hotel Number: +88-09619 675 675
            <br />
            Reservation Hotline: 01938846761-5
          </p>
        </div>

        {/* JOIN US WITH */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0C1F34] mb-4">
            JOIN US WITH
          </h3>
          <ul className="flex justify-center space-x-6 md:space-x-8 mt-4">
            <li>
              <Link
                href="#"
                aria-label="Facebook"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                aria-label="Instagram"
                className="text-gray-700 hover:text-pink-600 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                aria-label="WhatsApp"
                className="text-gray-700 hover:text-green-500 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                aria-label="YouTube"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                aria-label="Email"
                className="text-gray-700 hover:text-blue-400 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faEnvelope} // This is now correctly imported
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
