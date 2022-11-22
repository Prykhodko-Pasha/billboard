import { useEffect, useState } from "react";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { getUserBillsAPI } from "../services/bills-api";
import { useUserContext } from "../context/provider";
import { getAllUsersAPI } from "../services/users-api";
import TabPanel from "../components/TabPanel";
import BillsList from "../components/BillsList";
import UsersList from "../components/UsersList";
import SortSelector from "../components/SortSelector";
import SearchInput from "../components/SearchInput";
import MultipleSelect from "../components/MultipleSelect";

export default function Profile() {
  const [user, setUser] = useUserContext();
  const [billsPage, setBillsPage] = useState(1);
  const [billsCount, setBillsCount] = useState(1);
  const [sortKey, setSortKey] = useState("id");
  const [sortValue, setSortValue] = useState("desc");
  const [usersPage, setUsersPage] = useState(1);
  const [usersCount, setUsersCount] = useState(1);
  const [bills, setBills] = useState(null);
  const [users, setUsers] = useState(null);
  const [tab, setTab] = useState(0);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation("common");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (user) {
      const { role } = user;
      if (role === "SUPERADMIN" || role === "Moderator") setShowAllUsers(true);
    }
  }, [user]);

  useEffect(() => {
    if (user)
      try {
        tab === 0 &&
          fetchUserBills(
            user.id,
            billsPage,
            sortKey,
            sortValue,
            query,
            categories
          );
        tab === 1 && fetchUsers(usersPage, query);
      } catch (error) {
        console.log("error:>> ", error);
      }
  }, [user, billsPage, sortKey, sortValue, tab, usersPage, query, categories]);

  const fetchUserBills = async (
    userId,
    page,
    sortKey,
    sortValue,
    search,
    categories
  ) => {
    const userBills = await getUserBillsAPI({
      userId,
      page,
      sortKey,
      sortValue,
      search,
      categories,
    });
    setBills(userBills.bills);
    setBillsCount(Math.ceil(userBills.count / 9));
    if (billsPage > 1 && userBills.bills.length === 0) setBillsPage(1);
  };

  const fetchUsers = async (page, search) => {
    const usersList = await getAllUsersAPI({ page, search });
    setUsers(usersList.users);
    setUsersCount(Math.ceil(usersList.count / 9));
    if (usersPage > 1 && usersList.users.length === 0) setUsersPage(1);
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
        break;

      case 1:
        setUsersPage(value);
        break;

      default:
        break;
    }
  };

  const handleChangeSort = async (sort) => {
    const [key, value] = sort.split(" ");
    setSortKey(key);
    setSortValue(value);
  };

  const handleSearch = async (value) => {
    setQuery(value);
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
        {t("create_bill")}
      </Button>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: "8px" }}>
          <Tabs value={tab} onChange={handleChange} centered>
            <Tab label={t("my_bills")} {...a11yProps(0)} />
            {showAllUsers && <Tab label={t("all_users")} {...a11yProps(1)} />}
          </Tabs>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            mb: "24px",
          }}
        >
          <SearchInput onEnter={handleSearch} />

          {tab === 0 && (
            <>
              <SortSelector
                initSort={`${sortKey} ${sortValue}`}
                handleChangeSort={handleChangeSort}
              />

              <MultipleSelect
                categories={categories}
                setCategories={setCategories}
              />
            </>
          )}
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

      {/* BILLS PAGINATION */}
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

      {/* USERS PAGINATION */}
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

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
