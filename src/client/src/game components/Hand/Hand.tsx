import React from "react"
import {StyledHand, themes} from "./handStyle"
import {Card} from "../../../../types/game"
import CardDisplay from "./Card"
import EffectExecution from "../../game/EffectExecution"
import GameState from "../../game/GameState"
import { ThemeProvider } from "styled-components";

interface Props {
  hand: Card[],
  eventId: number,
  gameState: GameState
  effectExecution: EffectExecution
  discard: (card: Card) => Card,
  appendToEvent: (addition: string) => void
}

function Hand(props: Props){
  if(props.hand.length >= 3){
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
      <ThemeProvider theme={themes[`${props.hand.length} Cards`]}>
        <StyledHand>
          {cards}
        </StyledHand>
      </ThemeProvider>
    )
  } else {
    return(
      <h1>Loading....</h1>
    )
  }
}

export default Hand
