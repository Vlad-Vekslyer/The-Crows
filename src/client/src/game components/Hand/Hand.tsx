import React, {useState} from "react"
import {StyledHand, themes} from "./handStyle"
import {Card} from "../../../../types/game"
import CardDisplay from "./Card"
import EffectExecution from "../../game/EffectExecution"
import GameState from "../../game/GameState"
import { ThemeProvider } from "styled-components";
import Infocon from "../InfoDisplay/Infocon"
import {sizes} from "../style"

interface Props {
  hand: Card[],
  eventId: number,
  gameState: GameState
  effectExecution: EffectExecution
  discard: (card: Card) => Card,
  appendToEvent: (addition: string) => void
}

function Hand(props: Props){
  let [isHovered, setHovered] = useState(false);
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
      <ThemeProvider theme={themes[`${props.hand.length} Cards`]}>
        <StyledHand onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
          {cards}
          <Infocon
            messageLocation={{left: -20, top: -80}}
            message={"Cards are the different ways you can react to the story.\nA card outlined in red has a chance of failure,\n but can return a handsome reward."}
            displayIcon={isHovered}/>
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
