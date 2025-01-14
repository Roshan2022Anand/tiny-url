import express from "express";
import urlRouter from "./routes/url.routes";
const cors = require("cors");
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", urlRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
