import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CharacterTextSplitter } from "langchain/text_splitter";

export async function splitTextDocuments(docs) {
    const splitter = new CharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 20,
    });
    const output = await splitter.splitDocuments([docs]);
    return output;
}

export async function textToDocSplitter(text) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 10000,
        chunkOverlap: 0,
        lengthFunction: length,
    });

    const docOutput = await splitter.createDocuments([text])
    return docOutput
}