import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatGPTPluginRetriever } from "langchain/retrievers/remote";
import { OpenAIModerationChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { generateAndStoreEmbeddings } from "./preprocessing";

// DONT WORRY ABOUT OPENAIKEY -> they disable it if accidentally uploaded

const COVER_LETTER_PROMPT = `Hope you are doing well! You are a recruiter at a large company with experience reading and writing cover letters. I need your help crafting a perfect letter for me, with name {name}, email '{email}' and phone number '{phoneNumber}'. I am applying to work at {company} as a {position} with the following job description: {jobDescription}. I have the following experiences: {experiences}. Please use information about what recruiters like to write a perfect cover letter. Make sure to highlight my experience and skills which are relevant to the job, and explain why I am a great fit for the position. Please keep it engaging, persuasive, and also professional. Keep it short, within {wordLimit} words. Thanks a lot for your help!`;

// BASIC EXAMPLE
async function test() {
  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo-1106",
    temperature: 1.3,
    openAIApiKey: "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",
    // temperature controls how random the output -> higher the less deterministic
    // verbose: true,
  });

  // const chatModel = new ChatOpenAI({
  //   modelName: "gpt-3.5-turbo-1106",
  //   temperature: 1.4,
  //   openAIApiKey: "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",
  // });

  const text =
    "Hello, can you please generate a cover letter for me? I am applying for a software engineer job at Google. I am a graduate of UCLA pursuing a BS in Computer Science and am very passioante in both algorithms and AI. Please keep the cover letter engaging, persuasive, and also professional. Also keep it short and not too long. Thank you so much!";

  const llmResult = await llm.predict(text);
  // const chatResult = await chatModel.predict(text);

  console.log(llmResult);
  // console.log(chatResult);
}

// Prompt Template
export async function parsePrompt(
  name,
  email,
  phoneNumber,
  company,
  position,
  jobDescription,
  experiences,
  wordLimit
) {
  jobDescription =
    "Working with robots and transformers to create a new Death Star";
  experiences = [
    "BS in computer science at UCLA",
    "Worked at Apple",
    "Created startup",
  ];

  const simpleTemplate = `Hope you are doing well! You are a recruiter at a large company with experience reading and writing cover letters. I need your help crafting a perfect letter for me, with name {name}, email '{email}' and phone number '{phoneNumber}'. I am applying to work at {company} as a {position} with the following job description: {jobDescription}. I have the following experiences: {experiences}. Please use information about what recruiters like to write a perfect cover letter. Make sure to highlight my experience and skills which are relevant to the job, and explain why I am a great fit for the position. Please keep it engaging, persuasive, and also professional. Keep it short, within {wordLimit} words. Thanks a lot for your help!`;

  const promptTemplate = PromptTemplate.fromTemplate(simpleTemplate);

  const formattedPrompt = await promptTemplate.format({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    company: company,
    position: position,
    jobDescription: jobDescription,
    experiences: experiences,
    wordLimit: wordLimit,
  });

  console.log(formattedPrompt);
}

export async function generate(formattedPrompt, openAIApiKey) {
  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo-1106",
    temperature: 1.4,
    openAIApiKey: openAIApiKey,
    // temperature controls how random the output -> higher the less deterministic
    verbose: true,
  });

  // experimented with different methods call, invoke, predict
  // it seems like for generation predict > call > invoke
  const res = await llm.predict(formattedPrompt);
  console.log(res);
}

// test()
prompt = parsePrompt(
  "Edmond",
  "edmond@gmail.com",
  "123123123",
  "Wang Enterprise",
  200
);
letter = generate(
  prompt,
  "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"
);

async function generateCoverLetter(path, link) {
  generateAndStoreEmbeddings(path, link);
}
