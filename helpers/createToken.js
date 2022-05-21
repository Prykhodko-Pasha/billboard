import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export default function createToken(id) {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "24h" });
}
