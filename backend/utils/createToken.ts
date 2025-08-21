import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export function createToken(userEmail: string) {
  const payload = {
    email: userEmail,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
  return token;
}
