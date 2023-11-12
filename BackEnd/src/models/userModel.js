const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z]*$/.test(v);
        },
        message: "Must be all characters",
      },
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z ]*$/.test(v);
        },
        message: "Must be all characters",
      },
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          // You can add custom validation logic here
          // For example, checking if the username meets certain criteria
          return /[a-zA-Z0-9]/.test(v);
        },
        message: "Username must contain only letters and numbers",
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6, // Example minimum password length
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensure that each email is unique in the database
      validate: {
        validator: function (v) {
          // You can add a more sophisticated email validation logic here
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email address",
      },
    },
    role: {
      type: String,
      enum: ["regularUser", "premiumUser", "admin"],
      required: true,
    },
    jobList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    favoriteJobList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    experienceList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
    skillList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
  },
  { timestamps: true }
  // Useful if want to create Redacted User view
  // {autoCreate: false, autoIndex: false}
);

const User = mongoose.model("User", userSchema);

export default User;
