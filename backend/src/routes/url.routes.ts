import express, { Request, Response } from "express";
import { makeShortUrl, redirectShortUrl } from "../controlers/urlControles";
const route = express.Router();

//route to create a short url
route.route("/short").post(makeShortUrl);

//route to redirect to the original url
route.route("/:id").get(redirectShortUrl);
export default route;
