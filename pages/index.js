import { getAllBills } from "../prisma/bills";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import BillsList from "../components/billsList";

export default function Home({ bills }) {
  return (
    <>
      <Typography
        variant="h4"
        align="left"
        sx={{ color: "#3498db", textTransform: "uppercase", margin: "20px 0" }}
      >
        Welcome to Billboard!
      </Typography>
      <Divider sx={{ width: "100%", margin: "20px 0" }} />

      {bills && <BillsList bills={bills} />}
    </>
  );
}

export async function getServerSideProps() {
  const allBills = await getAllBills();
  return {
    props: {
      bills: allBills.reverse(),
    },
  };
}
