# Hotel Amin International Frontend

This is the frontend for Hotel Amin International, built with Next.js, React, and Tailwind CSS. It provides a modern, responsive user interface for hotel guests and staff, including room booking, gallery, reviews, and more.

## Users Features

- **Landing Page**: Hero section, introduction, services, reviews, location map, and video tour.
- **Room Booking**: Check room availability, select rooms, and complete bookings.
- **Authentication**: Sign up and sign in forms for users.
- **Gallery**: Explore hotel rooms, dining, events, and amenities with categorized galleries.
- **About Us**: Information about the hotel and key staff.
- **Contact**: Contact form and hotel contact details.
- **Responsive Design**: Mobile-friendly and visually appealing.
- **API Integration**: Uses Axios and fetch for backend communication.

### Admin & Management Features

- **Checkout Management**: View and process guest checkouts, manage payment status, and update booking records.
- **Front Desk Dashboard**: Oversee current bookings, reservations, and room assignments. Includes tools for check-in, check-out, and service requests.
- **Accounts**: Track financials, view due payments, and manage guest accounts and billing.
- **Bookings Management**: View, filter, and manage all hotel bookings, including guest details, payment status, and booking sources.
- **Reservation Management**: Oversee all reservations, assign rooms, and manage guest information.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [FontAwesome](https://fontawesome.com/) and [Lucide Icons](https://lucide.dev/)
- [Axios](https://axios-http.com/) for HTTP requests

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` - Main Next.js app directory
  - `components/` - Reusable UI components (landing page, booking, gallery, auth, etc.)
  - `landing-page/` - Landing page content
  - `globals.css` - Global styles (Tailwind)
- `public/` - Static assets (images, videos, etc.)

## Customization

- Update hotel information, images, and videos in the `public/` directory and relevant components.
- Adjust theme colors in `globals.css` and Tailwind config.

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.
