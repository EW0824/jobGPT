import { loadQARefineChain } from "langchain/chains.js";
import { parsePrompt, generate } from "../LLM/generator.js";
import { generateAndStoreEmbeddings } from "./preprocessing.js";
import { PromptTemplate } from "langchain/prompts.js";

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

const COVER_LETTER_PROMPT = `

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

async function generateCoverLetter(
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
    Step 1: Write and store promptTemplate into RefineChain
    Step 2: Load the PDF + Job and split docs
    Step 3: generate embeddings and create vector store
    Step 4: Retrieve relevent documents given the promptTemplate [OPTIONAL]
    Step 5: call the chain on the relevant documents + question
    `

  const embeddings = generateAndStoreEmbeddings(PDFLink, jobLink);


  
  const promptTemplate = PromptTemplate.fromTemplate(COVER_LETTER_PROMPT);
  const formattedPrompt = await promptTemplate.format({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    company: company,
    position: position,
    jobDescription: addDescription,
    experiences: experiences,
    wordLimit: wordLimit,
  })


  const jobDescription = "";
  const experiences = "";
  const prompt = parsePrompt(
    name,
    email,
    phoneNumber,
    company,
    jobDescription,
    experiences,
    wordLimit
  );
  const letter = generate(prompt, "");

  const model = new OpenAI({
    modelName: "gpt-3.5-turbo-1106",
    temperature: 1.4,
    openAIApiKey: openAIApiKey,
    // temperature controls how random the output -> higher the less deterministic
    verbose: true,
  });

  const chain = loadQARefineChain(model);

  return letter;
}

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
