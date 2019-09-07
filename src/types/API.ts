export interface Effect {
  controlVariation: number,
  addEvent: number,
  removeEvent: number,
  drawExtra: boolean,
  holdEvent: boolean,
  revealHidden: boolean
}

export interface ComboResponse {
  comboDesc: string,
  resultDesc: string[] | string,
  effects: Effect[] | Effect,
  successChance?: number
}
