import { Document } from "langchain/document";
import {
  RecursiveCharacterTextSplitter,
  TextSplitter,
} from "langchain/text_splitter";
import { loadExperiences, loadResume } from "./loadExperience.js";


export async function splitDocs(docs) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const output = await splitter.splitDocuments(docs);
  return output;
}

export async function splitText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const output = await splitter.createDocuments([text]);
  return output;
}



export async function loadAllDocs(addDescription, experiences) {
  const addDescriptionDoc = await splitText(addDescription);
  const experiencesDoc = await loadExperiences(experiences);

  // console.log("Additional description: ", addDescriptionSplit, "\n\n");

  const combinedDoc = addDescriptionDoc.concat(
    experiencesDoc
    // skillsSplit
  );

  console.log("Generating with the following info: ", combinedDoc);
  return combinedDoc;
}




// // To convert resume and job description into text embeddings and retriever
// export async function generateAndStoreEmbeddings(PDFLink, jobLink) {
//   // Load the resume and job description after applying the textsplitting steps
//   const resumeDoc = await loadPDFLocally(PDFLink);
//   const jobDescriptionDoc = await loadJob(jobLink);

//   const combinedDoc = resumeDoc.concat(jobDescriptionDoc);

//   //   Embeddings: storing text in high-dimensional vector space
//   //   vectorStore: retrieve embedding vectors most similar to the embedded query

//   const embeddings = new OpenAIEmbeddings();

//   const vectorStore = await HNSWLib.fromDocuments(combinedDoc, embeddings);

//   const vectorStoreRetriever = vectorStore.asRetriever();
// }

// generateAndStoreEmbeddings("examples/example1.pdf", "");

// ------------------------
// EXAMPLE
// ------------------------
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
