import express from "express";
import cors from "cors";
import "dotenv/config";
import connectStore from "connect-mongo";
import session from "express-session";

import { createMongooseConnection } from "./src/db/connect.js";
import jobRouter from "./src/api/JobController.js";
import userRouter from "./src/api/UserController.js";
import sessionRouter from "./src/api/SessionController.js";

const port = 8080;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: connectStore.create({
      mongoUrl: process.env.MONGO_DB_CONNECTION_STR,
      ttl: parseInt(eval(process.env.SESSION_LIFETIME)) / 1000,
      collectionName: "session_store",
    }),
    cookie: {
      sameSite: false,
      secure: false, //set to safe in production
      maxAge: parseInt(eval(process.env.SESSION_LIFETIME)),
      httpOnly: false,
    },
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/job", jobRouter);
app.use("/auth", sessionRouter);
app.use("/user", userRouter);

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
