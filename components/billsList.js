import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

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
              <CardContent>
                <IconButton aria-label="delete" size="large" align="right">
                  <EditIcon />
                </IconButton>
                <Typography variant="h5" align="left">
                  {bill.title}
                </Typography>
                <Typography
                  align="left"
                  sx={{ width: "100%", marginRight: "16px" }}
                >
                  {bill.text}
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
