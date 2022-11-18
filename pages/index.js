import { useEffect, useState } from "react";
import { getAllBills } from "../prisma/bills";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import BillsList from "../components/BillsList";
import { getAllBillsAPI } from "../services/bills-api";
import SortSelector from "../components/SortSelector";
import SearchInput from "../components/SearchInput";
import MultipleSelect from "../components/MultipleSelect";

export default function Home({ initBills, initCount }) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState("id");
  const [sortValue, setSortValue] = useState("desc");
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(Math.ceil(initCount / 9));
  const [bills, setBills] = useState(initBills);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      fetchBills(page, sortKey, sortValue, query, categories);
    } catch (error) {
      console.log("error:>> ", error);
    }
  }, [page, sortKey, sortValue, query, categories]);

  const fetchBills = async (
    page,
    sortKey,
    sortValue,
    search = "",
    categories
  ) => {
    const allBills = await getAllBillsAPI({
      page,
      sortKey,
      sortValue,
      search,
      categories,
    });
    setBills(allBills.bills);
    setCount(Math.ceil(allBills.count / 9));
    if (page > 1 && allBills.bills.length === 0) setPage(1);
  };

  const handleChangePage = async (e, value) => {
    setPage(value);
  };

  const handleChangeSort = async (sort) => {
    const [key, value] = sort.split(" ");
    setSortKey(key);
    setSortValue(value);
  };

  const handleSearch = async (value) => {
    setQuery(value);
  };

  return (
    <>
      {/* GREETINGS */}
      <Typography
        variant="h4"
        align="left"
        sx={{ color: "#3498db", textTransform: "uppercase", margin: "20px 0" }}
      >
        Welcome to Billboard!
      </Typography>
      <Divider sx={{ width: "100%", margin: "20px 0 8px" }} />

      {/* FILTERS */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          mb: "24px",
        }}
      >
        <SearchInput onEnter={handleSearch} />

        <SortSelector
          initSort={`${sortKey} ${sortValue}`}
          handleChangeSort={handleChangeSort}
        />

        <MultipleSelect categories={categories} setCategories={setCategories} />
      </Box>

      {/* BILLS */}
      {bills && <BillsList bills={bills} />}

      {/* PAGINATION */}
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

export async function getServerSideProps({ locale }) {
  const allBills = await getAllBills({
    page: 1,
    sortKey: "id",
    sortValue: "desc",
    search: "",
    categories: [],
  });
  return {
    props: {
      initBills: JSON.parse(JSON.stringify(allBills.bills)),
      initCount: allBills.count,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
