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
import { Helmet } from "react-helmet-async";
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
    job_name: "",
    job_company: "",
    job_requirement: "",
    job_question: "",
    job_description: "",
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
        const response = await fetch("http://127.0.0.1:8000/job/api/posts", {
          method: "POST",
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          // console.log('Referral Job Post submitted successfully');
          setSuccessMessage("Referral Job Post Successfully Submitted");
          setErrorMessage("");
          setIsFormModified(false);
          // navigate(`/dashboard/job-posts/${jobId}`);
        } else {
          setErrorMessage(data.error);
        }
      } catch (error) {
        // console.log(formData);
        console.error("Error:", error);
      }
    } else {
      // Validation errors found, display them
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
    // Use spread operator to update the specific field in formData
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
                        {/* <Scrollbar> */}
                        <form onSubmit={handleSubmit} noValidate>
                          <FormControl fullWidth sx={{ mt: 0.75, mb: 3 }}>
                            <InputLabel> Position </InputLabel>
                            <Input
                              multiline
                              rows={1}
                              name="job_name"
                              value={formData.job_name}
                              onChange={handleChange}
                              required
                            />
                          </FormControl>

                          <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Company</InputLabel>
                            <Input
                              multiline
                              rows={1}
                              name="job_company"
                              value={formData.job_company}
                              onChange={handleChange}
                              required
                            />
                          </FormControl>

                          <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Requirements</InputLabel>
                            <Input
                              multiline
                              rows={2}
                              name="job_requirement"
                              value={formData.job_requirement}
                              onChange={handleChange}
                              required
                            />
                          </FormControl>
                          <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Description</InputLabel>
                            <Input
                              multiline
                              rows={2}
                              name="job_description"
                              value={formData.job_description}
                              onChange={handleChange}
                              required
                            />
                          </FormControl>

                          <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>Job Questions</InputLabel>
                            <Input
                              multiline
                              rows={2}
                              name="job_question"
                              value={formData.job_question}
                              onChange={handleChange}
                              required
                            />
                          </FormControl>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "10px",
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
                        {/* </Scrollbar> */}
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
