import express from "express";
import urlRouter from "./routes/url.routes";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", urlRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
