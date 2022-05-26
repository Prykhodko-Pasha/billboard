import jwt from "jsonwebtoken";
import { findUser } from "../prisma/users";

const { SECRET_KEY } = process.env;

export default async function verifyToken(req) {
  try {
    const { authorization } = req.headers;
    // console.log("authorization :>> ", authorization);
    const [bearer, token] = authorization?.split(" ");
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await findUser(id);

    if (!authorization || bearer !== "Bearer" || !user) throw new Error();

    return user;
  } catch (error) {
    error.isLoggedIn = 401;
    error.message = "Not authorized";
    return error;
  }
}
