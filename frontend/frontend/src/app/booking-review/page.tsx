// // app/booking-review/page.tsx
// "use client";

// import React, { useEffect, useState, useMemo } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import axios from "axios";
// import Image from "next/image";
// import {
//   FaUserFriends,
//   FaBed,
//   FaCalendarAlt,
//   FaMoneyBillWave,
//   FaArrowRight,
// } from "react-icons/fa";
// import BookingProgressBar from "@/app/components/booking-page-components/BookingProgressBar"; // Adjust path as needed
// import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

// // Interface for BackendRoom data (matching your API response)
// interface RoomDetail {
//   room_num: number;
//   floor: number;
//   capacity: number;
//   type: string;
//   description: string;
//   room_price: string; // String from API
//   discount: string; // String from API
//   room_status: string;
//   housekeeping_status?: string;
// }

// // Interface for JWT Payload (assuming user_id is in it)
// interface JwtPayload {
//   user_id: number;
//   email: string;
//   // Add other properties that might be in your JWT payload
//   [key: string]: any;
// }

// const BookingReviewPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // Extract parameters from the URL
//   const roomNum = searchParams.get("roomNum");
//   const checkInDateStr = searchParams.get("checkIn");
//   const checkOutDateStr = searchParams.get("checkOut");
//   const adults = parseInt(searchParams.get("adults") || "1");
//   const children = parseInt(searchParams.get("children") || "0");
//   const numberOfGuests = adults + children; // Combined guests

//   const [roomDetails, setRoomDetails] = useState<RoomDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isConfirming, setIsConfirming] = useState(false); // New state for confirm button loading

//   // --- Data Fetching: Get detailed room info based on roomNum ---
//   useEffect(() => {
//     if (!roomNum || !checkInDateStr || !checkOutDateStr) {
//       setError(
//         "Missing booking information. Please go back and select a room and dates."
//       );
//       setLoading(false);
//       return;
//     }

//     const fetchRoomDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get<RoomDetail>(
//           `http://localhost:3000/rooms/search-by-room-num/${roomNum}`
//         );
//         setRoomDetails(response.data);
//       } catch (err) {
//         console.error("Failed to fetch room details for booking review:", err);
//         setError(
//           "Could not load room details for your booking. Please try again or select another room."
//         );
//         setRoomDetails(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoomDetails();
//   }, [roomNum, checkInDateStr, checkOutDateStr]);

//   // --- Calculations for Nights, Prices, and Total Amount ---
//   const {
//     nights,
//     roomPricePerNight,
//     discountAmountPerNight,
//     discountedPricePerNight,
//     totalAmount,
//   } = useMemo(() => {
//     const startDate = checkInDateStr ? new Date(checkInDateStr) : null;
//     const endDate = checkOutDateStr ? new Date(checkOutDateStr) : null;

//     let calculatedNights = 0;
//     if (startDate && endDate && endDate > startDate) {
//       const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
//       calculatedNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     }

//     const basePrice = roomDetails ? parseFloat(roomDetails.room_price) : 0;
//     const discountPercentage = roomDetails
//       ? parseFloat(roomDetails.discount)
//       : 0;

//     const calculatedDiscountAmountPerNight =
//       basePrice * (discountPercentage / 100);
//     const calculatedDiscountedPricePerNight =
//       basePrice - calculatedDiscountAmountPerNight;
//     const calculatedTotalAmount =
//       calculatedDiscountedPricePerNight * calculatedNights;

//     return {
//       nights: calculatedNights,
//       roomPricePerNight: basePrice,
//       discountAmountPerNight: calculatedDiscountAmountPerNight,
//       discountedPricePerNight: calculatedDiscountedPricePerNight,
//       totalAmount: calculatedTotalAmount,
//     };
//   }, [roomDetails, checkInDateStr, checkOutDateStr]);

//   // --- Format dates for display ---
//   const formatDisplayDate = (dateString: string | null): string => {
//     if (!dateString) return "N/A";
//     try {
//       const dateObj = new Date(dateString + "T00:00:00"); // Add T00:00:00 to ensure UTC interpretation
//       const options: Intl.DateTimeFormatOptions = {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       };
//       return dateObj.toLocaleDateString("en-GB", options);
//     } catch (e) {
//       return dateString;
//     }
//   };

