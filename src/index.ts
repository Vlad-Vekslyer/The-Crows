import * as express from "express";
import mysql = require("mysql");
import dotenv = require("dotenv");
import bodyParser = require("body-parser");
const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({extended: true}));

import Database from "./db_Util/PromiseWrapper";
import {Effect, ComboResponse} from "./types/API";
import * as getCombo from './functions/getCombo';

// get all the cards and eventst that are available at the start of a new game
app.get("/api/start", async (req, res) => {
  let db = new Database();
  let cards = await db.query("SELECT id, card_name AS name, is_starter as isStarter FROM cards");
  let events = await db.query(`SELECT id, event_name AS name,
    event_description AS description,
    is_starter AS isStarter,
    hidden_description AS hiddenDesc
    FROM events`);
  await db.close();
  res.json({cards, events})
});

// get all relevant data about the combination of a card and an event
app.get("/api/combo", async (req, res, next) => {
  let {cardId, eventId} = req.query; // cardId and eventId are required to find a combination
  let db = new Database();
  let combination = await getCombo.findCombination(db, cardId, eventId);
  let {comboResponse, comboId}: {comboResponse: ComboResponse, comboId: number} = combination;
  let results = await getCombo.findResults(db, comboResponse, comboId);
  await getCombo.findEffects(db, comboResponse, results.effectIds);
  await db.close();
  if(comboResponse.resultDesc.length === 1){
    comboResponse = {
      comboDesc: comboResponse.comboDesc,
      resultDesc: comboResponse.resultDesc[0],
      effects: comboResponse.effects[0]
    }
    res.json(comboResponse);
  } else if(comboResponse.resultDesc.length === 2){
    req.body.comboResponse = comboResponse;
    req.body.comboId = comboId;
    next();
  }
});

app.get("/api/combo", async (req, res) => {
  let comboResponse: ComboResponse = req.body.comboResponse;
  let db = new Database();
  let highProfileQuery = await db.query(`SELECT high_profile_id AS id FROM high_profile_list WHERE combination_id = ${req.body.comboId}`);
  let highProfileId: number = highProfileQuery[0].id;
  let successChanceQuery = await db.query(`SELECT success_chance AS successChance FROM high_profile WHERE id=${highProfileId}`);
  let successChance: number = successChanceQuery[0].successChance;
  await db.close();
  comboResponse.successChance = successChance;
  res.json(comboResponse);
})

app.listen(3001, () => {
  console.log("Express server has started");
});
