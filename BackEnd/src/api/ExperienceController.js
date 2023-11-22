import express from "express";
import Experience from "../models/ExperienceModel.js";
import User from "../models/userModel.js";

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
    const experience_id = req.params.id;
    try {
      const experience = await Experience.findById(experience_id);
      if (!experience) {
        return res.status(404).send({ error: "Experience not found" });
      }
      res.status(200).send(experience);
    } catch (error) {
      res.status(500).send(error);
    }
});

// Create a new experience
//TODO: Prevent completely same experience being added repetitively?
router.post("/", async (req, res) => {
  try {
    const data = req.body
    const newExperience = new Experience(data);
    const savedExperience = await newExperience.save();

    const user_id = req.session.user.user_id
    const user = await User.findOneAndUpdate({_id: user_id},
      {$push: {experienceList: savedExperience._id}},
      {new: true})
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
    const experience_id = req.params.id;
    try {
      // Find and remove the experience by ID
      const deletedExperience = await Experience.findOneAndDelete({_id: experience_id});
  
      // Check if the experience exists
      if (!deletedExperience) {
        return res.status(404).send({ error: "Experience not found" });
      }

      const user_id = req.session.user.user_id
      const user = await User.findOneAndUpdate(
        {_id: user_id},
        {$pull: { experienceList: experience_id}},
        {new: true}
      )

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      res.status(200).send({success: "Successfully delete experience!"});
    } catch (error) {
      res.status(500).send(error.message);
    }
  });  

export default router;