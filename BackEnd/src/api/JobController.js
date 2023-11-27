import express from "express";
import Job from "../models/JobModel.js";
import User from "../models/userModel.js";

const router = express.Router();


// TODO:
// FAVORITEJOB_RELATED API is also NEEDED
// GET & POST, etc

// Get all jobs
router.get("/", async (req, res) => {
  try {
    if (!req.session.user) {
      res.status(401).send({ error: "Please sign in to view this page" }); // 401 for unauthorized
      return;
    }

    // Find the user based on the session data or any identifier
    const user = await User.findById(req.session.user.userId).populate('jobList');

    if (!user) {
      res.status(404).send({ error: "User not found" }); // 404 for not found
      return;
    }

    // Access the jobs associated with the user from their jobList
    const jobs = user.jobList;

    res.status(200).send(jobs);
  } catch (error) {
    res.status(500).send({ error: error.message }); // 500 for server error
  }
});

router.get("/:id", async (req, res) => {
  const jobId = req.params.id; // Use req.params.id to get the job ID from the URL parameter

  try {
    if (!req.session.user) {
      res.status(401).send({ error: "Please sign in to view this page" }); // 401 for unauthorized
      return;
    }
    const userId = req.session.user.userId;
    const user = await User.findById(userId).populate('jobList'); // Populate the user's jobList
    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }
    // Check if the job ID exists in the user's jobList
    const jobExists = user.jobList.some(job => job.equals(jobId)); // Assuming jobList contains job IDs
    if (!jobExists) {
      res.status(403).send({ error: "You do not have access to this job" }); // 403 for forbidden
      return;
    }
    // If the job exists in the user's jobList, retrieve the job details
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).send({ error: "Job not found" });
      return;
    }
    res.status(200).send(job);
  } catch (error) {
    res.status(500).send({ error: error.message }); // 500 for server error
  }
});

// Create a Job
router.post("/", async (req, res) => {
  try {
    if (!req.session.user) {
      res.status(401).send({ error: "Please sign in to view this page" }); // 401 for unauthorized
      return;
    }
    const data = req.body;
    const new_job = await Job.create(data);

    const userId = req.session.user.userId;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { jobList: new_job._id } },
      { new: true }
    );

    if (!user) {
      throw Error("Can not find user");
    }

    res.status(201).send(new_job);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a job by id
router.put("/:id", async (req, res) => {
  const jobId = req.params.id;

  try {
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).send({ error: "Job not found" });
    }

    res.status(200).send(updatedJob);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a job by id
router.delete("/:id", async (req, res) => {
  const jobId = req.params.id;

  try {
    const deleted_job = await Job.findByIdAndDelete(jobId);

    if (!deleted_job) {
      return res.status(404).send({ error: "Job not found" });
    }

    const userId = req.session.user.userId;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { jobList: deleted_job._id } },
      { new: true }
    );

    if (!user) {
      throw Error("User not found");
    }

    res.status(200).send({ sucess: "Job has been deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
