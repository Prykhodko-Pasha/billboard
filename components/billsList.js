import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

export default function BillsList({ bills }) {
  return Array.isArray(bills) ? (
    <Box sx={{ width: "95%", margin: "0px" }}>
      <Grid container spacing={2}>
        {bills.map((bill, index) => (
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
                      {bill.title}
                    </Typography>
                    <div>
                      <Link href={`/edit/${bill.id}`}>
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
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </Box>
                  <Typography
                    align="left"
                    sx={{ width: "100%", marginTop: "16px" }}
                  >
                    {bill.text}
                  </Typography>
                </div>
                <Typography sx={{ color: "#ccc" }} align="right">
                  Author: {bill.author.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <p>You have no bills yet</p>
  );
}
