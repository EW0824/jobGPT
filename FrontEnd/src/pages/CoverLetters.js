import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems, SecondaryListItems } from "../components/ListItems";
import { useNavigate } from "react-router-dom";
import Drawer from "../styles/Drawer";
import AppBar from "../styles/AppBar";
import { useState } from "react";
import Cookies from "universal-cookie";
import { validateJobPostForm } from "../gagets/validation";

import {
  CardHeader,
  CardContent,
  Card,
  FormControl,
  InputLabel,
  Input,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const authToken = new Cookies().get("token");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormModified, setIsFormModified] = useState(false);

  // Initialize formData state to store form data
  const [formData, setFormData] = useState({
    jobName: "",
    jobCompany: "",
    jobDescription: "",
    jobStatus: "Applying",
  });

  const handleFormChange = () => {
    setIsFormModified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    const errors = validateJobPostForm(formData);

    if (Object.keys(errors).length === 0) {
      if (!isFormModified) {
        setErrorMessage(
          "You have already submitted a Referral Job Post with the same content. Please make changes before resubmitting."
        );
        setSuccessMessage("");
        return;
      }
      // proceed with form submission
      try {
        console.log(formData);
        const response = await fetch("/job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);

        if (data.success) {
          console.log("success");
          setSuccessMessage("Referral Job Post Successfully Submitted");
          setErrorMessage("");
          setIsFormModified(false);
        } else {
          console.log("error");
          setErrorMessage(data.error);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      setSuccessMessage("");
      setErrorMessage(
        "Please correct the following form errors.\n".concat(
          Object.values(errors).join("\n")
        )
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    handleFormChange();
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Cover Letters
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems navigate={navigate} />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems navigate={navigate} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12}>
              <Container style={{ maxWidth: "90%" }}>
                <Typography variant="h4" sx={{ mb: 5 }}>
                  Generate New Cover Letter
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={32} md={16} lg={16}>
                    <Card>
                      <CardHeader title="Content" />
                      <CardContent>
                        <form onSubmit={handleSubmit} noValidate>
                          <FormControl fullWidth sx={{ mt: 0.75, mb: 3 }}>
                            <InputLabel> Position </InputLabel>
                            <Input
                              multiline
                              rows={1}
                              name="jobName"
                              value={formData.jobName}
                              onChange={handleChange}
                              required
                            />
                          </FormControl>

                          <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Company</InputLabel>
                            <Input
                              multiline
                              rows={1}
                              name="jobCompany"
                              value={formData.jobCompany}
                              onChange={handleChange}
                              required
                            />
                          </FormControl>

                          <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Description</InputLabel>
                            <Input
                              multiline
                              rows={4}
                              name="jobDescription"
                              value={formData.jobDescription}
                              onChange={handleChange}
                              required
                            />
                          </FormControl>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "20px",
                            }}
                          >
                            <LoadingButton
                              type="submit"
                              size="large"
                              variant="contained"
                              // You can apply error style here based on your requirements
                            >
                              Create A New Job Post
                            </LoadingButton>
                          </div>
                        </form>
                        {errorMessage && (
                          <Alert
                            sx={{
                              justifyContent: "center",
                              marginTop: "10px",
                              whiteSpace: "pre-wrap",
                            }}
                            severity="error"
                          >
                            {" "}
                            {errorMessage}
                          </Alert>
                        )}
                        {successMessage && (
                          <Alert
                            sx={{
                              justifyContent: "center",
                              marginTop: "10px",
                            }}
                          >
                            {" "}
                            {successMessage}
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
