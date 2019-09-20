import React from "react"
import {Card} from "../../../types/game"

interface Props {
  card: Card
}

function CardDisplay(props: Props){
  return(
    <div className="card">
      <h3>{props.card.name}</h3>
    </div>
  )
}

export default CardDisplay
