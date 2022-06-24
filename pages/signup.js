import { useEffect, useState } from "react";
import Router from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import { addUserAPI } from "../services/users-api";
import { signupSchema } from "../helpers/validation";

export default function Registratoin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name && !email && !password) return; // skip the first render
    const formData = { name, email, password };
    const errors = {};
    signupSchema
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
  }, [name, email, password]);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;
    try {
      const credentials = { name, email, password };
      const user = await addUserAPI(credentials);
      if (user) await Router.push("/login");
    } catch (error) {
      console.log("error :>> ", error);
      // await setUser({ error: error.response.data.message });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      Router.push("/login");
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
          Registratoin page
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
            variant="filled"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={name}
            autoFocus
            onChange={handleChange}
            error={Boolean(error?.name)}
            helperText={error?.name}
          />

          <TextField
            margin="normal"
            variant="filled"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            autoComplete="email"
            onChange={handleChange}
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
              Password
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
              label="Password_"
            />
            <FormHelperText>{error?.password}</FormHelperText>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ m: "24px auto 0" }}
          >
            Register
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{ m: "24px auto 16px" }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
