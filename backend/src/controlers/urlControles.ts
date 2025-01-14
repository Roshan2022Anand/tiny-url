import { Request, Response } from "express";
import { isValidUrl } from "../utils/urlUtils";
import { pool } from "../config/pgConnection";
import crypto from "crypto";
import { error } from "console";

//function to create a short url
export const makeShortUrl = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!(await isValidUrl(url))) {
      res.status(400).send({ error: "Invalid URL" });
      return;
    }
    const uniqueID = crypto.randomBytes(3).toString("hex");
    const shortUrl = `${req.headers.host}/${uniqueID}`;
    await pool.query(`
        INSERT INTO redirectUrl(short_url,redirect_url)
      VALUES ('${shortUrl}','${url}')`);

    res.status(200).send({ shortUrl, message: "URL has been shortend" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "internal server error" });
  }
};

//function to redirect to the original url
export const redirectShortUrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(`
            SELECT redirect_url FROM redirectUrl WHERE short_url='${req.headers.host}/${id}'`);
    if (rows.length === 0) {
      res.status(404).send("URL not found");
      return;
    }
    res.redirect(rows[0].redirect_url);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
