import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { loadQARefineChain } from "langchain/chains";
import { loadAllDocs } from "./preprocessing.js";
import { PromptTemplate } from "langchain/prompts";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

/*
Useful Resources:

Assistant API: https://www.youtube.com/watch?v=Kn6k6ocEaK4&ab_channel=LiamOttley
Cover Letter Generation Idea: https://towardsdatascience.com/10-exciting-project-ideas-using-large-language-models-llms-for-your-portfolio-970b7ab4cf9e#a4d6

Langchain: https://www.youtube.com/watch?v=2xxziIWmaSA&ab_channel=GregKamradt%28DataIndy%29

CODE:
simple (js, API): https://github.com/orlando70/cover-letter-generator/tree/master
complicated (python, langchain): https://github.com/vinura/cover_generator_app?source=post_page-----be0813ba77e2--------------------------------
complicated article: https://vinuraperera.medium.com/i-decided-to-automate-writing-cover-letters-using-ai-and-you-can-use-what-i-built-be0813ba77e2
*/

const COVER_LETTER_PROMPT_FULL = `

Hope you are doing well! You are a recruiter at a large company with experience reading and writing cover letters. I need your help crafting a perfect letter for me. Here's information about me:

--------
name: {name}
email: {email}
phoneNumber: {phoneNumber}
--------

My experiences and skills:
--------
{experiences}
{skills}
--------

I am applying to work at {company} as a {position} with the following job description:
--------
{jobDescription}
--------

Please use information about what recruiters like to write a perfect cover letter. Make sure to highlight my experience and skills which are relevant to the job, and explain why I am a great fit for the position. Please keep it engaging, persuasive, and also professional. Keep it short, within {wordLimit} words. Thanks a lot for your help!
`;

const COVER_LETTER_PROMPT = `

Hope you are doing well! You are a recruiter at a large company with experience reading and writing cover letters. I need your help crafting a perfect letter for me. My name is {name}, with email {email} and phoneNumber {phoneNumber}.

I am applying to work at {company} as a {position}. Please use information about what recruiters like to write a perfect cover letter. Make sure to highlight my experience and skills which are relevant to the job, and explain why I am a great fit for the position using information from the job description. Please keep it engaging, persuasive, and also professional. Keep it short, within {wordLimit} words. Thanks a lot for your help!
`;


export default async function generateCoverLetter(
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
) {
  `
    PIPELINE:
    Step 1: Create model + chain
    Step 2: Load the PDF + Job and split docs
    Step 3: Write and store promptTemplate into RefineChain
    Step 4: generate embeddings and create vector store
    Step 5: Retrieve relevent documents given the promptTemplate [OPTIONAL]
    Step 6: call the chain on the relevant documents + question
  `;

  // STEP 1: Creating model and chain
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo-1106",
    // temperature controls how random the output -> higher the less deterministic
    temperature: 1.4,
    // openAIApiKey: API_KEY,
    // verbose: true,
  });

  const chain = loadQARefineChain(model);

  // STEP 2: Loading the PDF + job listing and split docs
  const docs = await loadAllDocs(PDFLink, jobLink);

  // STEP 3: Store promptTemplate

  `
  Approach 1:
  LLMChain (prompt, model)
  call chain with parameters

  Approach 2:
  StuffChain (model)
  call chain with prompt and docs

  Approach 3:
  RefineChain (model)
  + vector store/similarity search
  call chain with relevant docs and prompt

  Approach 4: -> RetrievalQA
  RunnableSequenceChain (model, prompt, etc)
  + system template
  + vector store/retriever

  Code here:
  RetrievalQAChain(QARefineChain + retriever)
  call chain on question

  Python one:
  RetrievalQAChain(model, retriever, stuff type)
  call chain on query
  `;

  const promptTemplate = PromptTemplate.fromTemplate(COVER_LETTER_PROMPT);
  const formattedPrompt = await promptTemplate.format({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    company: company,
    position: position,
    wordLimit: wordLimit,
  });

  // console.log(formattedPrompt)

  // STEP 4: generate embeddings and vector store

  // Embeddings: storing text in high-dimensional vector space
  const embeddings = new OpenAIEmbeddings({  
    // openAIApiKey: API_KEY 
  });

  // vectorStore: database to efficiently store and search for embeddings
  const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);

  // retriever: retrieve embedding vectors most similar to the embedded query
  const vectorStoreRetriever = vectorStore.asRetriever();

  // STEP 5: retrieve relevant documents given the prompt
  const relevantDocs =
    await vectorStoreRetriever.getRelevantDocuments(formattedPrompt);

  // console.log(relevantDocs)


  // STEP 6: CALL
  const letter = await chain.call({
    input_documents: relevantDocs,
    question: formattedPrompt,
  });

  console.log(letter.output_text);
  return letter.output_text;
}

// generateCoverLetter(
//   "Cocoa Touch",
//   "ctouch@gmail.com",
//   "8445550990",
//   "Google",
//   "Software Engineer",
//   "200",
//   "examples/example1.pdf",
//   "",
//   "",
//   ""
// );


// ------------------------
// EXAMPLE
// ------------------------
// async function getAnswer(question) {
//   // STEP 1: Load the vector store
//   const vectorStore = await HNSWLib.load(
//     "hnswlib",
//     new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
//   );

//   // STEP 2: Create the chain
//   const chain = new RetrievalQAChain({
//     combineDocumentsChain: loadQARefineChain(model),
//     retriever: vectorStore.asRetriever(),
//   });

//   // STEP 3: Get the answer
//   const result = await chain.call({
//     query: question,
//   });

//   return result.output_text;
// }
