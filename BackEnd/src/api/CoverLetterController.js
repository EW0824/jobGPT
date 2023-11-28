import express from "express";

import generateCoverLetter from "../LLM/main.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Welcome to letters page");
});
  

router.get("/generate", async (req, res) => {
  const name = req.params.name;
  const email = req.params.email;
  const phoneNumber = req.params.phoneNumber;
  const company = req.params.company;
  const position = req.params.position;
  const wordLimit = req.params.wordLimit;
  const PDFLink = req.params.PDFLink;
  const jobLink = req.params.jobLink;
  const addDescription = req.params.addDescription;
  const skills = req.params.skills;
  try {
    const letter = generateCoverLetter(
      name,
      email,
      phoneNumber,
      company,
      position,
      wordLimit,
      PDFLink,
      jobLink,
      addDescription,
      skills
    );

    res.status(200).send(letter);
  } catch (error) {
    res.status(500);
  }
});

export default router;
