import {
  createBill,
  getUserBills,
  getAllBills,
  updateBill,
  //   updateUser,
} from "../../prisma/bills";

export default async function handle(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        // console.log("api bill req :>> ", req);
        if (req.query.userId) {
          // Get a single user if id is provided is the query
          // api/users?id=1
          const userBills = await getUserBills(req.query.userId);
          return res.json(userBills);
        } else {
          // Otherwise, fetch all users
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
        // Update an existing user
        console.log("req.body PATCH:>> ", req.body);
        const { id, ...updateData } = req.body;
        const bill = await updateBill(id, updateData);
        return res.json(bill);
      }

      //   case "DELETE": {
      //     // Delete an existing user
      //     const { id } = req.body;
      //     const user = await deleteUser(id);
      //     return res.json(user);
      //   }
      default:
        break;
    }
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({ ...error, message: error.message });
  }
}
