import * as express from "express";
import mysql = require("mysql");
import dotenv = require("dotenv");
import bodyParser = require("body-parser");
const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({extended: true}));

import Database from "./db_Util/PromiseWrapper";
import {Effect, ComboResponse} from "./types/API";

// get all the cards and eventst that are available at the start of a new game
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

app.get("/api/combo", async (req, res, next) => {
  let {cardId, eventId} = req.query; // cardId and eventId are required to find a combination
  let db = new Database();
  let combination = await db.query(`SELECT id AS comboId,
    description AS comboDesc
    FROM combinations
    WHERE card_id=${cardId} AND event_id=${eventId}`);
  // comboId needed to find results
  // comboDesc needed for frontend
  let {comboId, comboDesc} = combination[0];
  let results = await db.query(`SELECT result_description AS resultDesc,
    effect_id AS effectId
    FROM results
    WHERE combination_id = ${comboId}`);
  let resultDesc: string[] = results.map(result => result.resultDesc);   // using map since it's possible to have more than one result
  let effectIds: number[] = results.map(result => result.effectId);
  let effectsPromises: Promise<Effect[]>[] = [];
  effectIds.forEach(effectId => {
    effectsPromises.push(db.query(`SELECT control_variation AS controlVariation,
      add_event AS addEvent,
      remove_event AS removeEvent,
      draw_extra AS drawExtra,
      hold_event AS holdEvent,
      reveal_hidden AS revealHidden
      FROM effects
      WHERE id=${effectId}`));
  });
  let effects: Effect[][] | Effect[] = await Promise.all(effectsPromises);  // starts as a 2D array and gets converted to 1D array
  effects = effects.map(effect => effect[0]);
  await db.close();
  if(resultDesc.length === 1){
    let cr: ComboResponse = {
      comboDesc: comboDesc,
      resultDesc: resultDesc[0],
      effects: effects[0]
    }
    res.json(cr);
  } else if(resultDesc.length === 2){
    req.body.comboId = comboId;
    req.body.comboDesc = comboDesc;
    req.body.resultDesc = resultDesc;
    req.body.effects = effects;
    next();
  }
});

app.get("/api/combo", async (req, res) => {
  let {comboId, comboDesc, resultDesc, effects} = req.body;
  let db = new Database();
  let highProfileQuery = await db.query(`SELECT high_profile_id AS id FROM high_profile_list WHERE combination_id = ${comboId}`);
  let highProfileId: number = highProfileQuery[0].id;
  let successChanceQuery = await db.query(`SELECT success_chance AS successChance FROM high_profile WHERE id=${highProfileId}`);
  let successChance: number = successChanceQuery[0].successChance;
  await db.close();
  let cr: ComboResponse = {
    comboDesc,
    resultDesc,
    effects,
    successChance
  }
  res.json(cr);
})

app.listen(3001, () => {
  console.log("Express server has started");
});
