import * as React from "react";
import { Grid, Paper } from "@mui/material";

import DetailedJob from "../components/DetailedJob";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";

export default function DetailedJobs() {
  let { jobId } = useParams();
  console.log(jobId);
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
      tabName="Detailed Job View"
    >
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Grid item xs={12}>
          <DetailedJob jobId={jobId} />
        </Grid>
      </Paper>
    </Layout>
  );
}
