# jobGPT

A cover letter generator for the UCLA 35L Project.

Make sure to `yarn add` every time after pull.

(`npm install` also works, but need to do `npm install --force` for langchain)

## LLM

- LangChain only supports Node version >= 18

## Backend

To launch the server, run the command `npm run dev`. The server currently runs at `localhost:8080`.


## Frontend

To run:

```bash
yarn add
npm start
```

```bash
Frontend/
├── node_modules/
├── src/
│ ├── components/ (reusable components for the webpages)
│ ├── pages/ (implement pages for dashboard, job history etc)
│ ├── styles/
│ ├── App.js
│ ├── index.js
|
├── public/
│ ├── index.html
│ └── ...
├── .gitignore
├── package.json
└── package-lock.json
```

To contribute:

1. Implement pages
2. Design a better favicon
3. Utilize Redux for state management
