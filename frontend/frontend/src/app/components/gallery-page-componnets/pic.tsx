import React from "react";

const Gallery = () => {
  const images = [
    { src: "/images/room_pic.jpg", title: "Deluxe King Room" },
    { src: "/images/dining.jpg", title: "Dining" },
    { src: "/images/lobby.jpg", title: "Lobby" },
    { src: "/images/swimming.jpg", title: "Swimming Pool" },
    { src: "/images/spa.jpg", title: "Spa" },
    { src: "/images/bar.jpg", title: "Bar" },
    { src: "/images/game_zone.jpg", title: "Game Zone" },
    { src: "/images/gym.jpg", title: "Gym" },
    { src: "/images/special_event.jpg", title: "Event Hall" },
    
  ];

  return (
    // Main background set to white as requested
    <div className="min-h-screen bg-white p-8 font-inter">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            // Image box with black background, rounded corners, shadow, and hover effect
            <div key={index} className="relative rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105 bg-black">
              <img
                src={image.src}
                alt={image.title}
                // Ensured all images have the same size with object-cover to maintain aspect ratio
                className="w-full h-64 object-cover"
                // Fallback for broken images, in case local paths are incorrect or missing
               // onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/CCCCCC/000000?text=Image%20Error"; }}
              />
              {/* Title overlay positioned at the bottom middle of the image, with white text */}
              <div className="absolute bottom-0 w-full p-4 text-white bg-gradient-to-t from-black via-black/70 to-transparent flex justify-center items-center">
                <h3 className="text-lg font-semibold text-center">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
