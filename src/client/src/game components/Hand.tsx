import React from "react"
import {Card} from "../../../types/game"
import CardDisplay from "./Card"
import EffectExecution from "../game/EffectExecution"

interface Props {
  hand: Card[],
  eventId: number,
  isEventDone: boolean,
  effectExecution: EffectExecution
  discard: (card: Card) => Card,
  appendToEvent: (addition: string) => void
}

function Hand(props: Props){
  let cards = props.hand.map(card => <CardDisplay
    isEventDone={props.isEventDone}
    effectExecution={props.effectExecution}
    appendToEvent={props.appendToEvent}
    discard={props.discard}
    eventId={props.eventId}
    id={card.id}
    key={card.id}
    card={card}/>)
  return(
    <div style={{marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid black"}} id="hand">
      {cards}
    </div>
  )
}

export default Hand
