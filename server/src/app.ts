import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";

const storage = multer.memoryStorage();
const upload = multer({ storage });

import { getHealthCheck } from "./routes/getHealthCheck";
import { postSaveResponse } from "./routes/postSaveResponse";
import { postSaveResponseBatch } from "./routes/postSaveResponseBatch";
import { getPersons } from "./routes/getPersons";
import { postDeletePersons } from "./routes/postDeletePersons";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/ping", getHealthCheck);
app.get("/person", getPersons);
app.post("/person", postSaveResponse);
app.delete("/person/:personId", postDeletePersons);
app.post("/person/batch", upload.single("file"), postSaveResponseBatch);

app.get("/", (req: Request, res: Response) => {
  res.send("Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
