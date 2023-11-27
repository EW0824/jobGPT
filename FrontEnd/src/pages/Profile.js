import * as React from "react";
import { useState } from "react";
import Select from "react-select";
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
import TextField from "@mui/material/TextField";

import Drawer from "../styles/Drawer";
import AppBar from "../styles/AppBar";

import skillsData from "../gagets/Skills.json";
import { Button } from "@mui/material";
import ExperienceForm from "../components/ExperienceForm";

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);

  const options = skillsData;

  const handleSubmit = (event) => {
    event.preventDefault();
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
              Profile
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
            <Grid container spacing={4}>
              <Grid item xs={12}>
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
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Experiences
                </Typography>
                <ExperienceForm />
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
                    onChange={setSkills}
                    placeholder="Enter your skills"
                  />
                  <Button type="submit" style={{ marginTop: "20px" }}>
                    {" "}
                    Save
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
