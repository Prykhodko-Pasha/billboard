import jwt from "jsonwebtoken";
import { findUser } from "../prisma/users";

const { SECRET_KEY } = process.env;

export default async function verifyToken(req) {
  console.log("req :>> ", req);
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization?.split(" ");
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await findUser(id);

    if (!authorization || bearer !== "Bearer" || !user) throw new Error();

    return user;
  } catch (error) {
    error.status = 401;
    error.message = "Not authorized";
    return error;
  }
}
