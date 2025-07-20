import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";  // Enable CORS for cross-origin requests
import { connectDB } from "./src/utils/db";
import noteRoutes from "./src/routes/noteRoutes";  // Import the note routes
import authRoutes from './src/routes/auth.routes';
import { authenticate } from './src/middlewares/auth.middleware';
import { errorHandler } from "./src/utils/errors/errorhandler";





const app = express();

// console.log("JWT_SECRET:------", process.env.JWT_SECRET);
// Middleware to parse JSON and handle CORS
app.use(cors());
app.use(express.json()); // to handle incoming JSON requests

const MONGO_CONNECTION_STRING = process.env.MONGO_URI!;

app.use('/auth', authRoutes);



// API Routes for notes
app.use("/api", authenticate, noteRoutes); 

app.use(errorHandler);

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
