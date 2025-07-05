// app/room-details/[room_num]/page.tsx
"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  FaUserFriends,
  FaBed,
  FaDollarSign,
  FaWifi,
  FaCoffee,
  FaChevronLeft,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

interface RoomDetail {
  room_num: number;
  floor: number;
  capacity: number;
  type: string;
  description: string;
  room_price: string;
  discount: string;
  room_status: string;
}

const RoomDetailsPage: React.FC = () => {
  const params = useParams<{ room_num: string }>();
  const roomNumber = params.room_num;

  const [roomDetails, setRoomDetails] = useState<RoomDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleBookNow = () => {
    router.push(`/#check-availability-section`);
  };

  const getRoomVideoPath = (roomNum: number): string => {
    switch (roomNum) {
      case 901:
        return "/videos/901.mp4";
      case 510:
        return "/videos/510.mp4";
      case 204:
        return "/videos/204.mp4";
      case 307:
        return "/videos/307.mp4";
      case 701:
        return "/videos/701.mp4";
      default:
        return "/videos/hotel-hero-video.mp4";
    }
  };

  useEffect(() => {
    if (!roomNumber) {
      setError("No room number provided in the URL.");
      setLoading(false);
      return;
    }

    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<RoomDetail>(
          `http://localhost:3000/rooms/search-by-room-num/${roomNumber}`
        );
        setRoomDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch room details:", err);
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError(`Room with number ${roomNumber} not found.`);
        } else {
          setError("Could not load room details. Please try again later.");
        }
        setRoomDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-lg text-gray-700">
        <p>Loading room details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-600 text-lg text-center p-4">
        <p>Error: {error}</p>
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center gap-2"
        >
          <FaChevronLeft /> Go Back
        </button>
      </div>
    );
  }

  if (!roomDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700 text-lg">
        <p>Room details not available.</p>
      </div>
    );
  }

  const statusColor =
    roomDetails.room_status === "AVAILABLE" ? "bg-green-500" : "bg-red-500";
  const currentRoomVideoPath = getRoomVideoPath(roomDetails.room_num);

  return (
    <div className="min-h-screen bg-[#F5F3E9] py-12 sm:py-16 md:py-20 flex items-center justify-center relative px-4">
      <div className="absolute inset-0 bg-black opacity-10 z-0"></div>

      <div className="relative z-10 bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-5xl w-full flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Video Section instead of Image */}
        <div className="relative w-full lg:w-2/3 h-72 sm:h-96 rounded-lg overflow-hidden flex-shrink-0 shadow-lg bg-black">
          <video
            className="w-full h-full object-cover"
            src={currentRoomVideoPath}
            autoPlay
            loop
            muted
            playsInline
            controls // You might want controls for user interaction
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-5 py-2 rounded-full text-lg font-bold shadow-lg">
            BDT {parseFloat(roomDetails.room_price).toLocaleString()} / night
          </div>
        </div>

        {/* Room Details Content Section */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0C1F34] capitalize mb-3 leading-tight">
              {roomDetails.type} Room (No. {roomDetails.room_num})
            </h1>
            <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
              {roomDetails.description}
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-800 text-sm sm:text-base mb-6">
              <div className="flex items-center">
                <FaUserFriends className="text-yellow-600 mr-2" />
                <span>
                  Capacity:{" "}
                  <span className="font-semibold">
                    {roomDetails.capacity} Adult
                    {roomDetails.capacity > 1 ? "s" : ""}
                  </span>
                </span>
              </div>
              <div className="flex items-center">
                <FaBed className="text-blue-600 mr-2" />
                <span>
                  Floor:{" "}
                  <span className="font-semibold">{roomDetails.floor}</span>
                </span>
              </div>
              <div className="flex items-center">
                <FaDollarSign className="text-green-600 mr-2" />
                <span>
                  Discount:{" "}
                  <span className="font-semibold">
                    {parseFloat(roomDetails.discount)}%
                  </span>
                </span>
              </div>
              <div className="flex items-center">
                <FaWifi className="text-purple-600 mr-2" />
                <span>
                  Wi-Fi: <span className="font-semibold">Available</span>
                </span>
              </div>
              <div className="flex items-center">
                <FaCoffee className="text-brown-600 mr-2" />
                <span>
                  Breakfast: <span className="font-semibold">Included</span>
                </span>
              </div>
            </div>

            {/* Status Information */}
            <div className="mb-6 text-sm sm:text-base">
              <p className="mb-2">
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-white font-semibold text-xs ${statusColor}`}
                >
                  {roomDetails.room_status.replace(/_/g, " ")}
                </span>
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => handleBookNow()}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold px-8 py-4 rounded-lg shadow-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:-translate-y-1 text-lg flex items-center justify-center gap-3"
          >
            <span>BOOK THIS ROOM NOW</span>
            <FaChevronLeft className="text-base rotate-180" />
          </button>

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mt-4 w-full bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-lg shadow-md hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <FaChevronLeft className="text-base" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
