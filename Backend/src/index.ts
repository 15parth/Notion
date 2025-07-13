import express from "express";
import { connectDB } from "./utils/db";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const MONGO_CONNECTION_STRING= process.env.MONGO_URI!

app.get("/", (req, res) => {
  res.send('This is the response');
});

const startServer = async () => {
  try {
    await connectDB(MONGO_CONNECTION_STRING);
    app.listen(4000, () => {
      console.log(`🚀 Server is running on http://localhost:4000`);
    });
  } catch (err) {
    console.error('❌ Error:', err);
  }
};

startServer();
