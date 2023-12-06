// React Import
import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

// component import
import Label from "../styles/Label";
import { sentenceCase } from "change-case";
import Iconify from "../styles/Iconify";
import Title from "./Title";
import { fDateTime } from "../gadgets/FormatTime";

export default function DetailedJob({ jobId }) {
  useEffect(() => {
    fetch(`/job/${jobId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Extracting specific fields from the fetched JSON object
        console.log(data);
        const {
          jobName,
          jobCompany,
          jobDescription,
          jobStatus,
          relevantSkills,
          relevantExperience,
          generatedCoverLetter,
        } = data;
        const selectedFields = {
          jobName,
          jobCompany,
          jobDescription,
          jobStatus,
        };
        console.log(relevantSkills);
        setJobData(selectedFields);
        setSkill(relevantSkills);
        setResult(generatedCoverLetter);
      })
      .catch((error) => console.log(error));
  }, []);

  const [jobData, setJobData] = useState([]);
  const [skill, setSkill] = useState([]);
  const [experience, setExperience] = useState([]);
  const [result, setResult] = useState("");

  return (
    <React.Fragment>
      <Title>Detailed View of Job</Title>
      {/* Table of Job-related information */}
      <Typography variant="h5" fontFamily={"Public Sans, sans-serif"}>
        Basic Job Information
      </Typography>
      <Table size="medium">
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "60%" }} />
        </colgroup>
        <TableBody>
          {Object.keys(jobData).map((key) => {
            let value = jobData[key];
            // Exclude specific keys
            if (key === "createdAt") {
              value = fDateTime(value);
            }
            return (
              <TableRow hover key={key} tabIndex={-1}>
                <TableCell component="th" scope="row" padding="none">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography
                      fontFamily={"Public Sans, sans-serif"}
                      variant="subtitle1"
                      noWrap
                    >
                      {key !== "jobStatus" ? sentenceCase(key) : "Job status"}
                    </Typography>
                  </Stack>
                </TableCell>
                {key !== "jobStatus" ? (
                  <TableCell>
                    <Typography
                      fontFamily={"Public Sans, sans-serif"}
                      variant="h7"
                    >
                      {value}
                    </Typography>
                  </TableCell>
                ) : (
                  <TableCell>
                    <Label
                      color={
                        (value === "Applying" && "info") ||
                        (value === "Rejected" && "error") ||
                        "success"
                      }
                    >
                      <Typography
                        fontFamily={"Public Sans, sans-serif"}
                        fontSize="subtitle"
                        noWrap
                      >
                        {sentenceCase(value)}
                      </Typography>
                    </Label>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* <Typography
        sx={{ mt: 5 }}
        variant="h5"
        fontFamily={"Public Sans, sans-serif"}
      >
        Skills Information
      </Typography>
      <Table size="medium">
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "60%" }} />
        </colgroup>
        <TableBody>
          {Object.keys(skill).map((key) => {
            let value = jobData[key];
            // Exclude specific keys
            if (key === "createdAt") {
              value = fDateTime(value);
            }
            return (
              <TableRow hover key={key} tabIndex={-1}>
                <TableCell component="th" scope="row" padding="none">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                      {key !== "linkedIn" ? sentenceCase(key) : key}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}

      {result && (
        <>
          <Typography
            sx={{ mt: 5 }}
            variant="h5"
            fontFamily={"Public Sans, sans-serif"}
          >
            Result
          </Typography>
          <Typography sx={{ mt: 3 }}>
            {result.split("\n").map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        </>
      )}
      <Link color="primary" href="/job-history" sx={{ mt: 5 }}>
        See All Jobs
      </Link>
    </React.Fragment>
  );
}
