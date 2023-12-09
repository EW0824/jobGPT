# jobGPT

A cover letter generator for the UCLA 35L Project.

Make sure to run `yarn` every time after pull.

(`npm install` also works, but need to do `npm install --force` for the backend)

## LLM

- NOTE: LangChain only supports Node version >= 18. Make sure the node environment is supported with `node -v`. 

Within the LLM folder:

```
LLM/
├── examples/ (example PDFs for local parsing)
├── loadExperience.js (loading the resume or a list of user passed in experiences)
├── loadJob.js (loading the job from user link)
├── preprocessing.js (handles loading PDF/job description into documents, using a recursive character text splitter
├── main.js (main pipeline, involving 1. model/chain creation, 2. document loading, 3. storing template into chain, 4. generate embeddings/vector store, 5. retrieve docs from prompt, 6. call the chain
├── prompt.js (template for the prompt)
```

## Backend

First, add all required packages.

```
yarn
```

Then, check if the .env file is placed in the correct position (privately shared; at the level as index.js at the BackEnd folder).
To launch the server, run the command `npm run dev`. The server runs at `http://localhost:8080`.

```
npm run dev
```

```
BackEnd/
├── node_modules/
├── src/
│ ├── api/ (implement RESTful API calls for User, Job, CoverLetter, etc)
│ ├── db/ (connect to MongoDB database)
│ ├── LLM/ (LangChain backend with OpenAI API)
| |── models/ (define MongoDB Schema and Form)
├── index.js (configure CORS and middleware; registers for all API)
├── package.json (track dependencies)
├── yarn.lock (track dependencies)
├── .env (hidden for security purpose; contains connection to Database, and also OpenAI API KEY, etc.)
```

## Frontend

First, add all required packages.

```bash
yarn
```

Then, start the app which runs on `http://localhost:3000`.

```bash
npm start
```

```
FrontEnd/
├── node_modules/
├── src/
│ ├── components/ (reusable components for the webpages)
│ ├── pages/ (implement frontend pages, e.g. job history, generate new cover letter, personal profile)
│ ├── styles/ (customize Material-UI element styles)
│ ├── hooks/ (detect the session-cookie for security purpose)
│ ├── gadgets/ (define helper functions such as format DateTime and Validate Form)
│ ├── App.js
│ ├── index.js
|
├── public/
│ ├── index.html
│ └── favicon.ico (logo)
├── .gitignore
├── package.json
└── package-lock.json
```

## Job URL Directions

Use the top form on the "Cover Letters" page to generate without manual input for jobs on LinkedIn:

![Cover Letters Page](./FrontEnd/public/Cover_Letter_Page.png)

To obtain the correct format of LinkedIn job link for cover letter generation, goto https://www.linkedin.com/jobs/ and search for desired jobs:

![linkedin.com/jobs](./FrontEnd/public/LinkedIn_jobs.png)

Click on the desired job to enter detailed job page and press the share button on the top-right of the job window and select copy link to copy the correct format of job link to clipboard:

![Share On LinkedIn](./FrontEnd/public/Share_On_LinkedIn.png)

The job link should match the following regular expression in grep:

```bash
grep -E '^https://www\.linkedin\.com/jobs/view/[0-9]+$'
```

## Acknowledgments

* [MUI](https://mui.com)
