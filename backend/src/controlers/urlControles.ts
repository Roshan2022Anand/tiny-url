import { Request, Response } from "express";
import { isValidUrl } from "../utils/urlUtils";
import { pool } from "../config/pgConnection";
import crypto from "crypto";

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
    const shortUrl = `${req.headers.host}/${id}`;
    const { rows } = await pool.query(`
            SELECT redirect_url FROM redirectUrl WHERE short_url='${shortUrl}'`);
    if (rows.length === 0) {
      res.status(404).send("URL not found");
      return;
    }

    //query to update the table by increment the click column by 1
    pool.query(
      `UPDATE redirectUrl SET click = click + 1 WHERE short_url='${shortUrl}'`
    );

    res.redirect(rows[0].redirect_url);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "internal server error" });
  }
};

//function to get the total number of clicks of the short url
export const getClicks = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const { rows } = await pool.query(`
            SELECT click FROM redirectUrl WHERE short_url='${url}'`);
    if (rows.length === 0) {
      res.status(404).send({ error: "URL not found" });
      return;
    }
    res.status(200).send({ clicks: rows[0].click });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "internal server error" });
  }
};
