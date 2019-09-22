import React from "react"
import {Card} from "../../../types/game"

interface Props {
  card: Card,
  id: number,
  eventId: number
}

function CardDisplay(props: Props){
  return(
    <div className="card">
      <h3>{props.card.name}</h3>
      <button onClick={() => {
        fetch(`/api/combo?cardId=${props.card.id}&eventId=${props.eventId}`)
        .then(res => res.json())
        .then(res => console.log(res));
      }}>Select {props.card.name}</button>
    </div>
  )
}

export default CardDisplay
