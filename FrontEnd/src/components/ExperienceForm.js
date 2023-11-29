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
      },
    ]);
    props.onExperiencesChange([
      ...experiences,
      {
        company: "",
        jobTitle: "",
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
            <TextField
              name="company"
              value={exp.company}
              onChange={(e) => handleExperienceChange(index, e)}
              style={{ marginBottom: "20px", width: "300px" }}
              placeholder="Company"
            />
            <TextField
              name="jobTitle"
              value={exp.jobTitle}
              onChange={(e) => handleExperienceChange(index, e)}
              style={{
                marginBottom: "20px",
                marginLeft: "20px",
                width: "350px",
              }}
              placeholder="Job Title"
            />
            <Button
              type="button"
              onClick={() => handleDeleteExperience(index)}
              style={{ marginTop: "10px", marginLeft: "20px" }}
            >
              Delete
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={addNewExperience}
          style={{ marginTop: "20px" }}
        >
          Add Another Experience
        </Button>
      </form>
    </div>
  );
};

export default ExperienceForm;
