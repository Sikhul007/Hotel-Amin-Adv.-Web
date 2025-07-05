// app/components/AllRoomsPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaUserFriends, FaDollarSign } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Room {
  id: number;
  type: string;
  capacity: number;
  description: string;
  price: string;
  image: string;
}

const AllRoomsPage: React.FC = () => {
  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const router = useRouter();

  const getRoomImagePath = (roomNum: number): string => {
    switch (roomNum) {
      case 901:
        return "/images/901.png";
      case 510:
        return "/images/510.png";
      case 204:
        return "/images/204.png";
      case 307:
        return "/images/307.png";
      case 701:
        return "/images/701.png";
      case 408:
        return "/images/408.png";
      case 101:
        return "/images/101.png";
      case 305:
        return "/images/305.png";
      case 601:
        return "/images/601.png";
      case 102:
        return "/images/102.png";
      case 202:
        return "/images/202.png";
      case 901:
        return "/images/901.png";
      case 902:
        return "/images/902.png";
      case 903:
        return "/images/903.png";
      default:
        return "/images/room-hero.png";
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/rooms/all-rooms")
      .then((res) => {
        const transformed = res.data.map((room: any) => ({
          id: room.room_num,
          type: room.type,
          capacity: room.capacity,
          description: room.description,
          price: room.room_price,

          image: getRoomImagePath(room.room_num),
        }));
        setRoomsData(transformed);
      })
      .catch((err) => console.error("Failed to fetch all rooms:", err));
  }, []);

  const handleViewDetails = (roomId: number) => {
    // This pushes to the dynamic room details page (e.g., /room-details/901)
    router.push(`/room-details/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-[#0C1F34] mb-8">
        All Available <span className="text-yellow-500">Rooms</span>
      </h1>
      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {roomsData.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={room.image} // Now dynamically set by getRoomImagePath
                alt={room.type}
                fill // Use fill instead of layout="fill" for Next.js 13+ Image component
                style={{ objectFit: "cover" }} // Use style prop for objectFit
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-[#0C1F34] capitalize mb-1">
                {room.type} Room (No. {room.id}){" "}
                {/* Added Room No. for clarity */}
              </h2>
              <p className="text-gray-600 text-sm mb-3">{room.description}</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li className="flex items-center">
                  <FaUserFriends className="mr-2 text-yellow-500" />
                  Max {room.capacity} Adult{room.capacity > 1 ? "s" : ""}
                </li>
                <li className="flex items-center">
                  <FaDollarSign className="mr-2 text-green-600" />
                  BDT {parseFloat(room.price).toLocaleString()}{" "}
                  {/* Format price for better display */}
                </li>
              </ul>
              <button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold shadow-md transition-colors duration-300"
                onClick={() => handleViewDetails(room.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRoomsPage;
