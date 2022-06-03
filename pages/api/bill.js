import isAllowedEditing from "../../helpers/isAllowedEditing";
import { verifyToken } from "../../helpers/tokenOperations";
import {
  createBill,
  getUserBills,
  getAllBills,
  updateBill,
  findbill,
  deleteBill,
} from "../../prisma/bills";

export default async function handle(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        // console.log("api bill req :>> ", req.query);
        if (req.query.userId) {
          const userBills = await getUserBills(req.query.userId);
          return res.json(userBills);
        } else {
          const bills = await getAllBills();
          return res.json(bills);
        }
      }

      case "POST": {
        // Fields validation
        // const { error } = joiSchemaUser.validate(req.body);
        // if (error)
        //   return res.status(400).json({
        //     message: error.details[0].message,
        //   });

        // Create a new bill
        const newBill = await createBill(req.body);
        return res.json(newBill);
      }

      case "PATCH": {
        // Update an existing bill
        // console.log("req.body PATCH:>> ", req.body);
        const { id, ...updateData } = req.body;
        const bill = await updateBill(id, updateData);
        return res.json(bill);
      }

      case "DELETE": {
        // console.log("bill DELETE :>> ");
        // Verify token
        const user = await verifyToken(req);
        if (!user)
          return res.status(401).json({
            message: "Unauthorized",
          });
        const { id: userId, role } = user;
        // Is bill existing?
        // console.log("req.query :>> ", req.query);
        const { billId } = req.query;
        const bill = await findbill(billId);
        // console.log("bill :>> ", bill);
        if (!bill)
          return res.status(404).json({
            message: "Bill not found",
          });
        // Does user have rights?
        if (isAllowedEditing(bill.authorId, userId, role)) {
          await deleteBill(billId);
          return res.json("Bill deleted");
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
