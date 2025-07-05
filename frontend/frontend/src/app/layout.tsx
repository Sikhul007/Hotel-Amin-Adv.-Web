import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Hotel Amin",
  description:
    "Hotel Amin international is a privately owned 3 Star Standard Luxury Hotel in Cox's Bazar Hotel, Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
