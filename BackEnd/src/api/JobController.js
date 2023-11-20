import express from "express";
import Job from "../models/JobModel.js";
import User from "../models/userModel.js";

const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const userId = req.header('User-ID');

    // Get a list of jobs associated with the current user
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Incorrect User. Please pass in correct user id.");
    }

    const jobs = [];

    for (let jobId of user.jobList) {
      const job = await Job.findById(jobId);

      if (job) {
        jobs.push(job); // Storing job information in the jobs object with jobId as key
      }
    }
    // Return jobs data as JSON
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error message as JSON
  }
});

// Get one job by id
router.get("/:id", async (req, res) => {
  try {
    const jobId = req.params.id; // Use req.params.id to get the job ID from the URL parameter
    const userId = req.header('User-ID');
    const user = await User.findById(userId); 
    if (!user) {
      throw new Error("Incorrect User. Please pass in correct user id.");
    }

    const jobList = user.jobList;
    if (!jobList.includes(jobId)) {
      // Check if jobId is not in jobList
      throw new Error("Job ID not associated with the user.");
    }

    const job = await Job.findById(jobId); // Use findById to search by a specific ID
    if (!job) {
      return res.status(404).send({ error: "Job not found" });
    }

    res.status(200).send(job);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return error message as JSON
  }
});

// Create a Job
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const userId = req.header('User-ID');
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Incorrect User. Please pass in correct user id.");
    }
    const newJob = await Job.create(data);
    user.jobList.push(newJob);
    user.save();
    res.status(201).send(newJob);
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

// Update a job by id
router.put("/:id", async (req, res) => {
  const jobId = req.params.id;
  try {
    const userId = req.header('User-ID');
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Incorrect User. Please pass in correct user id.");
    }
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
    const userId = req.header('User-ID');
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Incorrect User. Please pass in correct user id.");
    }

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).send({ error: "Job not found" });
    }
    user.jobList.pop(jobId);
    res.status(200).send({ sucess: "Job has been deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
