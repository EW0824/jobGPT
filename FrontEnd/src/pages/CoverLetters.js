import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems, SecondaryListItems } from "../components/ListItems";
import { useNavigate } from "react-router-dom";
import Drawer from "../styles/Drawer";
import AppBar from "../styles/AppBar";
import { useState } from "react";
import Cookies from "universal-cookie";
import { validateJobPostForm } from "../gagets/Validation";
import ReactModal from "react-modal";
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

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormModified, setIsFormModified] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [openModalNow, setOpenModalNow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setOpenModalNow(false);
  };

  const [formData, setFormData] = useState({
    jobName: "",
    jobCompany: "",
    jobDescription: "",
    jobStatus: "Applying",
  });

  const [coverLetterData, setCoverLetterData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    company: "",
    position: "",
    wordLimit: "",
    PDFLink: "",
    jobLink: "",
    addDescription: "",
    skills: "",
  });

  const handleFormChange = () => {
    setIsFormModified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const errors = validateJobPostForm(formData);

    if (Object.keys(errors).length === 0) {
      if (!isFormModified) {
        setErrorMessage("");
        setSuccessMessage("");
        return;
      }

      try {
        console.log(formData);
        const response1 = await fetch("/job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data1 = await response1.json();
        console.log(data1);
        const response2 = await fetch("/user", {
          method: "GET",
        });
        const data2 = await response2.json();
        const updatedCoverLetterData = {
          name: data2.firstName,
          email: "",
          phoneNumber: "",
          company: formData.jobCompany,
          position: formData.jobName,
          wordLimit: "200",
          PDFLink: "",
          jobLink: "",
          addDescription: formData.jobDescription,
          skills: data2.skillList ?? [],
        };

        setCoverLetterData(updatedCoverLetterData);

        const queryString = new URLSearchParams(
          updatedCoverLetterData
        ).toString();
        const response3 = await fetch(`/letter/generate?${queryString}`, {
          method: "GET",
        });

        const data3 = await response3.text();
        console.log(data3);
        setOpenModalNow(true);
        openModal(data3);

        setIsLoading(false);

        if (data1.success) {
          console.log("success");
          setSuccessMessage("");
          setErrorMessage("");
          setIsFormModified(false);
        } else {
          console.log("error");
          setErrorMessage(data1.error);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      setIsLoading(false);
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
                            <InputLabel>Company Name</InputLabel>
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
                            >
                              Generate
                            </LoadingButton>
                          </div>
                          {isLoading ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "20px",
                              }}
                            >
                              <CircularProgress />
                            </div>
                          ) : (
                            <div></div>
                          )}
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

              <ReactModal
                isOpen={openModalNow}
                onRequestClose={closeModal}
                contentLabel="My Modal"
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  },
                  content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    maxWidth: "600px",
                  },
                }}
              >
                <h2>
                  Cover Letter for {coverLetterData.position} at{" "}
                  {coverLetterData.company}
                </h2>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    overflow: "auto",
                    maxWidth: "95%",
                    maxHeight: "400px",
                    overflowY: "auto",
                    margin: "auto",
                    lineHeight: 1.5,
                  }}
                >
                  {modalContent}
                </pre>
                <Button onClick={closeModal}>Close</Button>
              </ReactModal>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
