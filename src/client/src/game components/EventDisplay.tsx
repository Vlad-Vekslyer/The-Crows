import React from "react";
import {Event} from "../../../types/game"
import GameState from "../game/GameState"

interface Props {
  event: Event,
  gameState: GameState,
  isEventDone: boolean,
  drawEvent: () => void,
  drawCards: (cardNume?: number) => void,
  gameOver: (gameState: GameState) => void
}

function EventDisplay(props: Props){
    return(
      <div id="event-display">
        <header>{props.event.name}</header>
        <textarea onClick={() => {
          if(props.isEventDone && props.gameState === GameState.onGoing){
            props.drawEvent();
            props.drawCards();
          }
          else if(props.isEventDone && (props.gameState === GameState.won || props.gameState === GameState.lost)) props.gameOver(props.gameState);
        }} rows={15} cols={180} readOnly value={props.event.description} className="desc"/>
      </div>
    )
}

export default EventDisplay;
