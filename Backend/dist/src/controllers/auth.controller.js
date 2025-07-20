"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_service_1 = require("../services/auth.service");
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const existing = await user_model_1.default.findOne({ email });
    if (existing)
        return res.status(400).json({ error: 'User already exists' });
    const user = await user_model_1.default.create({ name, email, password });
    const token = (0, auth_service_1.generateToken)(user._id.toString());
    res.status(201).json({ token });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_model_1.default.findOne({ email });
    if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = (0, auth_service_1.generateToken)(user._id.toString());
    res.status(200).json({ token });
};
exports.login = login;
