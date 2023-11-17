import express from "express";
import Experience from "../models/ExperienceModel.js";

const router = express.Router();

// Get all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).send(experiences);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get experience by ID
router.get("/:id", async (req, res) => {
    const experienceId = req.params.id;
    try {
      const experience = await Experience.findById(experienceId);
      if (!experience) {
        return res.status(404).send({ error: "Experience not found" });
      }
      res.status(200).send(experience);
    } catch (error) {
      res.status(500).send(error);
    }
});

// Create a new experience
router.post("/", async (req, res) => {
  try {
    const data = req.body
    const newExperience = new Experience(data);
    const savedExperience = await newExperience.save();
    //after create a new experience
    //add this id to User     
    // const userId = req.user.id; // Adjust this based on your authentication setup
    // Add the experience's ID to the user's experiences array
    // const user = await User.findByIdAndUpdate(
    //     userId,
    //     { $push: { experiences: savedExperience._id } },
    //     { new: true }
    // );
    res.status(201).send(savedExperience);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an existing experience by ID
router.put("/:id", async (req, res) => {
  const experienceId = req.params.id;

  try {
    const experience = await Experience.findByIdAndUpdate(
      experienceId,
      req.body,
      { new: true }
    );
    if (!experience) {
      return res.status(404).send({ message: "Experience not found" });
    }
    res.status(200).send(experience);
  } catch (error) {
    res.status(500).send(error);
  }
});


// DELETE - Remove an experience by ID; Also remove this ID in User.ExperienceList
router.delete("/:id", async (req, res) => {
    const experienceId = req.params.id;
    try {
      // Find and remove the experience by ID
      const deletedExperience = await Experience.findByIdAndRemove(experienceId);
  
      // Check if the experience exists
      if (!deletedExperience) {
        return res.status(404).send({ error: "Experience not found" });
      }
    //   // Assuming you also want to remove the experience ID from the user's experiences array
    //   const userId = req.user.id; // Adjust this based on your authentication setup
  
    //   // Remove the experience ID from the user's experiences array
    //   const user = await User.findByIdAndUpdate(
    //     userId,
    //     { $pull: { experiences: experienceId } },
    //     { new: true }
    //   );
  
    //   // Check if the user exists
    //   if (!user) {
    //     return res.status(404).send({ error: "User not found" });
    //   }
      res.status(200).send({success: "Successfully delete experience!"});
    } catch (error) {
      res.status(500).send(error);
    }
  });  

export default router;