//   const displayCheckInDate = formatDisplayDate(checkInDateStr);
//   const displayCheckOutDate = formatDisplayDate(checkOutDateStr);

//   // --- Handle "Confirm Booking" ---
//   const handleConfirmBooking = async () => {
//     if (isConfirming) return; // Prevent double submission

//     if (
//       !roomDetails ||
//       totalAmount <= 0 ||
//       !checkInDateStr ||
//       !checkOutDateStr
//     ) {
//       alert(
//         "Cannot confirm booking. Please ensure all details (room, dates, total amount) are correct."
//       );
//       return;
//     }

//     // 1. Check if user is logged in (by checking for JWT)
//     const token = localStorage.getItem("token"); // Assuming 'token' is the key you used for JWT
//     if (!token) {
//       alert("You must be logged in to confirm a booking. Please sign in.");
//       // Optionally, redirect to login page: router.push('/auth');
//       return;
//     }

//     let userId: number | null = null;
//     try {
//       const decodedToken = jwtDecode<JwtPayload>(token);
//       userId = decodedToken.user_id;
//       if (!userId) {
//         alert("Could not retrieve user ID from token. Please log in again.");
//         localStorage.removeItem("token"); // Clear invalid token
//         return;
//       }
//     } catch (decodeError) {
//       console.error("Error decoding JWT:", decodeError);
//       alert("Your session has expired or is invalid. Please log in again.");
//       localStorage.removeItem("token"); // Clear invalid token
//       return;
//     }

//     setIsConfirming(true);
//     setError(null); // Clear any previous errors

//     try {
//       // 2. Prepare payload for the backend booking endpoint
//       const bookingPayload = {
//         checkin_date: checkInDateStr,
//         checkout_date: checkOutDateStr,
//         number_of_guests: numberOfGuests,
//         room_num: [roomDetails.room_num], // Assuming single room booking, wrap in array as per example
//         total_price: totalAmount,
//         booking_date: new Date().toISOString(), // Current timestamp for booking
//         typeOfBooking: "website",
//         user_id: userId,
//       };

//       // 3. Make the POST request to your backend to create the reservation
//       const response = await axios.post(
//         "http://localhost:3000/booking/create-reservation", // HYPOTHETICAL NEW BACKEND ENDPOINT
//         bookingPayload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Send the token with the request
//           },
//         }
//       );

//       const responseData = response.data;

//       if (response.status === 200 || response.status === 201) {
//         // 200 OK or 201 Created
//         alert("Booking confirmed successfully!");
//         // 4. Redirect to confirmation page with reservation ID
//         router.push(
//           `/booking-confirmation?reservationId=${responseData.reservation_id}`
//         );
//       } else {
//         // Handle non-2xx responses from backend
//         setError(`Booking failed: ${responseData.message || "Unknown error"}`);
//         alert(`Booking failed: ${responseData.message || "Unknown error"}`);
//       }
//     } catch (err) {
//       console.error("Booking confirmation failed:", err);
//       if (axios.isAxiosError(err) && err.response) {
//         // Backend returned an error response
//         setError(
//           `Booking failed: ${
//             err.response.data.message || "Server responded with an error."
//           }`
//         );
//         alert(
//           `Booking failed: ${
//             err.response.data.message || "Server responded with an error."
//           }`
//         );
//       } else {
//         // Network or other unexpected error
//         setError("Network error or unexpected issue. Please try again.");
//         alert("Network error or unexpected issue. Please try again.");
//       }
//     } finally {
//       setIsConfirming(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 text-lg text-gray-700">
//         <p>Loading booking details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
//         <p className="text-red-700 text-lg mb-4 text-center">Error: {error}</p>
//         <button
//           onClick={() => router.push("/")}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
//         >
//           Go to Home
//         </button>
//       </div>
//     );
//   }

//   if (!roomDetails) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700 text-lg">
//         <p>No room details found for this booking.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F3E9] py-8 sm:py-12 md:py-16">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Progress Bar */}
//         <BookingProgressBar currentStepIndex={2} />

