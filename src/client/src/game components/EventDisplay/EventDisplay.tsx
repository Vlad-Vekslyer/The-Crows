import React from "react";
import {Event} from "../../../../types/game"
import GameState from "../../game/GameState"
import EventTextArea from "./TextArea"

interface BaseEventProps {
  event: Event
}

interface EventProps extends BaseEventProps {
  event: Event,
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
    return <BasicEvent event={props.event}>
             <EventTextArea value={"Loading...."}/>
           </BasicEvent>
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
      <BasicEvent event={props.event}>
        <EventTextArea value={props.event.description} clickHandler={clickHandler}/>
      </BasicEvent>
    )
}

function BasicEvent(props: React.PropsWithChildren<BaseEventProps>){
  return(
    <div id="event-display">
      <header>{props.event.name}</header>
      {props.children}
    </div>
  )
}

export default EventDisplay;
