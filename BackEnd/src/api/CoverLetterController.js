import express from "express";

import generateCoverLetter from "../LLM/main.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to letters page");
});

router.post("/generate", async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    company,
    position,
    wordLimit,
    PDFLink,
    jobLink,
    addDescription,
    skills,
    experiences} = req.body;
  try {
    const letter = await generateCoverLetter(
      name,
      email,
      company,
      position,
      wordLimit,
      PDFLink,
      jobLink,
      addDescription,
      skills,
      experiences
    );

    res.status(200).send(letter);
    // console.log("200");
    console.log(letter);
  } catch (error) {
    res.status(500);
    console.error(error)
  }
});

export default router;
