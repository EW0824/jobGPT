import React from "react";
import Grid from "@mui/material/Grid";
import Tables from "../components/Tables";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Layout from "../components/Layout";

export default function JobHistory() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  return (
    <Layout
      open={open}
      toggleDrawer={toggleDrawer}
      navigate={navigate}
      tabName="Job History"
    >
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: "700px",
          }}
        >
          <Tables />
        </Paper>
      </Grid>
    </Layout>
  );
}
