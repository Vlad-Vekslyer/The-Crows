export interface Effect {
  controlVariation: number,
  addEvent: number,
  removeEvent: number,
  drawExtra: boolean,
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
