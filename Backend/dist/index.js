"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Enable CORS for cross-origin requests
const db_1 = require("./src/utils/db");
const noteRoutes_1 = __importDefault(require("./src/routes/noteRoutes")); // Import the note routes
const auth_routes_1 = __importDefault(require("./src/routes/auth.routes"));
const auth_middleware_1 = require("./src/middlewares/auth.middleware");
const errorhandler_1 = require("./src/utils/errors/errorhandler");
const app = (0, express_1.default)();
// console.log("JWT_SECRET:------", process.env.JWT_SECRET);
// Middleware to parse JSON and handle CORS
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // to handle incoming JSON requests
const MONGO_CONNECTION_STRING = process.env.MONGO_URI;
app.use('/api/auth', auth_routes_1.default);
// API Routes for notes
app.use("/api", auth_middleware_1.authenticate, noteRoutes_1.default); // Note routes are now prefixed with `/api`
app.use(errorhandler_1.errorHandler);
const startServer = async () => {
    try {
        // Connect to MongoDB
        await (0, db_1.connectDB)(MONGO_CONNECTION_STRING);
        // Start the Express server
        app.listen(4000, () => {
            console.log(`🚀 Server is running on http://localhost:4000`);
        });
    }
    catch (err) {
        console.error("❌ Error:", err);
    }
};
startServer();
