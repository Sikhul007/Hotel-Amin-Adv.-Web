"use client";

import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
  const router = useRouter();

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTomorrowDate = (dateString: string) => {
    const today = new Date(dateString);
    today.setDate(today.getDate() + 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  useEffect(() => {
    const today = getTodayDate();
    const tomorrow = getTomorrowDate(today);
    setCheckInDate(today);
    setCheckOutDate(tomorrow);
  }, []);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const inDate = new Date(checkInDate);
      const outDate = new Date(checkOutDate);
      if (outDate <= inDate) {
        setCheckOutDate(getTomorrowDate(checkInDate));
      }
    }
  }, [checkInDate]);

  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate) return;

    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    if (inDate >= outDate) {
      alert("Check-out must be after check-in.");
      return;
    }

    if (adults < 1) {
      alert("At least one adult required.");
      setAdults(1);
      return;
    }

    router.push(
      `/rooms?checkIn=${checkInDate}&checkOut=${checkOutDate}&adults=${adults}&children=${children}`
    );
  };

  // 👇 Guard until dates are initialized (optional fallback)
  if (!checkInDate || !checkOutDate) return null;

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/hotel-hero-video.mp4"
        autoPlay
        loop
        muted={true}
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      <div className="relative z-20 text-white px-4 text-center max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase mb-12 leading-tight drop-shadow-xl">
          WELCOME TO
          <span className="text-yellow-400 block">
            HOTEL AMIN INTERNATIONAL
          </span>
        </h1>

        {/* Booking Form */}
        <div
          className="rounded-lg shadow-xl p-6 flex flex-col md:flex-row gap-4 justify-center items-center text-white"
          style={{ backgroundColor: "rgba(12, 31, 52, 0.5)" }} // 0.5 opacity
        >
          {/* Check-in */}
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-sm font-semibold text-gray-300 mb-1">
              CHECK IN DATE
            </label>
            <div className="relative">
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                min={checkInDate}
                className="bg-white text-black px-4 py-2 rounded-md w-full pr-10"
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-sm font-semibold text-gray-300 mb-1">
              CHECK OUT DATE
            </label>
            <div className="relative">
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={getTomorrowDate(checkInDate)}
                className="bg-white text-black px-4 py-2 rounded-md w-full pr-10"
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Adults */}
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-sm font-semibold text-gray-300 mb-1">
              ADULTS
            </label>
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value))}
              min={1}
              className="bg-white text-black px-4 py-2 rounded-md w-full"
            />
          </div>

          {/* Book Now */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <button
              onClick={handleBookNow}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md text-lg shadow-md w-full mt-5"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
