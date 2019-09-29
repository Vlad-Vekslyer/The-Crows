import {Event, Card} from "../../../types/game"
import GameState from "./GameState"

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
  gameState: GameState
}

export default BoardState
