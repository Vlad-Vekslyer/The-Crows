import {Effect} from "./game"

// the JSON format when responding to a GET combination request
export interface ComboResponse {
  comboDesc: string,
  resultDesc: string[] | string,
  // a single Effect type can contain multiple distinct mechanical effects
  effects: Effect[] | Effect,
  successChance?: number
}
