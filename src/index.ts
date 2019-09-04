import * as express from "express";
import mysql = require("mysql");
import dotenv = require("dotenv");
const app = express();

dotenv.config();
import Database from "./db_Util/PromiseWrapper";

app.get("/api/starter_cards", async (req, res) => {
  let db = new Database();
  let starterCards = await db.query("SELECT id, card_name AS name, is_starter as isStarter FROM cards WHERE is_starter = 1");
  res.json({cards: starterCards});
});

app.listen(3001, () => {
  console.log("Express server has started");
});
