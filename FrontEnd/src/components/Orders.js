import React, { useEffect, useState } from "react";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from "@mui/material";

import Title from "./Title";
import { fDateTime } from "./formatTime";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

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
  });


  const [jobData, setJobData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <React.Fragment>
      <Title>Recent Job History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Job Company</TableCell>
            <TableCell>Job Status</TableCell>
            <TableCell align="right">Job Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell>{fDateTime(row.createdAt)}</TableCell>
                <TableCell>{row.jobName}</TableCell>
                <TableCell>{row.jobCompany}</TableCell>
                <TableCell>{row.jobStatus}</TableCell>
                <TableCell align="right">{row.jobDescription}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={jobData.length}
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
