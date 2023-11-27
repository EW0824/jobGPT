# jobGPT

A cover letter generator for the UCLA 35L Project.

## LLM

1. LangChain only supports Node version >= 18
2. Please run `npm install --force` when installing LangChain

## Backend

To launch the server, run the command `npm run dev`. The server currently runs at `localhost:8080`.

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
