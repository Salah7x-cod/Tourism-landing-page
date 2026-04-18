🏛️ Tourism Platform: Architecture & Tech Stack
Welcome to your project! As a beginner, looking at a full-stack application can feel overwhelming. This document breaks down exactly what technologies you are using, how they talk to each other, and the core concepts you can learn from this codebase.

1. The Technology Stack
You are building what is known as a Modern Full-Stack Application. It is divided into two distinct halves: The Frontend (what the user sees) and the Backend (the brain and database).

🎨 The Frontend (Client-Side)
Language: JavaScript (JSX)
Framework: React.js
Why? React allows you to build single-page applications (SPAs) by composing reusable UI components (like a Navbar or a DestinationCard).
Build Tool: Vite
Why? Vite acts as your "bundler" and local development server. It takes all your separate React files and compiles them extremely fast so the browser can read them.
Styling: Tailwind CSS
Why? Instead of writing separate .css files, Tailwind lets you style elements directly in your HTML/JSX using utility classes (e.g., text-white bg-blue-500).
Routing: React Router (react-router-dom)
Why? It allows users to transition between pages (Home -> Explore -> Login) without the webpage actually reloading.
⚙️ The Backend (Server-Side)
Language: Python
Framework: FastAPI
Why? FastAPI is one of the fastest, most modern web frameworks for Python. It automatically handles routing and generates API documentation.
Database ORM: SQLAlchemy
Why? Instead of writing raw SQL commands as strings (SELECT * FROM users), SQLAlchemy allows you to interact with your database using Python classes.
Database Engine: PostgreSQL
Why? A robust, highly reliable relational database that stores your Users, Destinations, and Bookings in structured tables.
Authentication: JWT (JSON Web Tokens) & Passlib (Bcrypt)
Why? Bcrypt securely scrambles (hashes) user passwords before saving them. JWT safely generates a temporary "session passport" when a user logs in.
2. How Everything Connects (The Flow)
Imagine you are at a restaurant. The Frontend is the waiter, the Backend API is the kitchen ticket system, and the Database is the pantry.

User Interaction (Explore.jsx): A user clicks a button to view destinations on the React website.
The API Call (src/lib/api.js): React triggers an HTTP request via the Javascript fetch() API. It shoots a GET request over the internet (or localhost) to http://localhost:8000/destinations.
The Backend Route (backend/app/api/routes.py): FastAPI catches this incoming request. It says, "Ah, someone wants the destinations! Let me grab the database session."
The Database Query (database.py & models.py): FastAPI uses SQLAlchemy to ask PostgreSQL for the destination records.
The Response: PostgreSQL hands the data to FastAPI. FastAPI packages it into a neat JSON envelope [{name: "Harar", ...}] and replies to the React frontend.
The UI Update (useState / useEffect): React receives the JSON, saves it into state (setDestinations(data)), and the screen instantly repaints to show the new destination cards!
3. What You Can Learn as a Beginner Here
This project is an absolute goldmine for learning modern web development. Here are the top concepts you should study directly from your code:

A. Component Reusability (Frontend)
Look at DestinationCard.jsx. Instead of writing the HTML for a card 8 different times in Explore.jsx, you wrote it once and used a React .map() function to loop over the data and generate 8 cards dynamically. This is the cornerstone of Don't Repeat Yourself (DRY) programming.

B. The useEffect Hook (Frontend)
In React, useEffect is how you tell a component to "do something right after you render." Look at useDestinations.js. You are using useEffect to trigger a backend fetch the exact second the user navigates to the Explore page.

C. Relational Databases & Foreign Keys (Backend)
Look at your Booking model in your Python database schemas. A booking doesn't copy the user's name or the destination's description. Instead, it stores user_id and destination_id. This is called a relational mapping. It teaches you how systems keep data lean by linking tables together rather than copying data!

D. Token-Based Authentication (Full-Stack)
This project perfectly demonstrates how modern login works. You can learn how the backend generates a scrambled JWT text string, hands it to React, and how React stores that string in localStorage. Every time React wants to book a trip, it attaches that Token to the API request to "prove" the user's identity.
