import React from "react";
import {Event} from "../../../../types/game"
import GameState from "../../game/GameState"

// interface for a basic event
interface BaseEventProps {
  event: Event,
  textareaOnClick?: () => void
}

interface EventProps extends BaseEventProps {
  textareaOnClick?: undefined,
  drawEvent: () => void,
  drawCards: (cardNum?: number) => void,
  gameOver: () => void,
  gameState: GameState
}

// Decides whether to render a basic event containing a loading screen or a loaded event
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
    let textareaOnClick = () => {
      // user needs to click the textarea in order to move to the next event
      if(props.gameState === GameState.finishedEvent){
        props.drawEvent();
        props.drawCards();
      }
      else if(props.gameState === GameState.won || props.gameState === GameState.lost) props.gameOver();
    }
    // render a basic event with a custom clickhandler
    return(
      <BasicEventDisplay event={props.event} textareaOnClick={textareaOnClick}/>
    )
}

// displays the event that was handed to it and attaches a click handler to the text area
function BasicEventDisplay(props: BaseEventProps){
  return(
    <div id="event-display">
      <header>{props.event.name}</header>
      <textarea rows={15} cols={180} readOnly value={props.event.description} onClick={props.textareaOnClick} className="desc"/>
    </div>
  )
}

export default EventDisplay;