//         <h1 className="text-3xl sm:text-4xl font-bold text-[#0C1F34] text-center mb-8">
//           Review Your <span className="text-yellow-500">Booking</span>
//         </h1>

//         <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
//           {/* Booking Summary Section */}
//           <div className="lg:w-2/3 p-6 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-gray-200">
//             <h2 className="text-2xl sm:text-3xl font-bold text-[#1A314A] mb-6 flex items-center">
//               <FaCalendarAlt className="mr-3 text-yellow-500" /> Booking Summary
//             </h2>

//             {/* Room Card */}
//             <div className="flex flex-col sm:flex-row items-stretch bg-gray-50 rounded-lg shadow-sm border border-gray-200 mb-6">
//               <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0">
//                 <Image
//                   src="/images/room-hero.png" // Use a placeholder image or roomDetails.image_url if available
//                   alt={roomDetails.type}
//                   fill
//                   style={{ objectFit: "cover" }}
//                   className="rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
//                 />
//               </div>
//               <div className="p-4 flex-grow">
//                 <h3 className="text-xl font-bold text-[#0C1F34] capitalize mb-1">
//                   {roomDetails.type} Room (No. {roomDetails.room_num})
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                   {roomDetails.description}
//                 </p>
//                 <div className="flex items-center text-gray-700 text-sm">
//                   <FaUserFriends className="mr-2" /> Capacity:{" "}
//                   {roomDetails.capacity}{" "}
//                   {roomDetails.capacity > 1 ? "guests" : "guest"}
//                 </div>
//               </div>
//             </div>

//             {/* Booking Details List */}
//             <div className="text-lg text-gray-700 space-y-3 mb-8">
//               <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                 <span className="font-semibold">Check-in:</span>
//                 <span className="text-[#0C1F34]">{displayCheckInDate}</span>
//               </div>
//               <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                 <span className="font-semibold">Check-out:</span>
//                 <span className="text-[#0C1F34]">{displayCheckOutDate}</span>
//               </div>
//               <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                 <span className="font-semibold">Nights:</span>
//                 <span className="text-[#0C1F34]">{nights}</span>
//               </div>
//               <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                 <span className="font-semibold">Adults:</span>
//                 <span className="text-[#0C1F34]">{adults}</span>
//               </div>
//               {children > 0 && (
//                 <div className="flex justify-between items-center pb-2 border-b border-gray-200">
//                   <span className="font-semibold">Children:</span>
//                   <span className="text-[#0C1F34]">{children}</span>
//                 </div>
//               )}
//             </div>

//             {/* Price Breakdown */}
//             <div className="text-lg text-gray-800 space-y-2 mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//               <h3 className="text-xl font-bold text-yellow-700 mb-4">
//                 Price Breakdown
//               </h3>
//               <div className="flex justify-between items-center">
//                 <span>Room Price / Night:</span>
//                 <span className="font-bold">
//                   ৳ {roomPricePerNight.toLocaleString()}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center text-green-700">
//                 <span>Discount ({parseFloat(roomDetails.discount)}%):</span>
//                 <span className="font-bold">
//                   - ৳{" "}
//                   {discountAmountPerNight.toLocaleString(undefined, {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center border-t border-gray-300 pt-2">
//                 <span>Discounted Price / Night:</span>
//                 <span className="font-bold">
//                   ৳{" "}
//                   {discountedPricePerNight.toLocaleString(undefined, {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center text-xl font-extrabold text-blue-700 pt-4 border-t-2 border-yellow-600">
//                 <span>Total Amount:</span>
//                 <span>
//                   ৳{" "}
//                   {totalAmount.toLocaleString(undefined, {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </span>
//               </div>
//               {totalAmount <= 0 && (
//                 <p className="text-red-500 text-sm mt-2">
//                   Total amount is 0 or less. Please check dates/room price.
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Confirmation Action Section */}
//           <div className="lg:w-1/3 p-6 sm:p-8 md:p-10 bg-gray-50 flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-[#1A314A] mb-6 flex items-center">
//                 <FaArrowRight className="mr-3 text-green-600" /> Confirm Booking
//               </h2>

//               <p className="text-gray-700 mb-6">
//                 Please review your booking details. Once confirmed, your
//                 reservation will be finalized.
//               </p>

