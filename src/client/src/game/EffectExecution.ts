import Board from "../game components/Board"
import {Event, Effect} from "../../../types/game"


class EffectExecution {
  private board: Board

  constructor(board: Board){
    this.board = board;
  }

  exec(effect: Effect){
    for(let property in effect){
      // don't do anything with null values
      if(effect[property]){
        switch(property){
          case "controlVariation": this.controlVariation(effect.controlVariation); break;
          case "addEvent": this.addEvent(effect.addEvent); break;
          case "removeEvent": this.removeEvent(effect.removeEvent); break;
          case "drawExtra": this.drawExtra(effect.drawExtra); break;
        }
      }
      effect.holdEvent === false ? this.board.drawEvent() : null;
    }
  }

  addEvent(eventId: number): void{
    this.board.setState(prevState => {
      let {eventPool, eventStorage} = prevState;
      var event: Event = eventStorage.filter(event => event.id = eventId)[0];
      let eventIndex: number = eventStorage.indexOf(event);
      eventStorage.splice(eventIndex, 1);
      eventPool.push(event);
      eventPool = this.board.shuffle(eventPool, true);
      return {eventPool}
    });
  }

  removeEvent(eventId: number): void{
    this.board.setState(prevState => {
      let eventStorage = prevState.eventStorage;
      eventStorage = eventStorage.filter(event => event.id !== eventId);
      return {eventStorage}
    })
  }

  controlVariation(amount: number): void{
    this.board.setState(prevState => {
      let newControl: number = prevState.control + amount
      return {control: newControl}
    });
  }

  // draw to three cards and then draw the specified amount of extra cards
  drawExtra(amount: number): void{
    this.board.drawCards(3 + amount);
  }

  revealHidden(): void{
    let eventHiddenDesc: string = this.board.state.currentEvent.hiddenDesc;
    this.board.appendToEvent(eventHiddenDesc);
  }
}

export default EffectExecution
