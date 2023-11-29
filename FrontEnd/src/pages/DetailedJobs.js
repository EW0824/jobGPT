import * as React from "react";
import {
  CssBaseline,
  IconButton,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  Container,
  Grid,
  Paper,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { MainListItems, SecondaryListItems } from "../components/ListItems";
import DetailedJob from "../components/DetailedJob";
import { useNavigate, useParams } from "react-router-dom";

import Drawer from "../styles/Drawer";
import AppBar from "../styles/AppBar";

const defaultTheme = createTheme();

export default function DetailedJobs() {
  let { jobId } = useParams();
  console.log(jobId);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
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
              Detailed Job View
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
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Grid item xs={12}>
                <DetailedJob jobId={jobId} />
              </Grid>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
