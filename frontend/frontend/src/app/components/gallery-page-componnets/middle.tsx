import React from "react";

const Middle = () => {
  return (
    // Changed background to the yellow color from the image and added top/bottom black borders
    <div className="bg-[#FDFDF5] p-4 text-center border-t-1 border-b-1 border-black">
      <h1 className="text-3xl font-bold text-black mb-4">Take a Virtual Tour</h1>
      {/* Changed border to only have top and bottom borders with a thickness of 4 */}
      <div className=" rounded-lg overflow-hidden mx-auto max-w-xl">
        <video controls className="h-auto w-full">
          <source src="/videos/virtual-tour.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="bg-blue-800 text-white p-2 text-center">
          <p className="text-white">Hotel Amin International 🎥 , Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Middle;
