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
        // Delete an existing bill
        const { billId, userId, role } = req.body;
        const bill = findbill(billId);
        if (!bill)
          return res.status(404).json({
            message: "Bill not found",
          });
        if (isAllowedEditing(bill.author.id, userId, role)) {
          await deleteBill(id);
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
