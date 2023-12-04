# jobGPT

A cover letter generator for the UCLA 35L Project.

Make sure to `yarn add` every time after pull.

(`npm install` also works, but need to do `npm install --force` for langchain)

## LLM

- LangChain only supports Node version >= 18

## Backend

First, run yarn add to acquire all the required packages. 
To launch the server, run the command `npm run dev`. The server currently runs at `http://localhost:8080`.

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
Frontend/
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
