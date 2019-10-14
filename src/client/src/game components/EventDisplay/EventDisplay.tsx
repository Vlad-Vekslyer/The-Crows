import React, {useState, useEffect, useRef} from "react";
import {Event} from "../../../../types/game"
import {StyledTextArea, StyledHeader} from "./style"
import GameState from "../../game/GameState"
import Infocon from "../InfoDisplay/Infocon"

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

// displays the event that   was handed to it and attaches a click handler to the text area
function BasicEventDisplay(props: BaseEventProps){
  // textArea is initialized as undefined and is later used to reference the textarea
  let textArea: React.MutableRefObject<HTMLTextAreaElement | undefined> = useRef();
  let [isTextareaHovered, setHovered] = useState(false);
  // whenever the event text is appended, scroll to the bottom of the text
  useEffect(() => {
    if(textArea.current) textArea.current.scrollTo(0, textArea.current.scrollHeight)
  }, [props.event.description])
  return(
    <section id="top">
      <StyledHeader>{props.event.name}</StyledHeader>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} id="event-display" style={{position: "relative"}}>
        <Infocon
          displayIcon={isTextareaHovered}
          message={"The event box displays the current story as it progresses.\nIt will also inform you of effects,\nsuch as a an extra card being drawn."}/>
        <StyledTextArea ref={textArea as React.MutableRefObject<HTMLTextAreaElement>} rows={17} readOnly value={props.event.description} onClick={props.textareaOnClick}/>
      </div>
    </section>
  )
}

export default EventDisplay;
