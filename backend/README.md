# Tourism Booking Backend

## Setup

1. Create a Python virtual environment.
2. Install dependencies:
   `pip install -r requirements.txt`
3. Copy `.env.example` to `.env` and update PostgreSQL credentials.
4. Run the API:
   `uvicorn main:app --reload --app-dir backend`

## API Overview

- `POST /api/auth/register` - register and receive JWT
- `POST /api/auth/login` - login and receive JWT
- `GET /api/auth/me` - authenticated user profile
- `GET /api/destinations` - list destinations
- `GET /api/destinations/{id}` - destination detail
- `POST /api/destinations` - admin-only destination creation
- `POST /api/bookings` - create booking
- `GET /api/bookings/me` - user bookings
- `POST /api/favorites/{destination_id}` - add favorite
- `DELETE /api/favorites/{destination_id}` - remove favorite
- `GET /api/favorites/me` - list favorites
- `GET /api/dashboard/me` - dashboard data (bookings + favorites)
- `POST /api/upload` - authenticated image upload, max 5 MB
- `POST /api/blogs` - authenticated blog submission, pending by default
- `GET /api/blogs` - public approved blogs, supports `destination_id` and `sort`
- `GET /api/blogs/pending` - admin pending blog review list
- `PATCH /api/blogs/{id}/status` - admin approve/reject blog posts
- `POST /api/destinations/{id}/comments` - authenticated, booking-verified comment creation
- `GET /api/destinations/{id}/comments` - public destination comments
- `PATCH /api/comments/{id}` - edit your own comment
- `DELETE /api/comments/{id}` - delete your own comment
