import express from "express";
import urlRouter from "./routes/url.routes";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/", urlRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
