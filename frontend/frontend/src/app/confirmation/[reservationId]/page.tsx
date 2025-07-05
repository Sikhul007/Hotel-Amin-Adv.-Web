// app/confirmation/[reservationId]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Interface for the reservation details you expect from your backend
interface ReservationDetails {
  reservation_id: string;
  user_id: number;
  room_number: string;
  checkin_date: string;
  checkout_date: string;
  number_of_guests: number;
  total_price: number;
  booking_date: string;
  type_of_booking: string;
  status: string; // e.g., "confirmed", "pending"
  // Add other details your backend provides, e.g., room_type, user_email
  user_email?: string;
  room_type?: string;
}

const ConfirmationPage: React.FC = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservationDetails, setReservationDetails] =
    useState<ReservationDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const primaryDark = "#0C1F34";
  const accentYellow = "#F59E0B";

  useEffect(() => {
    if (reservationId) {
      const fetchReservationDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          // Note: Your backend link is http://localhost:3000/confirmation/send/:reservationId
          // Ensure this endpoint returns the *details* of the reservation.
          const response = await fetch(
            `http://localhost:3000/confirmation/send/${reservationId}`
          );
          if (response.ok) {
            const data: ReservationDetails = await response.json();
            setReservationDetails(data);
          } else {
            const errorData = await response.json();
            setError(
              `Failed to load reservation details: ${
                errorData.message || response.statusText
              }`
            );
            console.error(
              "Failed to fetch reservation details:",
              response.status,
              errorData
            );
          }
        } catch (err) {
          setError(
            "Network error: Could not connect to the server to fetch reservation details."
          );
          console.error("Error fetching reservation details:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchReservationDetails();
    } else {
      setLoading(false);
      setError("No reservation ID provided in the URL.");
    }
  }, [reservationId]);

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${montserrat.className}`}
      >
        <p className="text-xl text-gray-700">Loading reservation details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${montserrat.className} text-red-600`}
      >
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  if (!reservationDetails) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${montserrat.className}`}
      >
        <p className="text-xl text-gray-700">Reservation details not found.</p>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto p-4 md:p-8 ${montserrat.className}`}
      style={{ color: primaryDark }}
    >
      <h1
        className="text-4xl font-bold text-center mb-8"
        style={{ color: accentYellow }}
      >
        Booking Confirmed!
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <p className="text-xl mb-6 text-center">
          Your reservation has been successfully placed.
        </p>

        <div className="space-y-4 text-lg">
          <p>
            <strong>Reservation ID:</strong> {reservationDetails.reservation_id}
          </p>
          <p>
            <strong>Room Number:</strong> {reservationDetails.room_number}
          </p>
          {reservationDetails.room_type && (
            <p>
              <strong>Room Type:</strong> {reservationDetails.room_type}
            </p>
          )}
          <p>
            <strong>Check-in Date:</strong> {reservationDetails.checkin_date}
          </p>
          <p>
            <strong>Check-out Date:</strong> {reservationDetails.checkout_date}
          </p>
          <p>
            <strong>Guests:</strong> {reservationDetails.number_of_guests}
          </p>
          <p>
            <strong>Total Price:</strong> $
            {reservationDetails.total_price.toFixed(2)}
          </p>
          <p>
            <strong>Booking Date:</strong>{" "}
            {new Date(reservationDetails.booking_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`font-semibold ${
                reservationDetails.status === "confirmed"
                  ? "text-green-600"
                  : "text-orange-600"
              }`}
            >
              {reservationDetails.status}
            </span>
          </p>
          {reservationDetails.user_email && (
            <p>
              <strong>Booked by:</strong> {reservationDetails.user_email}
            </p>
          )}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => router.push("/")}
            className="py-3 px-8 text-xl rounded-md shadow-md text-white font-semibold transition-all duration-300"
            style={{
              backgroundColor: primaryDark,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = accentYellow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryDark;
            }}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
