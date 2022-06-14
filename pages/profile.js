import { useEffect, useState } from "react";
import Router from "next/router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { getUserBillsAPI } from "../services/bills-api";
import BillsList from "../components/billsList";
import { useUserContext } from "../context/provider";
import TabPanel from "../components/TabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { getAllUsersAPI } from "../services/users-api";
import UsersList from "../components/usersList";

export default function Profile() {
  const [user, setUser] = useUserContext();
  const [billsPage, setBillsPage] = useState(1);
  const [billsCount, setBillsCount] = useState(1);
  const [usersPage, setUsersPage] = useState(1);
  const [usersCount, setUsersCount] = useState(1);
  const [bills, setBills] = useState(null);
  const [users, setUsers] = useState(null);
  const [tab, setTab] = useState(0);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    // setPage(1);
    // setCount(1);
  };

  useEffect(() => {
    if (user)
      try {
        const { id, role } = user;
        fetchUserBills(id, billsPage);
        if (role === "SUPERADMIN" || role === "Moderator") {
          fetchUsers(usersPage);
          setShowAllUsers(true);
        }
      } catch (error) {
        console.log("error:>> ", error);
      }
  }, [user]);

  const fetchUserBills = async (userId, page) => {
    const userBills = await getUserBillsAPI(userId, page);
    setBills(userBills.bills);
    setBillsCount(Math.ceil(userBills.count / 9));
  };

  const fetchUsers = async (page) => {
    const usersList = await getAllUsersAPI(page);
    setUsers(usersList.users);
    setUsersCount(Math.ceil(usersList.count / 9));
  };

  const handleNewBill = async (e) => {
    e.preventDefault();
    try {
      Router.push("/bill/edit");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = async (e, value) => {
    switch (tab) {
      case 0:
        setBillsPage(value);
        try {
          fetchUserBills(user.id, value);
        } catch (error) {
          console.log("error:>> ", error);
        }
        break;
      case 1:
        setUsersPage(value);
        try {
          fetchUsers(value);
        } catch (error) {
          console.log("error:>> ", error);
        }
        break;
      default:
        break;
    }
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

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

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="My bills" {...a11yProps(0)} />
            {showAllUsers && <Tab label="All users" {...a11yProps(1)} />}
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <BillsList bills={bills} />
        </TabPanel>
        {showAllUsers && (
          <TabPanel value={tab} index={1}>
            <UsersList users={users} />
          </TabPanel>
        )}
      </Box>

      {/* ==== Bills pagination ==== */}
      {tab === 0 && billsCount > 1 && (
        <Box mt={5}>
          <Pagination
            page={billsPage}
            size="large"
            count={billsCount}
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

      {/* ==== Users pagination ==== */}
      {tab === 1 && usersCount > 1 && (
        <Box mt={5}>
          <Pagination
            page={usersPage}
            size="large"
            count={usersCount}
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
