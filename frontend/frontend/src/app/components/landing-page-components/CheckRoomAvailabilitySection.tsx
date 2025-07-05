// app/components/CheckRoomAvailabilitySection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CheckRoomAvailabilitySection: React.FC = () => {
  const router = useRouter();

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Get tomorrow's date in YYYY-MM-DD format
  const getTomorrowDate = (dateString: string) => {
    const today = new Date(dateString);
    today.setDate(today.getDate() + 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();
  const initialCheckIn = today;
  const initialCheckOut = getTomorrowDate(initialCheckIn);

  const [checkInDate, setCheckInDate] = useState<string>(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState<string>(initialCheckOut);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  // Update check-out date if check-in date changes and makes check-out invalid
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const inDate = new Date(checkInDate);
      const outDate = new Date(checkOutDate);

      // If check-out is on or before check-in, set check-out to next day
      if (outDate <= inDate) {
        setCheckOutDate(getTomorrowDate(checkInDate));
      }
    }
  }, [checkInDate]);

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckInDate(newCheckIn);
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOut = e.target.value;
    setCheckOutDate(newCheckOut);
  };

  const handleAdultsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setAdults(value);
    } else if (e.target.value === "") {
      setAdults(0);
    }
  };

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setChildren(value);
    } else if (e.target.value === "") {
      setChildren(0);
    }
  };

  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);

    if (inDate >= outDate) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    if (adults < 1) {
      alert("At least 1 adult is required.");
      setAdults(1); // Reset to 1 if it's somehow 0
      return;
    }

    // Navigate to /rooms with query parameters
    router.push(
      `/rooms?checkIn=${checkInDate}&checkOut=${checkOutDate}&adults=${adults}&children=${children}`
    );
  };

  return (
    <div className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 text-center">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1F34] mb-2">
        CHECK <span className="text-yellow-500">ROOM AVAILABILITY</span>
      </h2>
      <div className="w-20 h-1 bg-yellow-500 mx-auto mb-10"></div>{" "}
      {/* Underline */}
      {/* Booking Form */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 p-6 bg-[#0C1F34] rounded-lg shadow-xl text-white">
        {/* CHECK IN */}
        <div className="flex flex-col items-start w-full md:w-auto flex-1">
          <label
            htmlFor="check-in-date-avail"
            className="text-xs sm:text-sm font-semibold mb-1 text-gray-300"
          >
            CHECK IN DATE
          </label>
          <div className="relative w-full">
            <input
              type="date"
              id="check-in-date-avail"
              value={checkInDate}
              onChange={handleCheckInChange}
              min={today} // Restrict past dates
              className="bg-white text-black px-4 py-2 pr-10 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none"
            />
            <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* CHECK OUT */}
        <div className="flex flex-col items-start w-full md:w-auto flex-1">
          <label
            htmlFor="check-out-date-avail"
            className="text-xs sm:text-sm font-semibold mb-1 text-gray-300"
          >
            CHECK OUT DATE
          </label>
          <div className="relative w-full">
            <input
              type="date"
              id="check-out-date-avail"
              value={checkOutDate}
              onChange={handleCheckOutChange}
              min={getTomorrowDate(checkInDate)} // Check-out must be after check-in
              className="bg-white text-black px-4 py-2 pr-10 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none"
            />
            <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* GUESTS - Adults */}
        <div className="flex flex-col items-start w-full md:w-auto flex-1">
          <label
            htmlFor="adults-avail"
            className="text-xs sm:text-sm font-semibold mb-1 text-gray-300"
          >
            ADULTS
          </label>
          <input
            type="number"
            id="adults-avail"
            value={adults}
            onChange={handleAdultsChange}
            min="1" // At least 1 adult
            className="bg-white text-black px-4 py-2 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>


        {/* BOOK NOW */}
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <label className="text-xs sm:text-sm font-semibold mb-1 invisible">
            Book
          </label>
          <button
            onClick={handleBookNow}
            className="bg-green-600 text-white font-bold px-8 py-2 rounded-md shadow-md w-full hover:bg-green-700 transition-colors text-lg"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckRoomAvailabilitySection;
