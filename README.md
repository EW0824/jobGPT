# jobGPT

A cover letter generator for the UCLA 35L Project.

Make sure to `yarn add` every time after pull.

(`npm install` also works, but need to do `npm install --force` for langchain)

## LLM

- LangChain only supports Node version >= 18

## Backend

First, run yarn add to acquire all the required packages. 
```bash
yarn add
```
To launch the server, run the command `npm run dev`. The server currently runs at `http://localhost:8080`.
```bash
npm run dev
```

```bash
BackEnd/
├── node_modules/
├── src/
│ ├── api/ (implement RESTful API calls for User, Job, CoverLetter, etc)
│ ├── db/ (connect to MongoDB database)
│ ├── LLM/ (LangChain for OpenAI API)
│ ├── models/ (define MongoDB Schemas and Forms)
│ ├── index.js (configure CORS and middleware; registers all for all API)
├── .env (hidden for security purpose, contains connection to Database, and also sceret key of OpenAI API, etc.)
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

```bash
FrontEnd/
├── node_modules/
├── src/
│ ├── components/ (reusable components for the webpages)
│ ├── pages/ (implement frontend pages, such as job history, generate new cover letter, personal profile)
│ ├── styles/ (customize the style of Material-UI elements)
│ ├── hooks/ (detect the session-cookie for security purpose)
│ ├── Gadgets/ (define some helper functions, such as format DateTime and Validate Form)
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
