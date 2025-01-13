import express from "express";
import { Request, Response } from "express";
import crypto from "crypto";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/test", (req: Request, res: Response) => {
  console.log("path :", req.path);
  const uniqueID = crypto.randomBytes(4).toString("hex");
  console.log("uniqueID :", uniqueID);
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
