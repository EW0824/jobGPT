// React Import
import React, { useEffect, useState } from "react";
// @mui Import
import { styled, alpha } from "@mui/material/styles";
import {
  Paper,
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

// component import
import Label from "../styles/Label";
import { sentenceCase } from "change-case";
import Iconify from "../styles/Iconify";
import Title from "./Title";
import { fDateTime } from "../gagets/formatTime";
import { useNavigate } from "react-router-dom";

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

export default function Orders() {
  useEffect(() => {
    fetch("http://localhost:8080/jobs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setJobData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [filterName, setFilterName] = useState("");
  const [jobData, setJobData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]); // Using the provided comparator function
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return array.filter(
        (el) =>
          el.jobCompany
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) !== -1 ||
          el.jobStatus.toString().toLowerCase().indexOf(query.toLowerCase()) !==
            -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  function compareIncreasing(a, b) {
    // Assuming a and b are numbers or strings that can be compared directly
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  let filteredJob = applySortFilter(jobData, compareIncreasing, filterName);
  const isNotFound = !filteredJob.length && !!filterName;
  return (
    <React.Fragment>
      <Title>Recent Job History</Title>
      <StyledSearch
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        placeholder="Search Company Or Status..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ color: "text.disabled", width: 20, height: 20 }}
            />
          </InputAdornment>
        }
        sx={{ mb: 1 }}
      />
      <Table size="medium">
        {/* To achieve fixed column width*/}
            <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Job Company</TableCell>
            <TableCell>Job Status</TableCell>
            <TableCell align="right">Job Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredJob
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row._id}>
                <TableCell onClick={()=>navigate(`/jobs/${row._id}`)}>{index+1}</TableCell>
                <TableCell>{fDateTime(row.createdAt)}</TableCell>
                <TableCell>{row.jobName}</TableCell>
                <TableCell>{row.jobCompany}</TableCell>
                <TableCell>
                  {" "}
                  <Label
                    color={
                      (row.jobStatus === "Applying" && "info") ||
                      (row.jobStatus === "Rejected" && "error") ||
                      "success"
                    }
                  >
                    {sentenceCase(row.jobStatus)}
                  </Label>
                </TableCell>
                <TableCell align="right">{row.jobDescription}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        {isNotFound && (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                <Typography variant="h5" paragraph>
                  Not found
                </Typography>
                <Typography variant="body2">
                  No results found for &nbsp;
                  <strong>&quot;{filterName}&quot;</strong>.
                  <br /> Try checking for typos or using complete words.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={filteredJob.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
      <Link color="primary" href="#" sx={{ mt: 3 }}>
        See more Jobs
      </Link>
    </React.Fragment>
  );
}
