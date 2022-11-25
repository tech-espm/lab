import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

import { getHealthCheck } from "./routes/getHealthCheck";
import { postSaveResponse } from "./routes/postSaveResponse";
import { postSaveResponseBatch } from "./routes/postSaveResponseBatch";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.get("/ping", getHealthCheck);
app.post("/response", postSaveResponse);
app.post("/response/batch", upload.single("file"), postSaveResponseBatch);

app.get("/", (req: Request, res: Response) => {
  res.send("Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
