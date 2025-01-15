import express from "express";
import { getClicks, makeShortUrl, redirectShortUrl } from "../controlers/urlControles";
const route = express.Router();

//route to create a short url
route.route("/short").post(makeShortUrl);

//route to redirect to the original url
route.route("/:id").get(redirectShortUrl);

//route to get the total number of clicks of the short url
route.route("/clicks").post(getClicks);

export default route;