import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import BadgeIcon from "@mui/icons-material/Badge";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { useNavigate } from "react-router-dom";

// export const mainListItems = (
//   <React.Fragment>
//     <ListItemButton>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <HistoryEduIcon />
//       </ListItemIcon>
//       <ListItemText primary="Cover Letter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <WorkHistoryIcon />
//       </ListItemIcon>
//       <ListItemText primary="Job History" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <BadgeIcon />
//       </ListItemIcon>
//       <ListItemText primary="Profile" />
//     </ListItemButton>
//   </React.Fragment>
// );

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Authentication
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Sign In" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Sign Up" />
//     </ListItemButton>
//   </React.Fragment>
// );

export function MainListItems({ navigate }) {
  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <HistoryEduIcon />
        </ListItemIcon>
        <ListItemText primary="Cover Letter" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <WorkHistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Job History" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BadgeIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </React.Fragment>
  );
}

export function SecondaryListItems({ navigate }) {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Authentication
      </ListSubheader>
      <ListItemButton onClick={() => navigate("/sign-in")}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Sign In" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Sign Up" />
      </ListItemButton>
    </React.Fragment>
  );
}
