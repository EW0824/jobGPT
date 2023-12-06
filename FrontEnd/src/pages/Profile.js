import * as React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import skillsData from "../gagets/Skills.json";
import { Button } from "@mui/material";
import ExperienceForm from "../components/ExperienceForm";
import Layout from "../components/Layout";
import SaveIcon from "@mui/icons-material/Save";

export default function Profile() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const options = skillsData;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    experienceList: [],
    skillList: [],
  });

  useEffect(() => {
    fetch("/user", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error("Response error");
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setUserData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          experienceList: data.experienceList ?? [],
          skillList: data.skillList ?? [],
        });
        console.log("Fetched email:", userData.email);
        console.log("Fetched experienceList:", userData.experienceList);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSkillsChange = (selectedOptions) => {
    setUserData({
      ...userData,
      skillList: selectedOptions.map((option) => option.value),
    });
    console.log("skillList", userData.skillList);
  };

  const handleExperienceDataChange = (newExperiences) => {
    setUserData({
      ...userData,
      experienceList: newExperiences,
    });
    console.log("experienceList", userData.experienceList);
  };

  const handleSave = () => {
    fetch("/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Layout
      open={open}
      toggleDrawer={toggleDrawer}
      navigate={navigate}
      tabName="Personal Profile"
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="e-mail"
            variant="standard"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            autoComplete="phone-number"
            variant="standard"
            value={userData.phoneNumber}
            onChange={(e) =>
              setUserData({ ...userData, phoneNumber: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Experiences
        </Typography>
        <ExperienceForm
          onExperiencesChange={handleExperienceDataChange}
          experienceList={userData.experienceList}
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Skills
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <Select
            options={options}
            isMulti
            onChange={handleSkillsChange}
            value={userData.skillList.map((skill) => ({
              value: skill,
              label: skill,
            }))}
            placeholder="Enter your skills"
          />
          <Button
            type="submit"
            startIcon={<SaveIcon />}
            style={{
              marginTop: "40px",
              backgroundColor: "#007BFF",
              color: "white",
              padding: "10px 20px",
              fontSize: "14px",
            }}
            onClick={handleSave}
          >
            Save All
          </Button>
        </form>
      </Grid>
    </Layout>
  );
}
