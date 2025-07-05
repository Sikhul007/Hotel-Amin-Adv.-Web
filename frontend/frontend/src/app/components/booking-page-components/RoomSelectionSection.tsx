// app/components/RoomSelectionSection.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import axios
import BookingProgressBar from "./BookingProgressBar"; // Correct path for BookingProgressBar

// Interface for backend room data (remains the same as it correctly reflects your API output)
interface BackendRoom {
  room_num: number;
  floor: number;
  capacity: number; // Max guests for this room type
  type: string; // e.g., "single", "suite", "deluxe"
  description: string;
  room_price: string; // String as per your JSON
  discount: string;
  room_status: string; // This is the key for availability: "AVAILABLE" or "OCCUPIED"
  housekeeping_status: string;
}

// Props for dynamic data (from previous booking step)
interface RoomSelectionSectionProps {
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
  children?: number;
}

const RoomSelectionSection: React.FC<RoomSelectionSectionProps> = ({
  checkInDate,
  checkOutDate,
  adults = 1,
  children = 0,
}) => {
  const router = useRouter();

  // Now, this state will hold the rooms fetched from the 'available-rooms' endpoint
  const [roomsWithAvailability, setRoomsWithAvailability] = useState<
    BackendRoom[]
  >([]);
  const [loading, setLoading] = useState(false); // Single loading state for the main fetch
  const [error, setError] = useState<string | null>(null);

  // Fetch rooms with availability based on dates
  useEffect(() => {
    const fetchAvailableRooms = async () => {
      if (!checkInDate || !checkOutDate) {
        setError(
          "Please select valid check-in and check-out dates to see room availability."
        );
        setRoomsWithAvailability([]);
        return;
      }

      try {
        setLoading(true);
        setError(null); // Clear previous errors

        const response = await axios.post<BackendRoom[]>(
          "http://localhost:3000/booking/available-rooms", // Correct POST endpoint
          {
            checkin_date: checkInDate,
            checkout_date: checkOutDate,
          }
        );
        // The API directly returns the rooms with their status
        setRoomsWithAvailability(response.data);
      } catch (err) {
        console.error("Failed to fetch available rooms:", err);
        setError(
          "Failed to load room availability. Please ensure dates are valid and try again."
        );
        setRoomsWithAvailability([]); // Clear rooms on error
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableRooms();
  }, [checkInDate, checkOutDate]); // Re-run when check-in or check-out date changes

  // Function to calculate nights
  const calculateNights = (
    start: string | undefined,
    end: string | undefined
  ): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights(checkInDate, checkOutDate);

  // Format dates for display
  const formatDisplayDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    const dateParts = dateString.split("-"); // YYYY-MM-DD
    const dateObj = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2])
    );

    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = String(dateObj.getFullYear()).slice(-2); // e.g., 25 for 2025
    return `${day}/${month}/${year}`;
  };

  const displayCheckInDate = formatDisplayDate(checkInDate);
  const displayCheckOutDate = formatDisplayDate(checkOutDate);

  // When a room is selected, navigate to the room details page
  const handleSelectRoom = (roomNum: number) => {
    // We are no longer checking room_status here, assuming all are "available" for selection
    const selectedRoom = roomsWithAvailability.find(
      (room) => room.room_num === roomNum
    );

    // Still ensure a room was found and dates are selected
    if (!selectedRoom) {
      alert("Selected room not found.");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      alert("Please ensure valid check-in and check-out dates are selected.");
      return;
    }

    router.push(
      `/booking-review?roomNum=${roomNum}&checkIn=${checkInDate}&checkOut=${checkOutDate}&adults=${adults}&children=${children}`
    );
  };

  const handleChangeDates = () => {
    router.push("/"); // Redirects to the homepage where the booking form is
  };

  return (
    <div className="min-h-screen bg-[#F5F3E9] py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Status Bar - Now using the reusable component */}
        <BookingProgressBar currentStepIndex={1} /> {/* 'Rooms' is index 1 */}
        {/* Booking Summary Bar */}
        <div className="bg-[#1A314A] rounded-xl p-4 sm:p-6 mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center text-white text-sm sm:text-base md:text-lg font-semibold">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4 md:mb-0">
            <span>Check-in {displayCheckInDate}</span>
            <span>Check-out {displayCheckOutDate}</span>
            <span>Nights {nights}</span>
            <span>Adults {adults}</span>
            {children > 0 && <span>Children {children}</span>}
          </div>
          <button
            onClick={handleChangeDates}
            className="bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white px-6 py-2 rounded-lg font-bold"
          >
            Change Dates
          </button>
        </div>
        {/* Loading and Error States */}
        {loading && (
          <div className="text-center text-lg text-[#0C1F34] py-8">
            Checking room availability...
          </div>
        )}
        {error && (
          <div className="text-center text-lg text-red-600 py-8">
            Error: {error}
          </div>
        )}
        {/* Room Listings */}
        {!loading && !error && roomsWithAvailability.length === 0 && (
          <div className="text-center text-lg text-[#0C1F34] py-8">
            No rooms found for the selected dates.
          </div>
        )}
        {!loading && !error && roomsWithAvailability.length > 0 && (
          <div className="space-y-6">
            {roomsWithAvailability.map((room) => {
              // FORCING isAvailable TO TRUE as per request
              const isAvailable = true;

              // Button styles are now always for an available room
              const buttonBgClass = "bg-yellow-500 hover:bg-yellow-600";
              const buttonTextColor = "text-[#0C1F34]";

              return (
                <div
                  key={room.room_num}
                  className="bg-[#1A314A] rounded-xl overflow-hidden shadow-lg flex flex-col sm:flex-row items-stretch border border-gray-700"
                >
                  {/* Room Image */}
                  <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0">
                    {/* Assuming a generic image, replace if your backend provides one */}
                    <Image
                      src="/images/room-hero.png"
                      alt={room.type}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    {/* REMOVED Availability Overlay here */}
                  </div>
                  {/* Room Details */}
                  <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between text-white">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-yellow-400 capitalize">
                        {room.type} (Room {room.room_num})
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                        {room.description}
                      </p>
                      <p className="text-gray-300 text-sm">
                        Capacity: {room.capacity}{" "}
                        {room.capacity > 1 ? "guests" : "guest"}
                      </p>
                    </div>
                    {/* Price and Select Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 pt-4 border-t border-gray-600">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-0">
                        ৳ {parseFloat(room.room_price).toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleSelectRoom(room.room_num)}
                        className={`px-8 py-3 rounded-lg font-bold text-lg uppercase shadow-md transition-colors duration-200 ${buttonBgClass} ${buttonTextColor}`}
                        disabled={false} // Always enabled
                      >
                        Select Room {/* Always show "Select Room" */}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomSelectionSection;
