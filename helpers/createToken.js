import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export default function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
}
