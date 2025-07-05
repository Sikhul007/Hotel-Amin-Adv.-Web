// app/components/BookingProgressBar.tsx
import React from "react";

interface BookingProgressBarProps {
  currentStepIndex: number; // 0 for Date, 1 for Rooms, 2 for Options, 3 for Book
}

const steps = ["Date", "Rooms", "Options", "Book"];

const BookingProgressBar: React.FC<BookingProgressBarProps> = ({
  currentStepIndex,
}) => {
  return (
    <div className="bg-[#0C1F34] rounded-xl p-4 sm:p-6 mb-8 sl: mt-10 shadow-lg">
      <div className="flex items-center w-full">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex-1 text-center relative px-2 ${
              index > 0 ? "-ml-2" : ""
            }`}
          >
            <p
              className={`text-sm sm:text-base font-semibold ${
                index <= currentStepIndex ? "text-green-400" : "text-gray-400"
              } ${index === currentStepIndex ? "font-bold text-white" : ""}`}
            >
              {step}
            </p>
            <div className="w-full h-1 mt-2 relative">
              {index <= currentStepIndex ? (
                <div className="h-full bg-green-400"></div>
              ) : (
                <div className="h-full bg-gray-700"></div>
              )}
              {index === currentStepIndex && ( // Green dot for the current active step
                <div
                  className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 rounded-full bg-green-400"
                  style={{
                    right:
                      index === 0
                        ? "0"
                        : index === steps.length - 1
                        ? "0"
                        : "-0.75rem",
                  }}
                >
                  {" "}
                  {/* Adjust dot position */}
                </div>
              )}
              {index > 0 &&
                index - 1 < currentStepIndex && ( // Dot for completed steps (before current)
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 rounded-full bg-green-400"
                    style={{ left: "-0.75rem" }}
                  ></div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingProgressBar;
