export interface Effect {
  [key: string]: number | boolean

  addCard: number,
  removeCard: number,
  controlVariation: number,
  addEvent: number,
  removeEvent: number,
  drawExtra: number,
  holdEvent: boolean,
  revealHidden: boolean
}

export interface Card {
  name: string,
  isStarter: boolean,
  id: number
}

export interface Event {
  name: string,
  id: number,
  description: string,
  hiddenDesc: string,
  isStarter: boolean
}
