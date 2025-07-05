import React from "react";

const AboutTop = () => {
  return (
    <div className="bg-[#FDFDF5] p-30 text-center border-t-4 border-b-4 border-black">
      <div className="flex items-center justify-center space-x-10  ">
        <div className="text-left text-black max-w-md h-auto">
          <p>
            <h1 className="text-3xl font-bold text-black mb-2">ABOUT US</h1>
          </p>
          <p>
            Hotel Amin International is a privately owned 3 Star Standard Luxury
            Hotel in Cox's Bazar, Bangladesh. It is situated in an attractive
            location of Kolatoli dolphin circle, which near Kolatoli beach. It
            will take 1 minutes to walk to the beach and only 5 minutes drive
            form the Cox's Bazar Airport. Hotel Amin International provides you
            exactly just that with extraordinary comfort, luxury and services.
            Client satisfaction is our main goal. Hotel Amin International has
            great Expert Peoples
          </p>
        </div>
        <div className="w-1/3 h-auto">
          <img
            src="/images/home-hero.jpeg"
            alt="Hotel Exterior"
            className="w-full h-auto "
          />
        </div>
      </div>
    </div>
  );
};

export default AboutTop;
