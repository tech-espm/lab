import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { getHealthCheck } from "./routes/getHealthCheck";
import { postSaveResponse } from "./routes/postSaveResponse";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

app.get("/ping", getHealthCheck);
app.post("/response", postSaveResponse);

app.get("/", (req: Request, res: Response) => {
  res.send("Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
