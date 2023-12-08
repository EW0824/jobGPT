import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Link,
  Grid,
  Box,
  InputAdornment,
  Typography,
  Container,
  IconButton,
  Avatar,
  Button,
  CssBaseline,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import Iconify from "../styles/Iconify";
import { SessionContext } from "../components/ContextProvider";
import theme from "../components/Theme";

const defaultTheme = theme;

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { sessionToken, setSessionToken } = useContext(SessionContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setSuccessMsg("Log in Failed!");
        throw new Error("Network response was not ok.");
      })
      .then((responseData) => {
        // console.log(responseData);
        setSuccessMsg("Log in Successfully!");
        setSessionToken(responseData);
        localStorage.setItem("sessionData", JSON.stringify(responseData));
        navigate("/job-history");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = () => {
    setSuccessMsg("");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            maxWidth: 600,
            margin: "auto",
            mt: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            style={{
              whiteSpace: "nowrap",
              fontWeight: "bold",
            }}
          >
            Welcome to jobGPT
          </Typography>
        </Box>

        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Link href="/sign-up" variant="body2" color="#556cd6">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Box>
          {successMsg && (
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              color={
                successMsg === "Log in Successfully!" ? "success" : "error"
              }
            >
              {successMsg}
            </Button>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
