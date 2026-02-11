import express from "express";
import type { Express } from "express";
import catalogRouter from "./api/rest/catalog.routes";

const app: Express = express();

app.use(express.json());

app.use("/", catalogRouter);

export default app;
