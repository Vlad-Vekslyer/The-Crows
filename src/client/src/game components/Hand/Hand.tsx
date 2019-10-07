import React from "react"
import {StyledHand} from "./handStyle"
import {Card} from "../../../../types/game"
import CardDisplay from "./Card"
import EffectExecution from "../../game/EffectExecution"
import GameState from "../../game/GameState"

interface Props {
  hand: Card[],
  eventId: number,
  gameState: GameState
  effectExecution: EffectExecution
  discard: (card: Card) => Card,
  appendToEvent: (addition: string) => void
}

function Hand(props: Props){
  if(props.hand.length){
    let cards = props.hand.map(card => <CardDisplay
      gameState = {props.gameState}
      effectExecution={props.effectExecution}
      appendToEvent={props.appendToEvent}
      discard={props.discard}
      eventId={props.eventId}
      id={card.id}
      key={card.id}
      card={card}/>)
    return(
      <StyledHand>
        {cards}
      </StyledHand>
    )
  } else {
    return(
      <h1>Loading....</h1>
    )
  }
}

export default Hand
