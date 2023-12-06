import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    jobName: {
      type: String,
      required: true,
    },
    description:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
