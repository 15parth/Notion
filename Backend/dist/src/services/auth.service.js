"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
console.log('jwt secret ---->', JWT_SECRET);
if (!JWT_SECRET) {
    console.error("❌ JWT_SECRET is not defined in the environment variables!");
}
const generateToken = (userId) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is missing!");
    }
    console.log("Generating token with secret:", JWT_SECRET); // Log the secret (for debugging)
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, {
        expiresIn: '7d',
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is missing!");
    }
    console.log("Verifying token with secret:", JWT_SECRET); // Log the secret (for debugging)
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyToken = verifyToken;
