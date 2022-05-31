import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { getCookies } from "../helpers/cookies";
import isAllowedEditing from "../helpers/isAllowedEditing";
import { useEffect, useState } from "react";
import { deleteBillAPI } from "../services/bills-api";

export default function BillsList({ bills }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCookies() ? setUser(getCookies()) : setUser({ id: null, role: null });
  }, []);

  const handleDelete = async (billId) => {
    try {
      const { id: userId, role } = user;
      const credentials = { billId, userId, role };
      const bill = await deleteBillAPI(credentials);
      if (bill) await Router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    user &&
    Array.isArray(bills) && (
      <Box sx={{ width: "95%", margin: "0px" }}>
        <Grid container spacing={2}>
          {bills.map((bill, index) => {
            const { id, title, text, author } = bill;
            return (
              <Grid
                item
                sx={{ minWidth: "130px" }}
                xs={12}
                md={6}
                lg={4}
                key={index}
              >
                <Card sx={{ height: "250px" }}>
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
                        {isAllowedEditing(author.id, user.id, user.role) && (
                          <div>
                            <Link href={`/edit/${id}`}>
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
                              onClick={(id) => handleDelete(id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        )}
                      </Box>
                      <Typography
                        align="left"
                        sx={{ width: "100%", marginTop: "16px" }}
                      >
                        {text}
                      </Typography>
                    </div>
                    <Typography sx={{ color: "#ccc" }} align="right">
                      Author: {author.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    )
  );
}
