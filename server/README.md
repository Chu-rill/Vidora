# Vidora Backend

A robust Express.js backend for a video chat application built with TypeScript, MongoDB, and Socket.IO.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **User Management**: User registration, login, profile management
- **Room Management**: Create, join, leave video chat rooms
- **Real-time Communication**: Socket.IO integration for real-time features
- **Security**: Helmet, CORS, rate limiting, input validation
- **Architecture**: Clean layered architecture (Routes → Controllers → Services → Repositories)
- **Database**: MongoDB with Mongoose ODM
- **TypeScript**: Full TypeScript support for type safety

## Architecture

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/         # Database models
├── repositories/   # Database access layer
├── routes/         # Route definitions
├── services/       # Business logic layer
├── types/          # TypeScript type definitions
└── server.ts       # Application entry point
```

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure your environment variables
4. Build the project: `npm run build`
5. Start the server: `npm start` (or `npm run dev` for development)

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/google` - Start Google OAuth
- `GET /api/auth/google/callback` - Handle OAuth callback

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (paginated)

### Rooms

- `POST /api/rooms` - Create a new room
- `GET /api/rooms` - Get all rooms (paginated)
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/rooms/:id/join` - Join a room
- `POST /api/rooms/:id/leave` - Leave a room

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - JWT expiration time (default: 7d)
- `BCRYPT_ROUNDS` - Bcrypt salt rounds (default: 12)
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Request rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization
- Error handling middleware

## Development

- Run in development mode: `npm run dev`
- Build for production: `npm run build`
- Run tests: `npm test`

## Socket.IO Integration

The server includes Socket.IO setup for real-time communication. The video call logic can be implemented in the Socket.IO connection handler in `server.ts`.

## Database Models

### User Model

- username, email, password
- avatar, online status, last seen
- Password hashing and comparison methods

### Room Model

- name, description, type (public/private)
- creator, participants, max participants
- active status and timestamps
