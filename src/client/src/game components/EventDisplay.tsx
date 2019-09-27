import React from "react";
import {Event} from "../../../types/game"

interface Props {
  event: Event
}

function EventDisplay(props: Props){
    return(
      <div id="event-display">
        <header>{props.event.name}</header>
        <textarea rows={15} cols={180} readOnly value={props.event.description} className="desc"/>
      </div>
    )
}

export default EventDisplay;
