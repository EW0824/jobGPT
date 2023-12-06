import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { readFileSync } from "fs";
import { textToDocSplitter } from "./splitter.js";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { splitText } from "./preprocessing.js";
import { parse } from "path";

async function loadPDFFromPath(pdfPath) {
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
    console.error("Error loading PDF:", error);
    return null;
  }
}

// To load the PDF from user
async function loadPDFLocally(path) {
  const loader = new PDFLoader(path);
  const documents = await loader.load();

  const docOutput = await splitDocs(documents);
  return docOutput;
}

// Loading PDF from a link -> implementation unfinished
export async function loadResume(path) {
  /*
    let example = `
      MACK CROLANGUAGE
  
      844-555-2626 | mackcrol@gmail.com
  
      EDUCATION
  
      Carnegie Mellon University, Pittsburgh, PA Master of Science, Computer Science, December 2015
  
      Selected Coursework: Introduction to Machine Learning (10-601, Fall 2014), Distributed Systems (15-440/640, Fall 2014), Algorithm Design and Analysis (15-451/651, Fall 2014), Web Apps Development (15-637, Spring 2015), Machine Learning with Large Datasets (10-605, Spring 2015), Graduate Artificial Intelligence (15-780, Spring 2015)
  
      Birla Institute of Technology and Science, Pilani, India Bachelor of Engineering (Hons.), Computer Science (Minor: M.Sc. Economics), July 2014
  
      SKILLS
  
      Programming/Scripting Languages: (Proficient) Java;(Familiar) Python, C, SQL, Javascript, MATLAB, Perl Frameworks and tools: Hadoop, Django, DKPro for NLP, Maven, Git
  
      EXPERIENCE
  
      Software Engineering Intern Yahoo! Inc., Sunnyvale, CA, May - August, 2015
  
      • Interned with the user data team, which is part of cloud services at Yahoo!
  
      Research Intern Ubiquitous Knowledge Processing Lab, TU Darmstadt, Germany, January - June, 2014
  
      • Developed an application (in Java) using the DKPro library to automatically solve multiple choice reading comprehension questions. Using text similarity and textual entailment measures, it obtained the 2 nd best score in the CLEF Entrance Exams competition.
  
      Research Student Computer Engineering and Networks Laboratory, ETH Zurich, Switzerland, July - December, 2013
  
      • Developed an application (in Python) to use a tree-based learning algorithm to model the deadline hit and miss patterns of periodic real-time tasks. The algorithm used formal verification techniques to generate a regular language-based guarantee to predict future deadline hits and misses.
  
      Developer (Google Summer of Code) Student Developer for National Resource for Network Biology (NRNB), Summer 2012
  
      • Built an app (in Java) for Cytoscape, an open-source software for complex network visualization. The app helped users to visually analyze and modify molecular interaction networks.
  
      PROJECTS
  
      MapReduce Engine Carnegie Mellon University, Fall 2014
  
      • Implemented a Hadoop-like MapReduce facility, with master and worker nodes for map-reduce operations over large datasets, with a distributed file system, and fault tolerance to address datanode failures.
  
      Object Recognition Using CIFAR-10 Dataset Carnegie Mellon University, Fall 2014
  
      • As part of an in-class Kaggle competition, several approaches were tried to train a model using 4000 images for the CIFAR-10 dataset. With GIST descriptors and a Kernelized (RBF) SVM, a test accuracy of 61% was obtained on a dataset consisting of 15000 images.
  
      Intelligent Indoor Emergency Response System Carnegie Mellon University, Spring 2015
  
      • Developed a priority-based auctioning algorithm for task allocation in a multi-agent environment. Using a modified A* algorithm, tasks were prioritized based on proximity to the location of the fire resulting in an efficient evacuation.
    `;
    */

//   const pdf = loadPDFFromPath(path);
  const textOutput = splitText("");

  return textOutput;
}

export function loadExperiences(experiences) {
  const experiencesText = "I have the following experiences which are very important and must be referenced in the cover letter: \n" + experiences
    .map((experience) => {
      return `${experience.jobTitle} at ${experience.company}: ${experience.jobDescription}`;
    })
    .join("\n");

  return splitText(experiencesText);
}

// Testing:
// loadPdf('path/to/pdf').then(document => console.log(document));