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


import axios from 'axios';
import * as cheerio from 'cheerio';
import { splitText } from './preprocessing.js';
import * as fs from 'fs';

export async function extractTextFromUrl(url) {
    try {
        let jobTitle = "";
        let jobCompany = "";
        let jobDescription = "";
        if (url) {
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);

            /*
            function getTextWithNewlines(element) {
              let text = '';
              $(element).contents().each(function(i, elem) {
                  if (elem.type === 'text') {
                      // Direct text children of the current element
                      text += $(elem).text().trim() + '\n';
                  } else if (elem.type === 'tag') {
                      // Recurse into child elements
                      text += getTextWithNewlines(elem);
                  }
              });
              return text;
            }
            */

            jobTitle = $('.topcard__title').first().text().trim();
            jobCompany = $('.topcard__org-name-link').first().text().trim();
            jobDescription = $('.show-more-less-html__markup').first().text().trim();

            console.log(jobTitle);
            console.log(jobCompany);
            console.log(jobDescription);
        }

        return {
          jobTitle: jobTitle,
          jobCompany: jobCompany,
          jobDescription: jobDescription,
        };
    } catch (error) {
        console.error('Error during extraction:', error);
        return "";
    }
}

// To load the job description
export async function loadJob(jobLink) {
  /*
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
  */

//   const jobDescription = extractTextFromUrl(jobLink);

  const textOutput = splitText("");
  return textOutput;
}

// extractTextFromUrl("https://jobs.apple.com/en-us/details/200480063/software-engineering-internships");

// Testing:
// extractTextFromUrl('http://example.com').then(document => console.log(document));