//               <p className="text-gray-600 text-sm italic mb-8">
//                 Note: This version simulates direct booking confirmation without
//                 an explicit payment gateway. Ensure a valid user session is
//                 active.
//               </p>
//             </div>

//             <button
//               onClick={handleConfirmBooking}
//               className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-8 py-4 rounded-lg shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 text-lg flex items-center justify-center gap-3"
//               disabled={
//                 loading || error !== null || totalAmount <= 0 || isConfirming // Disable while confirming
//               }
//             >
//               {isConfirming ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Confirming...
//                 </>
//               ) : (
//                 <>
//                   <span>Confirm Booking</span>
//                   <FaArrowRight className="text-base" />
//                 </>
//               )}
//             </button>

//             <p className="text-center text-gray-500 text-sm mt-4">
//               Your reservation will be finalized upon confirmation.
//             </p>
//           </div>
//         </div>

//         {/* Back to Room Selection Button */}
//         <div className="text-center mt-10">
//           <button
//             onClick={() => router.back()}
//             className="bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-full hover:bg-gray-300 transition-colors shadow-md"
//           >
//             &larr; Back to Room Selection
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingReviewPage;

// app/booking-review/page.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {
  FaUserFriends,
  FaBed,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaArrowRight,
} from "react-icons/fa";
import BookingProgressBar from "@/app/components/booking-page-components/BookingProgressBar";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

// Interface for BackendRoom data (matching your API response)
interface RoomDetail {
  room_num: number;
  floor: number;
  capacity: number;
  type: string;
  description: string;
  room_price: string; // String from API
  discount: string; // String from API
  room_status: string;
  housekeeping_status?: string;
  // Assuming there might be an image_url for the room
  image_url?: string; // Add if your room details include an image URL
}

// Interface for JWT Payload (assuming user_id is in it)
interface JwtPayload {
  user_id: number;
  email: string;
  [key: string]: any;
}

// Helper function to format dates for display
const formatDisplayDate = (dateString: string | null): string => {
  if (!dateString) return "N/A";
  try {
    // Add T00:00:00 to ensure date is parsed correctly as local day, not UTC
    const dateObj = new Date(dateString + "T00:00:00");
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return dateObj.toLocaleDateString("en-GB", options);
  } catch (e) {
    return dateString; // Return original if parsing fails
  }
};

const BookingReviewPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract parameters from the URL
  const roomNum = searchParams.get("roomNum");
  const checkInDateStr = searchParams.get("checkIn");
  const checkOutDateStr = searchParams.get("checkOut");
  const adults = parseInt(searchParams.get("adults") || "1");
  const children = parseInt(searchParams.get("children") || "0");
  const numberOfGuests = adults + children; // Combined guests

  const [roomDetails, setRoomDetails] = useState<RoomDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false); // State for confirm button loading

  // --- Data Fetching: Get detailed room info based on roomNum ---
  useEffect(() => {
    if (!roomNum || !checkInDateStr || !checkOutDateStr) {
      setError(
        "Missing booking information. Please go back and select a room and dates."
      );
      setLoading(false);
      return;
    }

    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<RoomDetail>(
          `http://localhost:3000/rooms/search-by-room-num/${roomNum}`
        );
        setRoomDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch room details for booking review:", err);
        setError(
          "Could not load room details for your booking. Please try again or select another room."
        );
        setRoomDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomNum, checkInDateStr, checkOutDateStr]);

  // --- Calculations for Nights, Prices, and Total Amount ---
  const {
    nights,
    roomPricePerNight,
    discountAmountPerNight,
    discountedPricePerNight,
    totalAmount,
  } = useMemo(() => {
    const startDate = checkInDateStr ? new Date(checkInDateStr) : null;
    const endDate = checkOutDateStr ? new Date(checkOutDateStr) : null;

    let calculatedNights = 0;
    if (startDate && endDate && endDate > startDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      calculatedNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const basePrice = roomDetails ? parseFloat(roomDetails.room_price) : 0;
    const discountPercentage = roomDetails
      ? parseFloat(roomDetails.discount)
      : 0;

    const calculatedDiscountAmountPerNight =
      basePrice * (discountPercentage / 100);
    const calculatedDiscountedPricePerNight =
      basePrice - calculatedDiscountAmountPerNight;
    const calculatedTotalAmount =
      calculatedDiscountedPricePerNight * calculatedNights;

    return {
      nights: calculatedNights,
      roomPricePerNight: basePrice,
      discountAmountPerNight: calculatedDiscountAmountPerNight,
      discountedPricePerNight: calculatedDiscountedPricePerNight,
      totalAmount: calculatedTotalAmount,
    };
  }, [roomDetails, checkInDateStr, checkOutDateStr]);

  // --- Format dates for display ---
  const displayCheckInDate = formatDisplayDate(checkInDateStr);
  const displayCheckOutDate = formatDisplayDate(checkOutDateStr);

  // --- Handle "Confirm Booking" ---
  const handleConfirmBooking = async () => {
    if (isConfirming) return; // Prevent double submission

    if (
      !roomDetails ||
      totalAmount <= 0 ||
      !checkInDateStr ||
      !checkOutDateStr
    ) {
      setError(
        "Cannot confirm booking. Please ensure all details (room, dates, total amount) are correct."
      );
      return;
    }

    // 1. Check if user is logged in (by checking for JWT)
    const token = localStorage.getItem("token"); // Assuming 'token' is the key you used for JWT
    if (!token) {
      setError("You must be logged in to confirm a booking. Please sign in.");
      // Optionally, redirect to login page if not already there
      router.push("/auth");
      return;
    }

    let userId: number | null = null;
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      userId = decodedToken.user_id;
      if (!userId) {
        setError("Could not retrieve user ID from token. Please log in again.");
        localStorage.removeItem("token"); // Clear invalid token
        return;
      }
    } catch (decodeError) {
      console.error("Error decoding JWT:", decodeError);
      setError("Your session has expired or is invalid. Please log in again.");
      localStorage.removeItem("token"); // Clear invalid token
      return;
    }

    setIsConfirming(true);
    setError(null); // Clear any previous errors

    try {
      // 2. Prepare payload for the backend booking endpoint
      const bookingPayload = {
        checkin_date: checkInDateStr,
        checkout_date: checkOutDateStr,
        number_of_guests: numberOfGuests,
        room_num: [roomDetails.room_num], // Assuming single room booking, wrap in array as per example
        total_price: totalAmount,
        booking_date: new Date().toISOString(), // Current timestamp for booking
        typeOfBooking: "website", // Example type, adjust as needed
        user_id: userId,
      };

      // 3. Make the POST request to your backend to create the reservation
      const response = await axios.post(
        "http://localhost:3000/reservation/booking", // YOUR BACKEND BOOKING ENDPOINT
        bookingPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send the token with the request
          },
        }
      );

      const responseData = response.data;

      if (response.status === 200 || response.status === 201) {
        // 200 OK or 201 Created
        // Redirect to confirmation page with reservation ID
        router.push(
          `/confirmation/${responseData.reservation_id}` // Redirect to frontend confirmation page
        );
      } else {
        // Handle non-2xx responses from backend
        setError(`Booking failed: ${responseData.message || "Unknown error"}`);
        console.error("Booking failed (backend response):", responseData);
      }
    } catch (err) {
      console.error("Booking confirmation failed (network/axios error):", err);
      if (axios.isAxiosError(err) && err.response) {
        // Backend returned an error response (e.g., 400, 401, 500)
        setError(
          `Booking failed: ${
            err.response.data.message ||
            `Server error (Status: ${err.response.status})`
          }`
        );
      } else {
        // Network error or other unexpected error
        setError("Network error or unexpected issue. Please try again.");
      }
    } finally {
      setIsConfirming(false);
    }
  };

  // --- Conditional Rendering for Loading, Error, and No Details ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-lg text-gray-700">
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
        <p className="text-red-700 text-lg mb-4 text-center">Error: {error}</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (!roomDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700 text-lg">
        <p>
          No room details found for this booking. Please try selecting a room
          again.
        </p>
      </div>
    );
  }

  // --- Main UI Rendering ---
  return (
    <div className="min-h-screen bg-[#F5F3E9] py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <BookingProgressBar currentStepIndex={2} />

        <h1 className="text-3xl sm:text-4xl font-bold text-[#0C1F34] text-center mb-8">
          Review Your <span className="text-yellow-500">Booking</span>
        </h1>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
          {/* Booking Summary Section */}
          <div className="lg:w-2/3 p-6 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A314A] mb-6 flex items-center">
              <FaCalendarAlt className="mr-3 text-yellow-500" /> Booking Summary
            </h2>

            {/* Room Card */}
            <div className="flex flex-col sm:flex-row items-stretch bg-gray-50 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0">
                <Image
                  src={roomDetails.image_url || "/images/room-hero.png"} // Use roomDetails.image_url or fallback
                  alt={roomDetails.type}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-bold text-[#0C1F34] capitalize mb-1">
                  {roomDetails.type} Room (No. {roomDetails.room_num})
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {roomDetails.description}
                </p>
                <div className="flex items-center text-gray-700 text-sm">
                  <FaUserFriends className="mr-2" /> Capacity:{" "}
                  {roomDetails.capacity}{" "}
                  {roomDetails.capacity > 1 ? "guests" : "guest"}
                </div>
              </div>
            </div>

            {/* Booking Details List */}
            <div className="text-lg text-gray-700 space-y-3 mb-8">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-semibold">Check-in:</span>
                <span className="text-[#0C1F34]">{displayCheckInDate}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-semibold">Check-out:</span>
                <span className="text-[#0C1F34]">{displayCheckOutDate}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-semibold">Nights:</span>
                <span className="text-[#0C1F34]">{nights}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-semibold">Adults:</span>
                <span className="text-[#0C1F34]">{adults}</span>
              </div>
              {children > 0 && (
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold">Children:</span>
                  <span className="text-[#0C1F34]">{children}</span>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="text-lg text-gray-800 space-y-2 mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="text-xl font-bold text-yellow-700 mb-4">
                Price Breakdown
              </h3>
              <div className="flex justify-between items-center">
                <span>Room Price / Night:</span>
                <span className="font-bold">
                  ৳ {roomPricePerNight.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-green-700">
                <span>Discount ({parseFloat(roomDetails.discount)}%):</span>
                <span className="font-bold">
                  - ৳{" "}
                  {discountAmountPerNight.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-300 pt-2">
                <span>Discounted Price / Night:</span>
                <span className="font-bold">
                  ৳{" "}
                  {discountedPricePerNight.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center text-xl font-extrabold text-blue-700 pt-4 border-t-2 border-yellow-600">
                <span>Total Amount:</span>
                <span>
                  ৳{" "}
                  {totalAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              {totalAmount <= 0 && (
                <p className="text-red-500 text-sm mt-2">
                  Total amount is 0 or less. Please check dates/room price.
                </p>
              )}
            </div>
          </div>

          {/* Confirmation Action Section */}
          <div className="lg:w-1/3 p-6 sm:p-8 md:p-10 bg-gray-50 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A314A] mb-6 flex items-center">
                <FaArrowRight className="mr-3 text-green-600" /> Confirm Booking
              </h2>

              <p className="text-gray-700 mb-6">
                Please review your booking details. Once confirmed, your
                reservation will be finalized.
              </p>

              <p className="text-gray-600 text-sm italic mb-8">
                Note: This version simulates direct booking confirmation without
                an explicit payment gateway. Ensure a valid user session is
                active.
              </p>
            </div>

            {error && ( // Display error message here
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Booking Error:</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}

            <button
              onClick={handleConfirmBooking}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-8 py-4 rounded-lg shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 text-lg flex items-center justify-center gap-3"
              disabled={
                loading || error !== null || totalAmount <= 0 || isConfirming // Disable while confirming
              }
            >
              {isConfirming ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Confirming...
                </>
              ) : (
                <>
                  <span>Confirm Booking</span>
                  <FaArrowRight className="text-base" />
                </>
              )}
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              Your reservation will be finalized upon confirmation.
            </p>
          </div>
        </div>

        {/* Back to Room Selection Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-full hover:bg-gray-300 transition-colors shadow-md"
          >
            &larr; Back to Room Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingReviewPage;
