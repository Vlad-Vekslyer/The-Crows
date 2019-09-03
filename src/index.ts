import * as express from "express";
import mysql = require("mysql");
import dotenv = require("dotenv");
const app = express();

dotenv.config();
import Database from "./dbUtil/PromiseWrapper";

app.get("/message", async (req, res) => {
  let db = new Database();
  let cardName = await db.query("SELECT card_name FROM cards LIMIT 1");
  cardName = cardName[0].card_name;
  res.json({message: cardName});
});

app.listen(3001, () => {
  console.log("Express server has started");
});
