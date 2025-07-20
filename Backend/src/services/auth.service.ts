import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

console.log('jwt secret ---->', JWT_SECRET)

if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined in the environment variables!");
}

export const generateToken = (userId: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing!");
  }
  console.log("Generating token with secret:", JWT_SECRET);  // Log the secret (for debugging)
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing!");
  }
  console.log("Verifying token with secret:", JWT_SECRET);  // Log the secret (for debugging)
  return jwt.verify(token, JWT_SECRET);
};
