export interface Effect {
  controlVariation: number,
  addEvent: number,
  removeEvent: number,
  drawExtra: boolean,
  holdEvent: boolean,
  revealHidden: boolean
}

// the JSON format when responding to a GET combination request
export interface ComboResponse {
  comboDesc: string,
  resultDesc: string[] | string,
  effects: Effect[] | Effect,
  successChance?: number
}
