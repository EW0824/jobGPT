# jobGPT

A cover letter generator for the UCLA 35L Project.

Make sure to `yarn add` every time after pull.

(`npm install` also works, but need to do `npm install --force` for langchain)

## LLM

- LangChain only supports Node version >= 18

Within the LLM folder:
```
LLM/
├── examples/ (example PDFs for local parsing)
├── preprocessing.js (handles loading PDF/job description into documents, using a recursive character text splitter
├── scraper.js (scrapping the job information)
├── pdfParser.js (loading the PDF passed from the frontend)
├── main.js (main pipeline, involving 1. model/chain creation, 2. document loading, 3. storing template into chain, 4. generate embeddings/vector store, 5. retrieve docs from prompt, 6. call the chain
```

## Backend

First, run the following to acquire all the required packages. 
```
npm install
```
If error occured during installation and npm prompted to use the `--force` option, execute `npm install --force` instead.
To launch the server, run the command `npm run dev`. The server currently runs at `http://localhost:8080`.
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
│ ├── models/ (define MongoDB Schema and Form)
│ ├── index.js (configure CORS and middleware; registers for all API)
├── .env (hidden for security purpose; contains connection to Database, and also OpenAI API KEY, etc.)
```

## Frontend

First, run npm instal (or yarn add) to acquire all the required packages. 

```bash
npm install
```

Then, start the app by npm start, which is running on `http://localhost:3000`

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
│ ├── Gadgets/ (define helper functions such as format DateTime and Validate Form)
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
