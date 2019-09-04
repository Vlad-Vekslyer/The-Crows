import * as express from "express";
import mysql = require("mysql");
import dotenv = require("dotenv");
const app = express();

dotenv.config();
import Database from "./db_Util/PromiseWrapper";

app.get("/api/starter", async (req, res) => {
  let db = new Database();
  let cards = await db.query("SELECT id, card_name AS name, is_starter as isStarter FROM cards WHERE is_starter = 1");
  let events = await db.query(`SELECT id, event_name AS name,
    event_description AS description,
    is_starter AS isStarter,
    hidden_description AS hiddenDesc
    FROM events
    WHERE is_starter = 1`);
  await db.close();
  res.json({cards, events})
});


app.listen(3001, () => {
  console.log("Express server has started");
});
