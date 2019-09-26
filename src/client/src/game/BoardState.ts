import {Event, Card} from "../../../types/game"
import EffectExecution from "./EffectExecution"

interface BoardState {
  // storage contains cards/events currently out of the game
  // pile contains cards/events that can be drawn currently
  eventStorage: Event[],
  cardStorage: Card[],
  eventPool: Event[],
  cardPool: Card[],
  cardDiscard: Card[],
  // hand and currentEvent contains cards/events currently played
  hand: Card[],
  currentEvent: Event,
  control: number,
  effectExecution: EffectExecution
}

export default BoardState
