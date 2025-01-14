require("dotenv").config();
const { Client } = require("pg");

export const pool = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then(() => console.log("Connected to Neon DB"))
  .catch((err: Error) => console.error("Connection error", err.stack));

