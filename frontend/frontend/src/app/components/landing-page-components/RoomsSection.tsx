"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import {
  FaUserFriends,
  FaBed,
  FaCheckCircle,
  FaDollarSign,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Room {
  id: number;
  type: string;
  capacity: number;
  description: string;
  price: string;
  image: string;
}

const RoomsSection: React.FC = () => {
  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const swiperRef = useRef<HTMLDivElement>(null);

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
        const transformedRooms = res.data.map((room: any) => ({
          id: room.room_num,
          type: room.type,
          capacity: room.capacity,
          description: room.description,
          price: room.room_price,
          image: getRoomImagePath(room.room_num),
        }));
        setRoomsData(transformedRooms);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
      });
  }, []);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(roomsData.length / itemsPerSlide);

  const goToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setCurrentSlide(slideIndex);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleViewAllRooms = () => {
    router.push("/all-rooms");
  };

  const handleViewDetails = (roomId: number) => {
    router.push(`/room-details/${roomId}`);
  };

  return (
    <div className="relative z-10 w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1F34] text-center mb-2">
        OUR <span className="text-yellow-500">BEST SELLING</span> ROOMS
      </h2>
      <div className="w-24 h-1 bg-yellow-500 mx-auto mb-10 sm:mb-14"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Custom Swiper Container */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Swiper Wrapper */}
          <div
            ref={swiperRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full flex-shrink-0 flex justify-center gap-6 px-4"
              >
                {roomsData
                  .slice(
                    slideIndex * itemsPerSlide,
                    (slideIndex + 1) * itemsPerSlide
                  )
                  .map((room: Room) => (
                    <div
                      key={room.id}
                      className="w-full max-w-[350px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Room Image */}
                      <div className="relative w-full h-56 overflow-hidden">
                        <Image
                          src={room.image} // This now gets the specific image path
                          alt={room.type}
                          width={350}
                          height={224}
                          className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          BDT {parseFloat(room.price).toLocaleString()}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Room Content */}
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-[#0C1F34] capitalize mb-3">
                          {room.type} Room
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                          {room.description}
                        </p>

                        {/* Room Features */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center text-gray-700">
                            <div className="bg-yellow-100 p-2 rounded-full mr-3">
                              <FaUserFriends className="text-yellow-600 text-sm" />
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Capacity
                              </span>
                              <span className="text-sm font-semibold">
                                {room.capacity} Adult
                                {room.capacity > 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <FaBed className="text-blue-600 text-sm" />
                            </div>
                            <div>
                              <span className="text-xs text-gray-500 block">
                                Comfort
                              </span>
                              <span className="text-sm font-semibold">
                                Premium
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => handleViewDetails(room.id)}
                          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-xl hover:from-yellow-600 hover:to-yellow-700 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                          <span>VIEW DETAILS</span>
                          <FaChevronRight className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#0C1F34] hover:text-yellow-600 w-12 h-12 rounded-full shadow-xl z-20 transition-all duration-300 flex items-center justify-center border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-lg" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#0C1F34] hover:text-yellow-600 w-12 h-12 rounded-full shadow-xl z-20 transition-all duration-300 flex items-center justify-center border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-lg" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-yellow-500 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* View All Rooms Button */}
      <div className="text-center mt-12">
        <button
          onClick={handleViewAllRooms}
          className="bg-transparent border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          VIEW ALL ROOMS
        </button>
      </div>
    </div>
  );
};

export default RoomsSection;
