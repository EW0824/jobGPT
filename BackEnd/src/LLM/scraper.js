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

import { textToDocSplitter } from "./splitter"

import axios from 'axios';
import cheerio from 'cheerio';

async function extractTextFromUrl(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const textLines = [];

        $('div.description__text').each((i, element) => {
            textLines.push($(element).text().trim());
        });

        const text = textLines.filter(line => line).join('\n');
        const document = textToDocSplitter(text);

        return document;
    } catch (error) {
        console.error('Error during extraction:', error);
        return null;
    }
}

// Testing:
// extractTextFromUrl('http://example.com').then(document => console.log(document));