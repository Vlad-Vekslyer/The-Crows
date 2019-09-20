import React from "react";
import {Event} from "../../../types/game"

interface Props{
  event: Event
}

function EventDisplay(props: Props){
  return(
    <div id="event-display">
      <header>{props.event.name}</header>
      <p className="desc">{props.event.description}</p>
      <p className="hidden desc">{props.event.hiddenDesc}</p>
    </div>
  )
}

export default EventDisplay;
