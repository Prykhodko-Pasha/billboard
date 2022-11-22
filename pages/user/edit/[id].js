import { useEffect, useState } from "react";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import isAllowedEditing from "../../../helpers/isAllowedEditing";
import { getUser } from "../../../prisma/users";
import { useUserContext } from "../../../context/provider";
import { updateUserAPI } from "../../../services/users-api";

export default function EditUser({ data }) {
  const { id, name: initName, role: initRole, email: initEmail } = data;

  const [user, setUser] = useUserContext();
  const [name, setName] = useState(initName);
  const [email, setEmail] = useState(initEmail);
  const [role, setRole] = useState(initRole);
  const { t } = useTranslation("common");

  useEffect(() => {
    user &&
      !isAllowedEditing(id, user?.id, user?.role) &&
      Router.push("/profile");
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { id, name, email, role };
      const user = await updateUserAPI(credentials);
      if (user) Router.back();
    } catch (error) {
      // await setUser({ error: error.response.data.message });
      console.log("error :>> ", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          padding: "50px",
          borderRadius: "40px",
          position: "relative",
        }}
      >
        <Typography component="h1" variant="h5">
          {t("edit_user")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label={t("name")}
            name="name"
            value={name}
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label={t("email")}
            name="email"
            value={email}
            autoFocus
            onChange={handleChange}
          />
          <FormControl margin="normal" fullWidth>
            <InputLabel id="role-label">{t("role")}</InputLabel>
            <Select
              sx={{ width: "50%" }}
              labelId="role-label"
              name="role"
              value={role}
              label={t("role")}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={"User"}>{t("user")}</MenuItem>
              <MenuItem value={"Moderator"}>{t("moderator")}</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{
                margin: "0 auto",
                mt: 3,
              }}
              onClick={() => Router.back()}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                margin: "0 auto",
                mt: 3,
              }}
            >
              {t("save")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { params, locale } = context;
  const { id } = params;
  if (!id) return null;
  const userData = await getUser({ id });
  return {
    props: {
      data: userData,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
