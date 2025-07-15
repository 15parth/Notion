import express from "express";
import dotenv from "dotenv";
import cors from "cors";  // Enable CORS for cross-origin requests
import { connectDB } from "./utils/db";
import noteRoutes from "./routes/noteRoutes";  // Import the note routes

dotenv.config();

const app = express();

// Middleware to parse JSON and handle CORS
app.use(cors());
app.use(express.json()); // to handle incoming JSON requests

const MONGO_CONNECTION_STRING = process.env.MONGO_URI!;

// API Routes for notes
app.use("/api", noteRoutes);  // Note routes are now prefixed with `/api`

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB(MONGO_CONNECTION_STRING);

    // Start the Express server
    app.listen(4000, () => {
      console.log(`🚀 Server is running on http://localhost:4000`);
    });
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

startServer();
