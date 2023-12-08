import React, { useContext } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import BadgeIcon from "@mui/icons-material/Badge";
import { SessionContext } from "./ContextProvider";

export function MainListItems({ navigate }) {
  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/")}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Cover Letters" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/job-history")}>
        <ListItemIcon>
          <WorkHistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Job History" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BadgeIcon />
        </ListItemIcon>
        <ListItemText
          primary="Profile"
          onClick={() => {
            navigate("/profile");
          }}
        />
      </ListItemButton>
    </React.Fragment>
  );
}

export function SecondaryListItems({ navigate }) {
  const { sessionToken, setSessionToken } = useContext(SessionContext);

  const handleClick = async () => {
    try {
      await fetch("/auth/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setSessionToken({ userId: null });
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItemButton>
    </React.Fragment>
  );
}
