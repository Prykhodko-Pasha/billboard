import isAllowedEditing from "../../helpers/isAllowedEditing";
import { verifyToken } from "../../helpers/tokenOperations";
import {
  createUser,
  deleteUser,
  findUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../../prisma/users";

export default async function handle(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        if (req.query.id) {
          // Get a single user if id is provided is the query
          // api/users?id=1
          const user = await getUser(req.query.id);
          return res.json(user);
        } else {
          // Otherwise, fetch all users
          const user = await verifyToken(req);
          // console.log("user GET:>> ", user);
          if (!user)
            return res.status(401).json({
              message: "Unauthorized",
            });
          const users = await getAllUsers({ ...user, ...req.query });
          return res.json(users);
        }

        return res.json(user);
      }

      case "POST": {
        // Fields validation
        // const { error } = joiSchemaUser.validate(req.body);
        // if (error)
        //   return res.status(400).json({
        //     message: error.details[0].message,
        //   });

        // Does user exist?
        // console.log("req.body :>> ", req.body);
        const user = await findUser(req.body.email);
        if (user) {
          //   await setUser({ error: "Email in use" });
          return res.status(409).json({
            message: "Email in use",
          });
        }

        // Create a new user
        const newUser = await createUser(req.body);
        return res.json(newUser);
      }

      case "PATCH": {
        // Update an existing user
        const { id, ...updateData } = req.body;
        const user = await updateUser(id, updateData);
        return res.json(user);
      }

      case "DELETE": {
        // Verify token
        const editor = await verifyToken(req);
        if (!editor)
          return res.status(401).json({
            message: "Unauthorized",
          });
        const { id: editorId, role } = editor;
        // Does user exist?
        const { userId } = req.query;
        const user = await getUser({ id: userId });
        if (!user)
          return res.status(404).json({
            message: "User not found",
          });
        // Does editor have rights?
        if (isAllowedEditing(editorId, userId, role)) {
          await deleteUser(userId);
          return res.json("User deleted");
        } else {
          return res.status(400).json("Not allowed");
        }
      }
      default:
        break;
    }
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({ ...error, message: error.message });
  }
}
