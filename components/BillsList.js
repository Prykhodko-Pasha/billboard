import Link from "next/link";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import isAllowedEditing from "../helpers/isAllowedEditing";
import { deleteBillAPI } from "../services/bills-api";
import { useUserContext } from "../context/provider";
import MyCKEditor from "./CKEditor";
import transformDateFormat from "../helpers/transformDateFormat";

export default function BillsList({ bills }) {
  const [user, setUser] = useUserContext();
  const { t } = useTranslation("common");

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const billId = e.currentTarget.id;
      const bill = await deleteBillAPI(billId);
      if (bill) Router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return bills?.length !== 0 ? (
    <Box sx={{ width: "95%", margin: "0 auto" }}>
      <Grid container spacing={2}>
        {bills?.map((bill, index) => {
          const {
            id,
            title,
            text,
            category,
            author,
            createdAt,
            rating = 0,
          } = bill;
          const formattedDate = transformDateFormat(createdAt);

          return (
            <Grid
              item
              sx={{ minWidth: "130px" }}
              xl={4}
              lg={6}
              md={6}
              xs={12}
              key={index}
            >
              <Link href={`/bill/${id}`}>
                <Card
                  sx={{
                    height: "250px",
                    cursor: "pointer",
                    background:
                      "linear-gradient(90deg,#e5e6e6 50%,transparent)",
                    "&:hover": {
                      boxShadow: "0px 10px 20px 2px rgba(0, 0, 0, 0.25)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      "&:last-child": { pb: "6px" },
                    }}
                  >
                    <div>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {/* TITLE */}
                        <Typography variant="h5" align="left">
                          {title}
                        </Typography>

                        {/* EDITING BUTTONS */}
                        {isAllowedEditing(author.id, user?.id, user?.role) && (
                          <Box sx={{ display: "flex", ml: 1 }}>
                            <Link href={`/bill/edit/${id}`}>
                              <IconButton
                                aria-label="edit"
                                size="large"
                                align="right"
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "#3498db",
                                    color: "#fff",
                                  },
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Link>
                            <IconButton
                              aria-label="delete"
                              size="large"
                              align="right"
                              sx={{
                                "&:hover": {
                                  backgroundColor: "#d32f2f",
                                  color: "#fff",
                                },
                              }}
                              id={id}
                              onClick={(e) => handleDelete(e)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                      {/* CATEGORY */}
                      <Typography mb={1} sx={{ color: "#aaa" }} align="left">
                        {category}
                      </Typography>

                      {/* TEXT */}
                      <div className="card_text">
                        <MyCKEditor text={text} id={index} editable={false} />
                      </div>
                    </div>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "16px",
                      }}
                    >
                      {/* AUTHOR + DATE */}
                      <Typography sx={{ color: "#aaa" }} align="left">
                        {author.email} | {formattedDate}
                      </Typography>
                      {/* RATING */}
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "24px",
                          fontWeight: "600",
                          color: "#aaa",
                        }}
                        align="right"
                      >
                        {rating.toFixed(1)}
                        <StarIcon sx={{ fontSize: 20 }} />
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  ) : (
    <Typography
      variant="h5"
      align="center"
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      {t("no_bills")}
    </Typography>
  );
}
