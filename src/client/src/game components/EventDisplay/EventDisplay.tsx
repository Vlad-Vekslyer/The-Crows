import React from "react";
import {Event} from "../../../../types/game"
import GameState from "../../game/GameState"

interface BaseEventProps {
  event: Event,
  clickHandler?: () => void
}

interface EventProps extends BaseEventProps {
  drawEvent: () => void,
  drawCards: (cardNum?: number) => void,
  gameOver: () => void,
  gameState: GameState
}

function EventDisplay(props: EventProps) {
  if(props.event.name !== "Loading"){
    return <LoadedEventDisplay
      drawEvent={props.drawEvent}
      drawCards={props.drawCards}
      gameOver={props.gameOver}
      event={props.event}
      gameState={props.gameState}/>
  } else {
    return <BasicEventDisplay event={props.event}/>
  }
}

function LoadedEventDisplay(props: EventProps){
    let clickHandler = () => {
      if(props.gameState === GameState.finishedEvent){
        props.drawEvent();
        props.drawCards();
      }
      else if(props.gameState === GameState.won || props.gameState === GameState.lost) props.gameOver();
    }
    return(
      <BasicEventDisplay event={props.event} clickHandler={clickHandler}/>
    )
}

function BasicEventDisplay(props: BaseEventProps){
  return(
    <div id="event-display">
      <header>{props.event.name}</header>
      <textarea rows={15} cols={180} readOnly value={props.event.description} onClick={props.clickHandler} className="desc"/>
    </div>
  )
}

export default EventDisplay;
