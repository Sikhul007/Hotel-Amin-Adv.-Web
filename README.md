# Hotel Amin International - Hotel Management System

A comprehensive full-stack hotel management system built for **Hotel Amin International** by **Sikhul Shihab**. This system provides a complete solution for managing hotel operations including room bookings, reservations, payments, housekeeping, inventory, staff management, and customer service.

## 🌟 Overview

Hotel Amin International is a privately owned 3-star luxury hotel in Cox's Bazar, Bangladesh. This management system is designed to streamline hotel operations and provide an excellent experience for both guests and staff.

## 🛠 Tech Stack

### Backend

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT + bcrypt
- **Authorization**: Role-Based Access Control (RBAC)
- **Email**: SendGrid/Nodemailer
- **Template Engine**: Handlebars

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: React with custom components
- **Icons**: FontAwesome, Lucide, React Icons
- **HTTP Client**: Axios
- **State Management**: React Hooks

## 📦 Features

### 🎯 Guest Features

- **Online Booking**: Check room availability and make reservations
- **User Authentication**: Secure login and registration
- **Room Gallery**: Explore hotel rooms, dining, and amenities
- **Reviews & Feedback**: View reviews and submit feedback
- **Interactive Map**: Hotel location with Google Maps integration
- **Virtual Tour**: Video tours of the hotel
- **Responsive Design**: Mobile-friendly interface

### 🖥️ Advanced Admin Dashboard

The frontend includes sophisticated admin panels built with React and TypeScript, featuring:

### 🏨 Hotel Management Features

- **Front Desk Dashboard**: Real-time overview of bookings and reservations with comprehensive room management

  - Current bookings display with guest information
  - Room status tracking (Available, Occupied, Maintenance)
  - Quick check-in/check-out operations
  - Service request management and housekeeping coordination
  - Real-time availability calendar

- **Checkout Management**: Complete guest departure processing system

  - View all active bookings ready for checkout
  - Payment status verification and due amount tracking
  - Generate final bills and receipts
  - Update room status post-checkout
  - Guest feedback collection integration

- **Accounts & Billing**: Comprehensive financial management dashboard

  - Track all guest accounts and outstanding dues
  - Payment history and transaction records
  - Due amount calculations with room-wise breakdown
  - Financial reporting and revenue tracking
  - Integration with booking and billing modules

- **Bookings Management**: Advanced booking oversight and control

  - View, filter, and search all hotel bookings
  - Guest details management (name, contact, preferences)
  - Booking source tracking (website, walk-in, phone)
  - Payment status monitoring (paid, pending, cancelled)
  - Date range filtering and booking analytics
  - Modify or cancel existing bookings

- **Reservation System**: Sophisticated reservation handling

  - Future reservation management and scheduling
  - Room assignment and availability planning
  - Guest information management with user lookup
  - Reservation confirmation and notification system
  - Convert reservations to active bookings

- **Room Management**: Room status and availability tracking
- **Housekeeping**: Task management and room maintenance
- **Inventory Control**: Stock management and ordering
- **Staff Management**: Employee roles and salary tracking
- **Restaurant Orders**: Food service management
- **Coupon System**: Discount and promotion management

### 🔐 Security & Access Control

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Admin, Staff, and Guest permissions
- **Password Encryption**: bcrypt for secure password storage
- **Protected Routes**: Authorization middleware

## 📁 Project Structure

```
Hotel Amin/
├── backend/                 # NestJS Backend API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── admin/          # Admin management
│   │   ├── booking/        # Booking system
│   │   ├── billing/        # Payment & billing
│   │   ├── reservation/    # Reservation management
│   │   ├── housekeeping/   # Housekeeping tasks
│   │   ├── inventory/      # Inventory management
│   │   ├── restaurant/     # Restaurant orders
│   │   ├── room/           # Room management
│   │   ├── salary/         # Staff salary
│   │   ├── user/           # User management
│   │   ├── feedback/       # Customer feedback
│   │   ├── coupon/         # Coupon system
│   │   └── confirmation/   # Email confirmations
│   ├── templates/          # Email templates
│   └── test/              # Test files
├── frontend/               # Next.js Frontend
│   └── frontend/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   │   ├── landing-page-components/
│       │   │   │   ├── booking-page-components/
│       │   │   │   ├── auth-components/
│       │   │   │   ├── gallery-page-components/
│       │   │   │   └── about-page-components/
│       │   │   ├── landing-page/
│       │   │   ├── booking/
│       │   │   ├── checkout/
│       │   │   ├── frontdesk/
│       │   │   ├── accounts/
│       │   │   ├── bookings/
│       │   │   ├── reservation/
│       │   │   └── [other pages]/
│       │   └── globals.css
│       └── public/         # Static assets
└── database/               # Database schema
    └── hotel_management_final.sql
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. **Create a database in Postgresql. Name of the database must be "hotel_management_fina"**

   ```bash
   password : root
   ```

### backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/hotel-amin-management.git
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Database Setup**

   - Create a PostgreSQL database named `hotel_management_final`
   - Import the database schema:

   ```bash
   psql -U your_username -d hotel_management_final -f ../database/hotel_management_final.sql
   ```

4. **Environment Configuration**
   Create a `.env` file in the backend directory:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_NAME=hotel_management_final
   JWT_SECRET=your_jwt_secret_key
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

5. **Start the backend server**
   ```bash
   npm run start:dev
   ```
   The API will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd ../frontend/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3001`

## 🔗 API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

### Booking Management

- `GET /booking` - Get all bookings
- `POST /booking` - Create new booking
- `PUT /booking/:id` - Update booking
- `DELETE /booking/:id` - Cancel booking

### Room Management

- `GET /room` - Get available rooms
- `GET /room/:id` - Get room details
- `PUT /room/:id/status` - Update room status

### Admin Operations

- `GET /admin/dashboard` - Dashboard statistics
- `GET /admin/users` - Manage users
- `GET /admin/reports` - Generate reports

## 🏨 Hotel Information

**Hotel Amin International**

- Location: Kolatoli, Cox's Bazar, Bangladesh
- Type: 3-Star Luxury Hotel
- Proximity: 1 minute walk to beach, 5 minutes from Cox's Bazar Airport

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For any queries or support:

- Shihab
- Email: sikhulshihab@gmail.com
- Phone: +880-1889031522
- Website: [https://sikhul007-github-io-fjl5.vercel.app/](https://sikhul007-github-io-fjl5.vercel.app/)

---

**🏨 Experience luxury and comfort at Hotel Amin International! 🏨**

_Developed with ❤️ by Sikhul Shihab_
