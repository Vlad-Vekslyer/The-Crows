import React from "react";
import {Event} from "../../../types/game"

interface Props {
  event: Event
}

interface State {
  eventDescription: string
}

class EventDisplay extends React.Component<Props, State>{
  constructor(props: Props){
    super(props);
    this.state = {
      eventDescription: ""
    }
  }

  render(){
    return(
      <div id="event-display">
        <header>{this.props.event.name}</header>
        <textarea readOnly value={this.props.event.description} className="desc"/>
        <p className="hidden desc">{this.props.event.hiddenDesc}</p>
      </div>
    )
  }
}

export default EventDisplay;
