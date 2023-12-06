import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { readFileSync } from 'fs';
import { textToDocSplitter } from './splitter.js';

export async function loadPdf(pdfPath) {
    try {
        let text = "";
        if (pdfPath) {
            const dataBuffer = readFileSync(pdfPath);
            const data = await pdfParse(dataBuffer);

            text = data.text;
        }

        let document = textToDocSplitter(text);
        return document;
    } catch (error) {
        console.error('Error loading PDF:', error);
        return null;
    }
}

// Testing:
// loadPdf('path/to/pdf').then(document => console.log(document));