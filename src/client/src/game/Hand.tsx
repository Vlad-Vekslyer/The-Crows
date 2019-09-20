import React from "react"
import {Card} from "../../../types/game"
import CardDisplay from "./Card"

interface Props {
  hand: Card[]
}

function Hand(props: Props){
  let cards = props.hand.map(card => <CardDisplay key={card.id} card={card}/>)
  return(
    <div id="hand">
      {cards}
    </div>
  )
}

export default Hand
