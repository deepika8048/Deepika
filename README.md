# Dentist Appointment Booking Platform

A full-stack MERN application for booking dentist appointments with a user view and an admin panel.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Lucide React, Motion (framer-motion)
- **Backend:** Node.js, Express.js
- **Database:** SQLite (via better-sqlite3)

## Architecture

The application follows a standard full-stack architecture:

- **Frontend:** A single-page application (SPA) built with React. It communicates with the backend via RESTful API endpoints.
- **Backend:** An Express.js server that handles API requests and serves the static frontend files. It uses `better-sqlite3` for local data storage.
- **Database:** SQLite is used as a local NoSQL-like database to store dentist information and appointment records.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    - Create a `.env` file based on `.env.example`.
    - Add your `GEMINI_API_KEY` and other required secrets.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Build for production:**
    ```bash
    npm run build
    npm start
    ```

## Features

- **Dentist Listing:** Responsive grid view of all available dentists.
- **Search & Filter:** Search dentists by name, clinic, or location.
- **Booking Flow:** Easy-to-use form for booking appointments.
- **Admin Panel:** A dedicated section to view all booked appointments in a table format.
- **Responsive Design:** Fully functional on mobile and desktop devices.
