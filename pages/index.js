import { useState } from "react";
import { getAllBills } from "../prisma/bills";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import BillsList from "../components/billsList";
import { getAllBillsAPI } from "../services/bills-api";

export default function Home({ initBills, initCount }) {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(Math.ceil(initCount / 9));
  const [bills, setBills] = useState(initBills);

  const fetchBills = async (page) => {
    const allBills = await getAllBillsAPI(page);
    setBills(allBills.bills);
    setCount(Math.ceil(allBills.count / 9));
  };

  const handleChangePage = async (e, value) => {
    setPage(value);
    try {
      fetchBills(value);
    } catch (error) {
      console.log("error:>> ", error);
    }
  };

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

      {count > 1 && (
        <Box mt={5}>
          <Pagination
            page={page}
            size="large"
            count={count}
            shape="rounded"
            showFirstButton
            showLastButton
            sx={{
              "& ul": {
                justifyContent: "center",
              },
            }}
            onChange={handleChangePage}
          />
        </Box>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const allBills = await getAllBills(1); // page = 1
  return {
    props: {
      initBills: allBills.bills,
      initCount: allBills.count,
    },
  };
}
