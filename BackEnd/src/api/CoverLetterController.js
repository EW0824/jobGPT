import express from "express";

import generateCoverLetter from "../LLM/main.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to letters page");
});

router.get("/generate", async (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  const phoneNumber = req.query.phoneNumber;
  const company = req.query.company;
  const position = req.query.position;
  const wordLimit = req.query.wordLimit;
  const PDFLink = req.query.PDFLink;
  const jobLink = req.query.jobLink;
  const addDescription = req.query.addDescription;
  const skills = req.query.skills;
  try {
    console.log(name, email, phoneNumber);
    console.log(req.query);
    const letter = await generateCoverLetter(
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
    console.log("200");
    console.log(letter);
  } catch (error) {
    res.status(500);
    console.log("500");
  }
});

export default router;
