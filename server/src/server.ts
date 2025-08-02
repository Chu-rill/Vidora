import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import passport from "passport";
import { config } from "./config/config";
import { connectDB } from "./config/database";
import { setupPassport } from "./config/passport";
import { errorHandler } from "./middleware/errorHandler";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { roomRoutes } from "./routes/room.routes";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  })
);
app.use(limiter);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Session middleware for Passport
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Setup Passport strategies
setupPassport();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Socket.IO connection handling (placeholder for video chat logic)
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const startServer = async () => {
  try {
    await connectDB();
    const PORT = config.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
