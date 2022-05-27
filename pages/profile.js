import { useEffect, useState } from "react";
import Router from "next/router";
import { getCookies } from "../helpers/cookies";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { getUserBillsAPI } from "../services/bills-api";
import BillsList from "../components/billsList";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bills, setBills] = useState(null);

  useEffect(() => {
    getCookies() ? setUser(getCookies()) : Router.push("/login");
  }, []);

  useEffect(() => {
    try {
      fetchUserBills(user.id);
    } catch (error) {
      console.log("error:>> ", error);
    }
  }, [user]);

  const fetchUserBills = async (id) => {
    const body = { userId: id };
    const userBills = await getUserBillsAPI(body);
    setBills(userBills.reverse());
  };

  const handleNewBill = async (e) => {
    e.preventDefault();
    try {
      Router.push("/bill");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card
        sx={{ display: "flex", justifyContent: "space-between", minWidth: 251 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {user?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {user?.role}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="/avatar.png"
          alt="me"
        />
      </Card>
      <Button
        variant="contained"
        size="large"
        sx={{
          margin: "0 auto",
          mt: 3,
          mb: 2,
        }}
        startIcon={<AddIcon />}
        onClick={handleNewBill}
      >
        Create a bill
      </Button>
      <Divider sx={{ width: "100%", margin: "20px 0" }} />
      <Typography
        variant="h4"
        align="left"
        sx={{ color: "#ccc", textTransform: "uppercase", margin: "20px 0" }}
      >
        My bills
      </Typography>
      <BillsList bills={bills} />
    </>
  );
}
