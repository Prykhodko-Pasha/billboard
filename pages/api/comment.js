import isAllowedEditing from "../../helpers/isAllowedEditing";
import { verifyToken } from "../../helpers/tokenOperations";
import {
  addComment,
  updateComment,
  deleteComment,
  getComments,
} from "../../prisma/comments";

export default async function handle(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        // console.log("api comment req :>> ", req.query);
        const comments = await getComments(req.query.billId);
        return res.json(comments);
      }

      case "POST": {
        // Fields validation
        // const { error } = joiSchemaUser.validate(req.body);
        // if (error)
        //   return res.status(400).json({
        //     message: error.details[0].message,
        //   });

        // Create a new comment
        const newComment = await addComment(req.body);
        return res.json(newComment);
      }

      case "PATCH": {
        // Update an existing comment
        // console.log("req.body PATCH:>> ", req.body);
        const { id, ...updateData } = req.body;
        const comment = await updateComment(id, updateData);
        return res.json(comment);
      }

      case "DELETE": {
        // console.log("comment DELETE :>> ");
        // Verify token
        const user = await verifyToken(req);
        if (!user)
          return res.status(401).json({
            message: "Unauthorized",
          });
        const { id: userId, role } = user;
        // Is comment existing?
        // console.log("req.query :>> ", req.query);
        const { commentId } = req.query;
        const comment = await findcomment(commentId);
        // console.log("comment :>> ", comment);
        if (!comment)
          return res.status(404).json({
            message: "Comment not found",
          });
        // Does user have rights?
        if (isAllowedEditing(comment.authorId, userId, role)) {
          await deleteComment(commentId);
          return res.json("Comment deleted");
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
