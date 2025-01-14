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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
