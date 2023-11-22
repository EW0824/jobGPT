# jobGPT

A cover letter generator for the UCLA 35L Project.

## LLM
LangChain only supports Node version >= 18


## Backend

To launch the server, run the command `npm run dev`. The server currently runs at `localhost:3000`.

Please remember to run `npm install` everytime after pull to ensure all dependencies are met.

## Frontend

To run:

```bash
npm install
npm start
```

```bash
Frontend/
├── node_modules/
├── src/
│ ├── components/ (reusable components for the webpages)
│ ├── pages/ (implement pages for dashboard, job history etc)
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
2. Connected to DB
3. Refactor code
4. Design a better favicon
