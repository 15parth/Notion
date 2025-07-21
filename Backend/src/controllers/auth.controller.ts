import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../services/auth.service';
import logger from '../utils/logger/logger';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  logger.info('Register controller hit', { email });

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      logger.warn(`User already exists: ${email}`);
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    logger.info(`User created: ${user._id}`);

    const token = generateToken(user._id.toString());
    logger.info(`Token generated for: ${user._id}`);

    res.status(201).json({ token });
  } catch (error) {
    logger.error('Error in register controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  logger.info('Login controller hit', { email });

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn(`Invalid login attempt: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString());
    logger.info(`User logged in: ${user._id}`);

    res.status(200).json({ token });
  } catch (error) {
    logger.error('Error in login controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
