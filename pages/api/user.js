import {
  createUser,
  deleteUser,
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
          return res.status(200).json(user);
        } else {
          // Otherwise, fetch all users
          const users = await getAllUsers();
          return res.json(users);
        }
      }

      case "POST": {
        // Fields validation
        // const { error } = joiSchemaUser.validate(req.body);
        // if (error)
        //   return res.status(400).json({
        //     message: error.details[0].message,
        //   });

        // Does user exist?
        const user = await getUser(req.body.email);
        if (user)
          return res.status(409).json({
            message: "Email in use",
          });

        // Create a new user
        const newUser = await createUser(req.body);
        return res.json(newUser);
      }

      case "PUT": {
        // Update an existing user
        const { id, ...updateData } = req.body;
        const user = await updateUser(id, updateData);
        return res.json(user);
      }
      case "DELETE": {
        // Delete an existing user
        const { id } = req.body;
        const user = await deleteUser(id);
        return res.json(user);
      }
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ ...error, message: error.message });
  }
}
