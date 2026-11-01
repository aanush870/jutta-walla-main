# Juttawalla - Premium Shoes E-Commerce

A full-stack MERN (MongoDB, Express, React, Node.js) application for an online shoe store.

## Features Built
- **Responsive & Premium UI**: Crafted using React and TailwindCSS with smooth micro-interactions.
- **Product Catalog**: Displays shoes by categories (Sneakers, Sports, Formal, Casual).
- **Search & Sort**: Real-time filtering and sorting by price, rating, and new arrivals.
- **Cart System**: Persistent cart management (uses localStorage).
- **Authentication**: JWT-ready authentication routes (mocked endpoints for demonstration).
- **Backend API**: Full REST API built with Express and Mongoose.
- **Seed Data**: Includes a seeder script to instantly populate the store with realistic products.

## Prerequisites
- Node.js (v18+)
- MongoDB (running locally on port 27017, or update the URI in `backend/config/db.js`)

## Getting Started

Follow these steps to run the application locally.

### 1. Database Setup & Seeding

Open a terminal and navigate to the backend folder:
```bash
cd backend
npm install
npm run data:import
```
This will insert the sample shoe products and users into your local MongoDB.

### 2. Run Backend Server
Inside the `backend` folder, start the API server:
```bash
npm start
```
The server will run on `http://localhost:5000`.

### 3. Run Frontend Server
Open a new terminal window, navigate to the frontend folder:
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## Folder Structure
- `/backend`: Express application, Mongoose models, and API routes.
- `/frontend`: Vite+React application with styled components.

Enjoy your new premium e-commerce site!
