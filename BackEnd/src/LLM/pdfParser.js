import pdfParse from 'pdf-parse';
import { readFileSync } from 'fs';
import textToDocSplitter from './splitter';

async function loadPdf(pdfPath) {
    try {
        const dataBuffer = readFileSync(pdfPath);
        const data = await pdfParse(dataBuffer);

        let text = data.text;
        let document = textToDocSplitter(text);
        
        return document;
    } catch (error) {
        console.error('Error loading PDF:', error);
        return null;
    }
}

// Usage example
// loadPdf('path/to/pdf').then(document => console.log(document));