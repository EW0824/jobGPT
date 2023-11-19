import mongoose from "mongoose";
import pkg from "bcryptjs"

const { hashSync, compareSync } = pkg

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

userSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = hashSync(this.password, 10);
  }
});

userSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password)
}

const User = mongoose.model("User", userSchema);

export default User;
