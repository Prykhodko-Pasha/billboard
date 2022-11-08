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
import Router from "next/router";
import { deleteUserAPI } from "../services/users-api";
import { useUserContext } from "../context/provider";

export default function UsersList({ users }) {
  const [user, setUser] = useUserContext();

  const handleDelete = async (e) => {
    try {
      const userId = e.currentTarget.id;
      const user = await deleteUserAPI(userId);
      if (user) Router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    Array.isArray(users) && (
      <Box sx={{ width: "95%", margin: "0 auto" }}>
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
                <Link href={`/user/${id}`}>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      minWidth: 250,
                      minHeight: 250,
                      cursor: "pointer",
                      "&:hover": {
                        boxShadow: "0px 10px 20px 2px rgba(0, 0, 0, 0.25)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent
                        sx={{
                          flex: "1 0 auto",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
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
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            {email}
                          </Typography>
                        </div>
                        <div>
                          <Link href={`/user/edit/${id}`}>
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
                      </CardContent>
                    </Box>
                    <Box sx={{ display: "flex", alignContent: "center" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: "100%" }}
                        image="/avatar.png"
                        alt="me"
                      />
                    </Box>
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
