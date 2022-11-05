import isAllowedEditing from "../../helpers/isAllowedEditing";
import { verifyToken } from "../../helpers/tokenOperations";
import { postVote, getVote } from "../../prisma/votes";

export default async function handle(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        // console.log("api vote req :>> ", req.query);
        const { billId, userId } = req.query;
        const votes = await getVote(billId, userId);
        return res.json(votes);
      }

      case "POST": {
        // Verify token
        const user = await verifyToken(req);
        if (!user)
          return res.status(401).json({
            message: "Unauthorized",
          });

        // Fields validation
        // const { error } = joiSchemaUser.validate(req.body);
        // if (error)
        //   return res.status(400).json({
        //     message: error.details[0].message,
        //   });

        // Post new vote
        const newVote = await postVote(req.body);
        return res.json(newVote);
      }

      default:
        break;
    }
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({ ...error, message: error.message });
  }
}
