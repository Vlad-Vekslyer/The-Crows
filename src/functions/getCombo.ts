import {ComboResponse} from '../types/API';
import {Effect} from '../types/game'
import Database from '../db_Util/PromiseWrapper';

export async function findCombination(db: Database, cardId: number, eventId: number): Promise<any> {
  return new Promise(async(resolve, reject) => {
    let combination = await db.query(`SELECT id AS comboId,
      description AS comboDesc
      FROM combinations
      WHERE card_id=${cardId} AND event_id=${eventId}`);
    // comboId needed to find results
    // comboDesc needed for frontend
    let {comboId, comboDesc} = combination[0];
    let comboResponse: ComboResponse = {
      comboDesc,
      resultDesc: undefined,
      effects: undefined
    }
    resolve({comboResponse, comboId});
  });
}

export async function findResults(db: Database, comboResponse: ComboResponse, comboId: number): Promise<any> {
  return new Promise(async(resolve, reject) => {
    let results = await db.query(`SELECT result_description AS resultDesc,
      effect_id AS effectId
      FROM results
      WHERE combination_id = ${comboId}`);
    let resultDesc: string[] = results.map(result => result.resultDesc);   // using map since it's possible to have more than one result
    let effectIds: number[] = results.map(result => result.effectId);
    comboResponse.resultDesc = resultDesc;
    resolve({comboResponse, effectIds});
  });
}

export async function findEffects(db: Database, comboResponse: ComboResponse, effectIds: number[]): Promise<any> {
  return new Promise(async(resolve, reject) => {
    let effectsPromises: Promise<Effect[]>[] = [];
    effectIds.forEach(effectId => {
      effectsPromises.push(db.query(`SELECT control_variation AS controlVariation,
        add_event AS addEvent,
        remove_event AS removeEvent,
        draw_extra AS drawExtra,
        hold_event AS holdEvent,
        reveal_hidden AS revealHidden,
        add_card AS addCard
        FROM effects
        WHERE id=${effectId}`));
    });
    let effects: Effect[][] | Effect[] = await Promise.all(effectsPromises);  // starts as a 2D array and gets converted to 1D array
    effects = effects.map(effect => effect[0]);
    comboResponse.effects = effects;
    resolve(comboResponse);
  })
}
