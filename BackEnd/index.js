import express from "express"
import cors from 'cors'
import 'dotenv/config'

import { createMongooseConnection } from "./src/db/connect.js";

const port = 3000;

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send("Hello World")
})

async function startServer() {
  try {
    await createMongooseConnection();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}

startServer();