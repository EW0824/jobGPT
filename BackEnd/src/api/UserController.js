import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.session.user) {
      res.status(401).send({ error: "Please sign in to view this page" }); // 401 for unauthorized
      return;
    }

    // Find the user based on the session data or any identifier
    const user = await User.findById(req.session.user.userId)
      .populate("skillList")
      .populate("experienceList");

    if (!user) {
      res.status(404).send({ error: "User not found" }); // 404 for not found
      return;
    }

    const response = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      experienceList: user.experienceList,
      skillList: user.skillList,
    };

    res.status(200).send(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message }); // 500 for server error
  }
});

router.patch("/", async (req, res) => {
  try {
    if (!req.session.user) {
      res.status(401).send({ error: "Please sign in to view this page" }); // 401 for unauthorized
      return;
    }
    // console.log("doing PATCH method");
    // console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.session.user.userId,
      req.body
    );

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res
      .status(200)
      .send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
