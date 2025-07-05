// app/offers/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const OffersPage: React.FC = () => {
  const router = useRouter();

  const primaryDark = "#0C1F34";
  const accentYellow = "#F59E0B";
  const offerGreen = "#10B981";

  const handleBookNow = () => {
    router.push(`/#check-availability-section`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 py-20 text-white text-center shadow-lg">
        <div className="absolute inset-0 opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Exclusive <span className="text-yellow-400">Festival Offers</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 font-light max-w-2xl mx-auto">
            Celebrate with us and enjoy special discounts on your next stay!
            Limited time deals for the festive season.
          </p>
        </div>
      </div>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[#0C1F34]">
          Our Current <span style={{ color: accentYellow }}>Discounts</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* 20% Offer Card */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-100">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center bg-blue-100 rounded-full w-24 h-24 mx-auto mb-6 border-4 border-blue-300">
                <span className="text-4xl font-extrabold text-blue-700">
                  20%
                </span>
              </div>
              <h3
                className="text-2xl font-bold text-center mb-3"
                style={{ color: primaryDark }}
              >
                Amazing Festival Discount
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Get 20% off on all room types during the festive period. Perfect
                for a relaxing getaway with loved ones.
              </p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-2 mb-6">
                <li>Valid for stays between 10/7/2025 and 18/7/2025</li>
                <li>Applicable on direct bookings</li>
                <li>Limited rooms available</li>
              </ul>
              <div className="text-center">
                <button
                  onClick={() => handleBookNow()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
            <div className="bg-blue-600 text-white text-center py-3 text-sm font-medium">
              Use Code: FESTIVAL20
            </div>
          </div>

          {/* 25% Offer Card */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-100">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center bg-green-100 rounded-full w-24 h-24 mx-auto mb-6 border-4 border-green-300">
                <span className="text-4xl font-extrabold text-green-700">
                  25%
                </span>
              </div>
              <h3
                className="text-2xl font-bold text-center mb-3"
                style={{ color: primaryDark }}
              >
                Grand Celebration Offer
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Enjoy an even bigger 25% discount for longer stays or specific
                premium room categories during our special festival.
              </p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-2 mb-6">
                <li>Minimum stay of 2 nights required</li>
                <li>Valid for Deluxe and Suite rooms</li>
                <li>Book before 5/7/2025</li>
              </ul>
              <div className="text-center">
                <button
                  onClick={() => handleBookNow()}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-colors duration-300"
                >
                  Claim Offer
                </button>
              </div>
            </div>
            <div className="bg-green-600 text-white text-center py-3 text-sm font-medium">
              Use Code: FESTIVAL25
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffersPage;
