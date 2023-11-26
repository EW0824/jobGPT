import express from "express";

import parsePrompt from "../LLM/generator.js"
import generateCoverLetter from "../LLM/generator.js"
import { generateAndStoreEmbeddings } from "../LLM/parser.js";

const router = express.Router();


// SUBJECT TO A LOT OF MODIFICATION
router.get("/generate_letter", async (req, res) => {
    const name = req.params.name
    const email = req.params.email
    const phoneNumber = req.params.phoneNumber
    const company = req.params.company
    const position = req.params.position
    const wordLimit = req.params.wordLimit
    const PDFLink = req.params.PDFLink
    const jobLink = req.params.jobLink
    try {
        const embeddings = generateAndStoreEmbeddings(PDFLink, jobLink)

        // Still working on transforming embeddings to experience + jobDescription [trying out a more advanced approach]
        const jobDescription = ""
        const experiences = ""
        const prompt = parsePrompt(name, email, phoneNumber, company, jobDescription, experiences)
        const letter = generateCoverLetter(prompt, "")
        res.status(200).send(letter);
    } catch (error) {
        res.status(500)
    }
})

