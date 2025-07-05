import React from "react";

const Dining = () => {
  const images = [
    { src: "/images/event_1.jpg", title: "Event" },
    { src: "/images/event_2.jpg", title: "Event" },
    { src: "/images/event_3.jpg", title: "Event" },
    { src: "/images/event_4.jpg", title: "Event" },
    { src: "/images/event_5.jpg", title: "Event" },
    { src: "/images/event_6.jpg", title: "Event" },
  ];

  return (
    <div className="min-h-screen bg-white p-8 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* div className="container mx-auto" */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105 bg-black"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-64 object-cover"
              />

              <div className="absolute bottom-0 w-full p-4 text-white bg-gradient-to-t from-black via-black/70 to-transparent flex justify-center items-center">
                <h3 className="text-lg font-semibold text-center">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dining;
