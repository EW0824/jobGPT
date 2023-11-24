import React, { useState } from "react";
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
  FormControlLabel,
  Stack,
  Alert,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { validateSignUpForm } from "../gagets/validation";
import Iconify from "../styles/Iconify";

const defaultTheme = createTheme();

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formDataObject = {};
    for (const [key, value] of data.entries()) {
      formDataObject[key] = value;
    }
    formDataObject["role"] = "regularUser";
    console.log(formDataObject);
    const errors = validateSignUpForm(formDataObject);
    console.log(errors);
    if (Object.keys(errors).length !== 0) {
      const errorMessage = Object.values(errors)
        .map((error) => `    - ${error}`) // Four spaces before the hyphen
        .join("\n");
      setErrMsg(`Please correct the following form errors:\n${errorMessage}`);
    } else {
      setErrMsg("");
    }
    fetch("http://127.0.0.1:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setErrMsg(data.error);
        } else {
          setSuccessMsg("Log in Success");
          setTimeout(() => {
            navigate("/job-history");
          }, 1000); // 1 sec wait time
        }
      });
  };

  const handleInputChange = () => {
    setErrMsg("");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            width={500}
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoFocus
              onChange={handleInputChange}
            />
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
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
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
              onChange={handleInputChange}
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/sign-in" variant="body2" align="right">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>

            {errMsg && (
              <Alert
                alignItems="center"
                size="large"
                sx={{ whiteSpace: "pre-line", mt: 1 }}
                severity="error"
              >
                {errMsg}
              </Alert>
            )}
            {successMsg && (
              <Alert
                alignItems="center"
                size="large"
                sx={{ whiteSpace: "pre-line", mt: 1 }}
                severity="success"
              >
                {successMsg}
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
