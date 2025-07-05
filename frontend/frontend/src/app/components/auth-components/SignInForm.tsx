// components/auth-components/SignInForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import Cookies from "js-cookie"; // Added for cookie handling

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSwitchToSignUp }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const primaryDark = "#0C1F34";
  const accentYellow = "#F59E0B";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        Cookies.set("token", data.access_token, { expires: 7 }); // Store token in cookie for 7 days
        setMessage("Sign In successful! Redirecting...");
        setTimeout(() => router.push("/"), 1500);
      } else {
        setMessage(`Error: ${data.message || "Invalid credentials."}`);
      }
    } catch (error) {
      console.error("Sign In error:", error);
      setMessage("Error: Could not connect to server. Check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`p-8 w-full ${montserrat.className}`}>
      <h2
        className="text-3xl font-bold text-center mb-6"
        style={{ color: primaryDark }}
      >
        Sign In
      </h2>
      {message && (
        <p
          className={`mb-4 text-center ${
            message.startsWith("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: primaryDark,
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting)
              e.currentTarget.style.backgroundColor = accentYellow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = primaryDark;
          }}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-blue-600 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default SignInForm;
