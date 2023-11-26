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
  Popover,
  MenuItem,
  TableHead,
  TableRow,
  TablePagination,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";

// component import
import Label from "../styles/Label";
import { sentenceCase } from "change-case";
import Iconify from "../styles/Iconify";
import Title from "./Title";
import { fDateTime } from "../gagets/formatTime";
import { useNavigate } from "react-router-dom";
import StyledSearch from "../styles/StyledSearch";

export default function Orders() {
  const [open, setOpen] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [jobData, setJobData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const handleOpenMenu = (event, jobId) => {
    setOpen(event.currentTarget);
    setSelectedJob(jobId);
    console.log("selected job id", jobId);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  //TODO: USE REAL ENDPOINTS
  const handleDeleteJob = () => {
    fetch(`job/${selectedJob}`, {
      method: "DELETE",
      // more session here
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Fail to delete!");
      })
      .then((data) => {
        if (data) {
          setOpen(null);
        }
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  //TODO: USE REAL ENDPOINTS
  const hanldeFavJob = () => {};

  useEffect(() => {
    fetch("/job", {
      method: "GET",
      credentials: 'include'
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw Error("Response not okay");
      })
      .then((data) => {
        console.log(data);
        setJobData(data);
      })
      .catch((error) => console.log(error));
  }, [handleDeleteJob]);

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
          <col style={{ width: "5%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Job Company</TableCell>
            <TableCell>Job Status</TableCell>
            <TableCell>Job Description</TableCell>
            <TableCell align="right">More Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredJob
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row._id}>
                <TableCell onClick={() => navigate(`/jobs/${row._id}`)}>
                  {index + 1}
                </TableCell>
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
                <TableCell>{row.jobDescription}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={(clickEvent) =>
                      handleOpenMenu(clickEvent, row._id)
                    }
                  >
                    <Iconify icon={"eva:more-vertical-fill"} />
                  </IconButton>
                </TableCell>
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
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => navigate(`/jobs/${selectedJob}`)}>
          <Iconify icon={"mdi:information-outline"} sx={{ mr: 2 }} />
          View Detail
        </MenuItem>
        <MenuItem sx={{ color: "error.main" }} onClick={handleDeleteJob}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
        <MenuItem sx={{ color: "info.main" }} onClick={hanldeFavJob}>
          <Iconify
            icon={"material-symbols-light:favorite-outline"}
            sx={{ mr: 2 }}
          />
          Mark as favorite
        </MenuItem>
      </Popover>

      <Link color="primary" href="#" sx={{ mt: 3 }}>
        See more Jobs
      </Link>
    </React.Fragment>
  );
}
