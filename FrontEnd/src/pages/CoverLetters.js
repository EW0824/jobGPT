import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateJobPostForm } from "../gagets/Validation";
import ReactModal from "react-modal";
import * as pdfjsLib from 'pdfjs-dist';

import {
  CardHeader,
  CardContent,
  Card,
  FormControl,
  InputLabel,
  Input,
  Alert,
  colors,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Layout from "../components/Layout";

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
    generatedCoverLetter: "",
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
        setErrorMessage("Make some change before submitting again!");
        return;
      }
      setSuccessMessage("We are generating the Cover Letter in the backend and will shortly notify the result!");
      setErrorMessage("");
      try {
        const response2 = await fetch("/user", {
          method: "GET",
        });
        const data2 = await response2.json();

        const updatedCoverLetterData = {
          name: data2.firstName,
          email: data2.email,
          phoneNumber: data2.phoneNumber,
          company: formData.jobCompany,
          position: formData.jobName,
          wordLimit: "200",
          PDFLink: "",
          jobLink: "",
          addDescription: formData.jobDescription,
          skills: data2.skillList ?? [],
        };
        console.log("updatedCoverLetterData:", updatedCoverLetterData);
        setCoverLetterData(updatedCoverLetterData);

        const queryString = new URLSearchParams(
          updatedCoverLetterData
        ).toString();
        const response3 = await fetch(`/letter/generate?${queryString}`, {
          method: "GET",
        });

        const data3 = await response3.text();
        console.log("data3:", data3);
        setOpenModalNow(true);
        openModal(data3);

        setIsLoading(false);
        const updatedFormData = {
          ...formData,
          generatedCoverLetter: data3,
        };
        setFormData(updatedFormData);

        console.log("updatedFormData:", updatedFormData);
        const response1 = await fetch("/job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        });
        const data1 = await response1.json();
        console.log("data1:", data1);

        if (response1.ok) {
          console.log("success");
          setErrorMessage("");
          setSuccessMessage('Please view the result!');
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
    setErrorMessage('');
    setFormData({
      ...formData,
      [name]: value,
    });
    handleFormChange();
  };

  //Auto Form
  const [isAutoModified, setIsAutoModified] = useState(false);
  const [autoErrorMessage, setAutoErrorMessage] = useState("");

  const [autoData, setAutoData] = useState({
    jobLink: "",
    CV: "",
  })

  const handleAutoChange = () => {
    setIsAutoModified(true);
  };

  const handleAuto = (e) => {
    const { name, value } = e.target;
    setAutoErrorMessage('');
    setAutoData({
      ...autoData,
      [name]: value,
    });
    handleAutoChange();
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        try {
          // Load the PDF file
          const pdfDoc = await pdfjsLib.getDocument({ data: typedArray }).promise;

          console.log("Reader Loaded!")

          let textContent = '';
          
          // Loop through each page
          for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
              const page = await pdfDoc.getPage(pageNum);
              const text = await page.getTextContent();
              textContent += text.items.map(item => item.str).join(' ');
          }

          // Update state with the extracted text
          setAutoData({
            ...autoData,
            CV: textContent,
          })
          handleAutoChange();
          console.log(autoData.CV);
        } catch (error) {
          setAutoErrorMessage(error)
        }
      }
      
      reader.readAsArrayBuffer(file);

    } else {
      setAutoErrorMessage("File not in pdf format or does not exist.")
    }
  }

  return (
    <Layout
      open={open}
      toggleDrawer={toggleDrawer}
      navigate={navigate}
      tabName="Cover Letters"
    >
      <Typography variant="h4" sx={{ mb: 5 }}>
        Generate New Cover Letter
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={32} md={16} lg={16}>
          <Card>
            <CardHeader title="Enter Job URL & Upload a CV" />
            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <FormControl fullWidth sx={{ mt: 0.75, mb: 3 }}>
                  <InputLabel> Job Link </InputLabel>
                  <Input
                    multiline
                    rows={1}
                    name="jobLink"
                    value={autoData.jobLink}
                    onChange={handleAuto}
                    required
                  />
                </FormControl>

                <div>
                  <p style={{color: "grey"}}>
                    &nbsp;&nbsp;&nbsp;CV Upload
                  </p>
                </div>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
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
                  <LoadingButton type="submit" size="large" variant="contained">
                    Log and Generate!
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
                  {successMessage}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div style={{ height: '50px' }}>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={32} md={16} lg={16}>
          <Card>
            <CardHeader title="Manually Enter Job Information" />
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
                  <LoadingButton type="submit" size="large" variant="contained">
                    Log and Generate!
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
                  {successMessage}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
    </Layout>
  );
}
