// app/auth/page.tsx
"use client";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import SignInForm from "@/app/components/auth-components/SignInForm"; // Make sure this import path is correct
import SignupForm from "@/app/components/auth-components/SignupForm"; // Make sure this import path is correct

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const AuthPage: React.FC = () => {
  // State to determine which form to display (true for Sign In, false for Sign Up)
  const [isSignInMode, setIsSignInMode] = useState(true);

  const primaryDark = "#0C1F34"; // Your project's primary dark blue

  // Functions to switch between modes, passed as props to the forms
  const handleSwitchToSignUp = () => setIsSignInMode(false);
  const handleSwitchToSignIn = () => setIsSignInMode(true);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200 ${montserrat.className}`}
    >
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative overflow-hidden">
        {isSignInMode ? (
          // Render SignInForm when in Sign In mode
          <SignInForm onSwitchToSignUp={handleSwitchToSignUp} />
        ) : (
          // Render SignupForm when in Sign Up mode
          <SignupForm onSwitchToSignIn={handleSwitchToSignIn} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
