import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import {
  RecursiveCharacterTextSplitter,
  TextSplitter,
} from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";

const SYSTEM_TEMPLATE = `
Please use the following information about the user to answer. 
These are some basic information about the user:
--------
name: {name}
email: {email}
phoneNumber: {phoneNumber}
--------

This is the user's past experiences and skills
--------
{experiences}
{skills}
--------
`;

// To load the PDF from user
async function loadPDFLocally(path) {
  const loader = new PDFLoader(path);
  const documents = await loader.load();

  const docOutput = await splitDocs(documents);
  return docOutput;
}

// To load the job description
async function loadJob(link) {
  let example = `
    Job Title

    Software Engineer III, Augmented Reality

    Job Location

    Google Los Angeles, CA

    Job Overview

    In this role, you will write and test product or system development code. You will participate in, or lead design reviews with peers and stakeholders to decide amongst available technologies. You will contribute to existing documentation or educational content and adapt content based on product/program updates and user feedback. You will triage product or system issues and debug/track/resolve by analyzing the sources of issues and the impact on hardware, network, or service operations and quality.

    Compensation

    The US base salary range for this full-time position is $133,000-$194,000 + bonus + equity + benefits. Our salary ranges are determined by role, level, and location. The range displayed on each job posting reflects the minimum and maximum target for new hire salaries for the position across all US locations. Within the range, individual pay is determined by work location and additional factors, including job-related skills, experience, and relevant education or training. Your recruiter can share more about the specific salary range for your preferred location during the hiring process. Please note that the compensation details listed in US role postings reflect the base salary only, and do not include bonus, equity, or benefits.

    Responsibilities
    • Write robust, reliable, efficient, and testable software designed to run on compute-constrained android devices running perception pipelines at high frame rate and bandwidth.
    • Communicate, design, and implement decisions effectively through architecture/design documents and code.
    • Work collaboratively with other engineering teams to optimize performance and usability for use cases that leverage ML perception models on a novel platform.
    • Review code developed by other developers and provide feedback to ensure best practices.
    • Contribute to the overall efficiency and productivity of the engineering team through code, process enhancements, and software development workflow improvements.

    Requirements
    • Bachelors degree or equivalent practical experience.
    • 2 years of experience with software development in one or more programming languages, or 1 year of experience with an advanced degree.
    • 2 years of experience with data structures or algorithms in either an academic or industry setting.

    We're excited for you to apply`;

  const textOutput = splitText(example);
  return textOutput;
}

async function splitDocs(docs) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const output = await splitter.splitDocuments(docs);
  return output;
}

async function splitText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const output = await splitter.createDocuments([text]);
  return output;
}





// To convert resume and job description into text embeddings and retriever
export async function generateAndStoreEmbeddings(PDFLink, jobLink) {
  // Load the resume and job description after applying the textsplitting steps
  const resumeDoc = await loadPDFLocally(PDFLink);
  const jobDescriptionDoc = await loadJob(jobLink);

  const combinedDoc = resumeDoc.concat(jobDescriptionDoc);

  //   Embeddings: storing text in high-dimensional vector space
  //   vectorStore: retrieve embedding vectors most similar to the embedded query

  const embeddings = new OpenAIEmbeddings();

  const vectorStore = await HNSWLib.fromDocuments(combinedDoc, embeddings);

  const vectorStoreRetriever = vectorStore.asRetriever();
}

generateAndStoreEmbeddings("examples/example1.pdf", "");

// async function generateAndStoreEmbeddings() {
//   // STEP 1: Load the data
//   const trainingText = fs.readFileSync("training-data.txt", "utf8");

//   // STEP 2: Split the data into chunks
//   const textSplitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 1000,
//   });

//   // STEP 3: Create documents
//   const docs = await textSplitter.createDocuments([trainingText]);

//   // STEP 4: Generate embeddings from documents
//   const vectorStore = await HNSWLib.fromDocuments(
//     docs,
//     new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
//   );

//   // STEP 5: Save the vector store
//   vectorStore.save("hnswlib");
// }
