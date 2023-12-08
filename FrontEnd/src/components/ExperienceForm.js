import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const ExperienceForm = (props) => {
  console.log("props.experienceList: ", props.experienceList);
  const [experiences, setExperiences] = useState(props.experienceList || []);

  useEffect(() => {
    setExperiences(props.experienceList || []);
  }, [props.experienceList]);
  console.log("experiences: ", experiences);

  const addNewExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        jobTitle: "",
        jobDescription: "",
      },
    ]);
    props.onExperiencesChange([
      ...experiences,
      {
        company: "",
        jobTitle: "",
        jobDescription: "",
      },
    ]);
  };

  const handleExperienceChange = (index, event) => {
    const updatedExperiences = experiences.map((experience, expIndex) => {
      if (index === expIndex) {
        return { ...experience, [event.target.name]: event.target.value };
      }
      return experience;
    });
    setExperiences(updatedExperiences);
    props.onExperiencesChange(updatedExperiences);
  };

  const handleDeleteExperience = (index) => {
    const filteredExperiences = experiences.filter(
      (_, expIndex) => expIndex !== index
    );
    setExperiences(filteredExperiences);
    props.onExperiencesChange(filteredExperiences);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {experiences.map((exp, index) => (
          <div key={index}>
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <TextField
                name="company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                style={{ marginRight: "20px", width: "300px" }}
                placeholder="Company"
              />
              <TextField
                name="jobTitle"
                value={exp.jobTitle}
                onChange={(e) => handleExperienceChange(index, e)}
                style={{ width: "300px" }}
                placeholder="Job Title"
              />
            </div>
            <TextField
              name="jobDescription"
              value={exp.jobDescription}
              onChange={(e) => handleExperienceChange(index, e)}
              multiline
              rows={4}
              style={{ width: "80%", boxSizing: "border-box" }}
              placeholder="Description (Copy from your resume...)"
            />
            <Button
              type="button"
              onClick={() => handleDeleteExperience(index)}
              style={{
                marginTop: "10px",
                marginLeft: "20px",
                backgroundColor: "#00aaaa",
                color: "white",
                padding: "10px 15px",
              }}
            >
              Delete
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={addNewExperience}
          style={{
            marginTop: "20px",
            backgroundColor: "#00aaaa",
            color: "white",
            padding: "10px 15px",
          }}
        >
          Add Another Experience
        </Button>
      </form>
    </div>
  );
};

export default ExperienceForm;
