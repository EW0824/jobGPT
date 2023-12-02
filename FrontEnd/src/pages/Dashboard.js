import * as React from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";

export default function Dashboard() {
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
      tabName="Dashboard"
    ></Layout>
  );
}
