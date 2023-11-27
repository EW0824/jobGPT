
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";


// To load the PDF from user
async function loadPDF(path) {
    const loader = new PDFLoader(path);
    const documents = await loader.load();

    // console.log(documents);

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
        // lengthFunction: length,
        // addStartIndex: true
    });
    const output = await splitter.splitDocuments(documents);

    // const output = await splitter.createDocuments([documents])

    console.log(output)
    return output
}


// To load the job description
async function loadJob(link) {

}

async function splitDocs(docs) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200
    })
    const output = await splitter.splitDocuments(docs)
    console.log(output);
    return output;
}


// To convert resume and job description into text embeddings and retriever
export async function generateAndStoreEmbeddings(PDFLink, jobLink) {
    resume = loadPDF(PDFLink)
    job_description = loadJob(jobLink)

    docs = resume.concat(job_description)
    docOuputs = splitDocs(docs)


    // const vectorStore = await 
}

loadPDF("examples/example1.pdf");