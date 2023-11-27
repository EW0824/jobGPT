import {OutlinedInput} from "@mui/material";
import { styled } from "@mui/material/styles";


const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: "98%",
    transition: theme.transitions.create(["box-shadow", "width"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    "&:hover": {
      width: "100%", // Change width on hover
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", // Add boxShadow on hover
    },
    "&:focus": {
      width: "100%", // Change width on focus
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Add boxShadow on focus
      borderColor: "#80bdff", // Example border color on focus
    },
  }));

export default StyledSearch;