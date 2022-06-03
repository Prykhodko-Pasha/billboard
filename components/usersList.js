import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import isAllowedEditing from "../helpers/isAllowedEditing";
import { deleteBillAPI } from "../services/users-api";
import { useUserContext } from "../context/provider";

export default function UsersList({ users }) {
  const [user, setUser] = useUserContext();

  const handleDelete = async (userId) => {
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
    Array.isArray(users) && (
      <Box sx={{ width: "95%", margin: "0px" }}>
        <Grid container spacing={2}>
          {users.map((user, index) => {
            const { id, name, email, role } = user;
            return (
              <Grid
                item
                sx={{ minWidth: "130px" }}
                xs={12}
                md={6}
                lg={4}
                key={index}
              >
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    minWidth: 251,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5">
                        {name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {role}
                      </Typography>
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
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="/avatar.png"
                    alt="me"
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    )
  );
}
