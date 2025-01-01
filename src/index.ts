import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import { toDoRoutes } from "./routes/toDosRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const url: string = process.env.MONGODB_URL || "";

// Connect to database
mongoose.connect(url).then(() => {
  console.log("Connected to database");
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/todos", toDoRoutes);
