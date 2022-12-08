import { useEffect, useState } from "react";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FilledInput from "@mui/material/FilledInput";
import FormHelperText from "@mui/material/FormHelperText";
import { loginUserAPI } from "../services/users-api";
import { useUserContext } from "../context/provider";
import { setCookies } from "../helpers/cookies";
import { loginSchema } from "../helpers/validation";

export default function LoginPage() {
  const [user, setUser] = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation("common");

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (!email && !password) return; // skip the first render
    const formData = { email, password };
    const errors = {};
    loginSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        err.inner.forEach(({ path, message }) => {
          errors[path] = message;
        });
        setError(errors);
      });
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;
    try {
      const credentials = { email, password };
      const user = await loginUserAPI(credentials);
      if (user) {
        await setUser(user);
        setCookies(user.token);
        Router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      Router.push("/signup");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
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
          textAlign: "center",
          padding: "50px",
          borderRadius: "40px",
          position: "relative",
        }}
      >
        <Typography component="h1" variant="h5">
          {t("login_page")}
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
            id="email"
            label={t("email")}
            name="email"
            value={email}
            autoComplete="email"
            onChange={handleChange}
            variant="filled"
            error={Boolean(error?.email)}
            helperText={error?.email}
          />

          <FormControl
            margin="normal"
            variant="filled"
            fullWidth
            required
            error={Boolean(error?.password)}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              {t("password")}
            </InputLabel>
            <FilledInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={t("password")}
            />
            <FormHelperText>{error?.password}</FormHelperText>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              margin: "0 auto",
              mt: 3,
            }}
          >
            {t("login")}
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              margin: "0 auto",
              mt: 3,
              mb: 2,
            }}
            onClick={handleRegistration}
          >
            {t("signup")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}