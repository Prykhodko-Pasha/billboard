import Link from "next/link";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import isAllowedEditing from "../helpers/isAllowedEditing";
import { deleteBillAPI } from "../services/bills-api";
import { useUserContext } from "../context/provider";
import MyCKEditor from "./CKEditor";

export default function BillsList({ bills }) {
  const [user, setUser] = useUserContext();

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

  return (
    Array.isArray(bills) && (
      <Box sx={{ width: "95%", margin: "0 auto" }}>
        <Grid container spacing={2}>
          {bills.map((bill, index) => {
            const { id, title, text, category, author } = bill;
            return (
              <Grid
                item
                sx={{ minWidth: "130px" }}
                xs={12}
                md={6}
                lg={4}
                key={index}
              >
                <Link href={`/bill/${id}`}>
                  <Card
                    sx={{
                      height: "250px",
                      cursor: "pointer",
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
                          <Typography variant="h5" align="left">
                            {title}
                          </Typography>

                          {isAllowedEditing(
                            author.id,
                            user?.id,
                            user?.role
                          ) && (
                            <div>
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
                            </div>
                          )}
                        </Box>
                        <Typography mb={1} sx={{ color: "#ccc" }} align="left">
                          {category}
                        </Typography>

                        <div className="card_text">
                          <MyCKEditor text={text} id={index} editable={false} />
                        </div>
                      </div>
                      <Typography sx={{ color: "#ccc" }} align="right">
                        Author: {author.email}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    )
  );
}
