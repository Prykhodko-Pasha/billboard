import { findUser, updateUser } from "../../prisma/users";
import isPasswordMatching from "../../helpers/isPasswordMatching";
import { createToken, verifyToken } from "../../helpers/tokenOperations";

export default async function handle(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        // Fields validation
        // const { error } = joiSchemaUser.validate(req.body);
        // if (error)
        //   return res.status(400).json({
        //     message: error.details[0].message,
        //   });

        // Token verifying
        const user = await verifyToken(req);
        // console.log("user :>> ", user);
        if (!user)
          return res.status(401).json({
            message: "Unauthorized",
          });
        return res.json(user);
      }

      case "PUT": {
        // Fields validation
        // const { error } = joiSchemaUser.validate(req.body);
        // if (error)
        //   return res.status(400).json({
        //     message: error.details[0].message,
        //   });

        // Is password matching?
        const { email, password } = req.body;
        const user = await findUser(email);
        // console.log("user AUTH:>> ", user);
        if (!user || !isPasswordMatching(password, user.password))
          return res.status(401).json({
            message: "Email or password is wrong",
          });

        // Create a token
        const { id, ...userData } = user;
        const updateData = { ...userData, token: createToken(id) };
        const loginedUser = await updateUser(id, updateData);
        return res.json(loginedUser);
      }

      case "PATCH": {
        // Fields validation
        // const { error } = joiSchemaUser.validate(req.body);
        // if (error)
        //   return res.status(400).json({
        //     message: error.details[0].message,
        //   });

        // Token verifying and updating
        // console.log("req api auth:>> ", req);
        const { id, ...userData } = await verifyToken(req);
        const updateData = { ...userData, token: null };
        await updateUser(id, updateData);
        return res.status(204).send();
      }

      default:
        break;
    }
  } catch (error) {
    return res.status(error.status).json({ ...error, message: error.message });
  }
}
