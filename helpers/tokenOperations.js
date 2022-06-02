import jwt from "jsonwebtoken";
import { getUser } from "../prisma/users";

const { SECRET_KEY } = process.env;

export function createToken(id) {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "24h" });
}

export async function verifyToken(req) {
  try {
    const { authorization } = req.headers;
    // console.log("authorization :>> ", authorization);
    const [bearer, token] = authorization?.split(" ");
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await getUser({ id });

    if (!authorization || bearer !== "Bearer" || !user) throw new Error();

    return user;
  } catch (error) {
    error.user = 401;
    error.message = "Not authorized";
    return error;
  }
}
