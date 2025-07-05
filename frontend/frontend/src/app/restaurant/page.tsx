// app/restaurant/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { FaClock, FaLeaf, FaFire, FaChevronRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Dish {
  id: number;
  name: string;
  description?: string;
  rating?: number;
  price: string;
  image: string;
  food_type: string;
  availability: boolean;
}

interface DishesByType {
  breakfast: Dish[];
  lunch: Dish[];
  dinner: Dish[];
  dessert: Dish[];
  beverage: Dish[];
}

const RestaurantPage: React.FC = () => {
  const router = useRouter();
  const [dishesByType, setDishesByType] = useState<DishesByType>({
    breakfast: [],
    lunch: [],
    dinner: [],
    dessert: [],
    beverage: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getFoodImagePath = (foodId: number): string => {
    switch (foodId) {
      case 1:
        return "/images/food_1.png";
      case 4:
        return "/images/food_4.png";
      case 5:
        return "/images/food_5.png";
      case 6:
        return "/images/food_6.png";
      case 7:
        return "/images/food_7.png";
      case 8:
        return "/images/food_8.png";
      case 9:
        return "/images/food_9.png";
      case 10:
        return "/images/food_10.png";
      case 11:
        return "/images/food_11.png";
      case 12:
        return "/images/food_12.png";
      case 13:
        return "/images/food_13.png";
      case 14:
        return "/images/food_14.png";
      case 15:
        return "/images/food_15.png";
      case 16:
        return "/images/food_16.png";
      case 17:
        return "/images/food_17.png";
      case 18:
        return "/images/food_18.png";
      case 19:
        return "/images/food_19.png";
      case 20:
        return "/images/food_20.png";
      default:
        return "/images/food.jpeg";
    }
  };

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          "http://localhost:3000/restaurant/findAllFood"
        );

        const categorized: DishesByType = {
          breakfast: [],
          lunch: [],
          dinner: [],
          dessert: [],
          beverage: [],
        };

        res.data.forEach((item: any) => {
          const dish: Dish = {
            id: item.food_id,
            name: item.item_name,
            description: item.description,
            price: `${parseFloat(item.item_price).toLocaleString()} BDT`, //
            image: getFoodImagePath(item.food_id),
            food_type: item.food_type.toLowerCase(),
            availability: item.availability,
            rating: item.rating ?? 4,
          };

          switch (dish.food_type) {
            case "breakfast":
              categorized.breakfast.push(dish);
              break;
            case "lunch":
              categorized.lunch.push(dish);
              break;
            case "dinner":
              categorized.dinner.push(dish);
              break;
            case "dessert":
              categorized.dessert.push(dish);
              break;
            case "beverage":
              categorized.beverage.push(dish);
              break;
            default:
              console.warn(
                `Unknown food_type: ${dish.food_type} for item ${dish.name}`
              );
              break;
          }
        });
        setDishesByType(categorized);
      } catch (err) {
        console.error("Failed to fetch food data:", err);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  // Get popular dishes for swiper
  const getPopularDishes = () => {
    return dishesByType.lunch
      .concat(dishesByType.dinner)
      .concat(dishesByType.dessert)
      .concat(dishesByType.beverage)
      .filter((dish) => dish.availability)
      .slice(0, 12); // Limit to 12 as before
  };

  const popularDishes = getPopularDishes();

  const handleRequestBooking = () => {
    router.push("/rooms"); // This usually links to room booking, confirm if this is correct for restaurant page
  };

  // Handler for ordering a dish
  const handleOrderNow = (dish: Dish) => {
    if (!dish.availability) {
      alert(`${dish.name} is currently not available.`);
      return;
    }
    alert(`Ordering ${dish.name} (ID: ${dish.id})!`);
    // Here you would typically add logic to add to cart, open a modal, etc.
  };

  // Get food type icon
  const getFoodTypeIcon = (foodType: string) => {
    switch (foodType) {
      case "breakfast":
        return <FaClock className="text-orange-500 text-lg" />;
      case "lunch":
      case "dinner":
        return <FaFire className="text-red-500 text-lg" />;
      case "dessert":
        return <FaLeaf className="text-pink-500 text-lg" />;
      case "beverage":
        return <FaLeaf className="text-blue-500 text-lg" />;
      default:
        return <FaLeaf className="text-green-500 text-lg" />;
    }
  };

  const renderDishCard = (dish: Dish) => (
    <div
      key={dish.id}
      className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 transform hover:scale-105 hover:shadow-3xl transition-all duration-300 mx-auto"
    >
      {/* Dish Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={dish.image} // Now dynamically set by getFoodImagePath
          alt={dish.name}
          width={350} // Provide explicit width/height for Image component, objectFit handles scaling
          height={224}
          className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {dish.price}
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
          {getFoodTypeIcon(dish.food_type)}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        {!dish.availability && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-bold text-lg rounded-t-2xl z-10">
            NOT AVAILABLE
          </div>
        )}
      </div>

      {/* Dish Content */}
      <div className="p-6 text-[#0C1F34]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-xl capitalize">{dish.name}</h4>
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
            {dish.food_type}
          </span>
        </div>

        {dish.description && (
          <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
            {dish.description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (dish.rating ?? 0)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({dish.rating ?? 0}/5)
          </span>
        </div>

        {/* Price and Order Button */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-500 block">Price</span>
            <span className="font-bold text-lg text-green-600">
              {dish.price}
            </span>
          </div>
          <button
            onClick={() => handleOrderNow(dish)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              dish.availability
                ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!dish.availability}
          >
            <span>{dish.availability ? "ORDER NOW" : "UNAVAILABLE"}</span>
            {dish.availability && <FaChevronRight className="text-sm" />}{" "}
            {/* Kept the icon as it's part of your button design */}
          </button>
        </div>
      </div>
    </div>
  );

  // Renders a section of dishes in a grid layout (reusing renderDishCard)
  const renderGridSection = (title: string, dishes: Dish[]) => {
    if (dishes.length === 0) return null;

    return (
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl sm:text-4xl text-yellow-500 font-bold tracking-wide">
            {title.toUpperCase()}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {dishes.map((dish) => (
            <div // Removed extra div, renderDishCard directly contains the card styling
              key={dish.id}
              className="group" // Keep group for hover effects if any are applied outside renderDishCard
            >
              {renderDishCard(dish)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0C1F34] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center">
        <Image
          src="/images/restaurant-hero.jpeg"
          alt="Hotel Amin International Restaurant"
          fill
          className="z-0 object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-opacity-60 z-10"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Welcome to the Hotel Amin International Restaurant, where tradition
            meets elegance.
          </h1>
          <button
            onClick={handleRequestBooking}
            className="bg-yellow-500 text-[#0C1F34] px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-300 font-semibold shadow-lg"
          >
            Request Booking
          </button>
        </div>
      </section>

      {/* Loading/Error State Display */}
      {loading && (
        <div className="py-20 text-center text-xl text-yellow-500">
          Loading delicious dishes...
        </div>
      )}
      {error && (
        <div className="py-20 text-center text-xl text-red-500">
          Error: {error}
        </div>
      )}

      {/* Popular Dishes Section (Swiper Carousel) */}
      {!loading && !error && popularDishes.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-2">
            TRY OUR <span className="text-yellow-500">POPULAR</span> DISHES
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-10 sm:mb-14"></div>

          <div className="relative max-w-7xl mx-auto">
            <Swiper
              // Install modules
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={24} // Gap between slides (adjust as needed)
              slidesPerView={1} // Default: 1 slide per view on smallest screens
              slidesPerGroup={1} // Default: slide 1 item at a time
              navigation // Enable navigation arrows
              pagination={{ clickable: true }} // Enable pagination dots
              loop={true} // Allow continuous looping of slides
              speed={400} // Transition speed in ms (faster than 500ms default)
              breakpoints={{
                // For screens up to 639px (extra small), slidesPerView will be 1
                // 640px and up (sm)
                640: {
                  slidesPerView: 2,
                  slidesPerGroup: 2, // Slide 2 items at a time
                  spaceBetween: 24,
                },
                // 1024px and up (lg)
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 3, // Slide 3 items at a time (or 2 if you prefer for consistency)
                  spaceBetween: 24,
                },
                // You can add more breakpoints if needed, e.g., for xl
              }}
              className="pb-10" // Add padding at the bottom for pagination dots
            >
              {popularDishes.map((dish) => (
                <SwiperSlide key={dish.id} className="h-auto">
                  {" "}
                  {/* h-auto ensures slide height adapts to content */}
                  {renderDishCard(dish)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Regular Food Items Sections (Eye-catching Grids) */}
      {!loading && !error && (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            EXPLORE OUR <span className="text-yellow-500">FULL MENU</span>
          </h2>

          {renderGridSection(
            "Breakfast",
            dishesByType.breakfast.filter((d) => d.availability)
          )}
          {renderGridSection(
            "Lunch",
            dishesByType.lunch.filter((d) => d.availability)
          )}
          {renderGridSection(
            "Dinner",
            dishesByType.dinner.filter((d) => d.availability)
          )}
          {renderGridSection(
            "Snacks & Beverages",
            dishesByType.beverage
              .concat(dishesByType.dessert)
              .filter((d) => d.availability)
          )}
        </section>
      )}
    </div>
  );
};

export default RestaurantPage;
