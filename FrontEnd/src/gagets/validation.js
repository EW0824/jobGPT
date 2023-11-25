export function validateJobPostForm(formData) {
  const errors = {};

  // Validate jobName
  const jobNameValidator = /^[a-zA-Z0-9\s-@_()]{10,50}$/;
  if (!formData.jobName.trim()) {
    errors.jobName = "Position is required";
  } else if (!jobNameValidator.test(formData.jobName)) {
    errors.jobName =
      "Position should be 10-50 characters long and may only contain letters, numbers, spaces, and hyphens.";
  }

  // Validate jobCompany
  const jobCompanyValidator = /^[a-zA-Z0-9\s\-()_[\]!@]{3,64}$/;
  if (!formData.jobCompany.trim()) {
    errors.jobCompany = "Company Name is required";
  } else if (!jobCompanyValidator.test(formData.jobCompany)) {
    errors.jobCompany =
      "Company Name should be 3-40 characters, including letters, numbers, spaces, and some special symbols";
  }

  if (!formData.jobDescription.trim()) {
    errors.jobDescription = "Job Description is required";
  } else if (
    formData.jobDescription.trim().length < 10 ||
    formData.jobDescription.trim().length > 1000
  ) {
    errors.jobDescription =
      "Job Description should be between 10 and 1000 characters.";
  }
  // console.log(errors);
  return errors;
}

export const validateSignUpForm = (formData) => {
  const errors = {};
  console.log(formData);
  // Define required fields for each role
  const requiredFields = {
    common: ["userName", "password", "email", "firstName", "lastName", "role"],
  };

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const usernameRegex = /^[A-Za-z0-9_]{3,15}$/; // Fixed the regex
  const firstNameRegex = /^[A-Za-z]{2,20}$/; // Fixed the regex
  const lastNameRegex = /^[A-Za-z]{2,20}$/; // Fixed the regex

  // Check common fields
  requiredFields.common.forEach((field) => {
    if (!formData[field]) {
      errors[field] = `Missing required field: ${field}`;
    } else if (field === "email" && !formData[field].match(emailRegex)) {
      errors[field] = "Invalid email address";
    } else if (field === "username" && !formData[field].match(usernameRegex)) {
      errors[field] =
        "Invalid username. It should consist 3 - 15 chars or numbers.";
    } else if (
      field === "first_name" &&
      !formData[field].match(firstNameRegex)
    ) {
      errors[field] = "Invalid first name. It should consist 2 - 20 chars.";
    } else if (field === "last_name" && !formData[field].match(lastNameRegex)) {
      errors[field] = "Invalid last name. It should consist 2 - 20 chars";
    } else if (field == "role" && formData[field] != "regularUser") {
      errors[field] = "Invalid Role of the User";
    }
  });
  return errors;
};
