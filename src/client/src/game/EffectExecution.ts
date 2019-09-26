import Board from "../game components/Board"
import {Event, Card} from "../../../types/game"

class EffectExecution {
  board: Board

  constructor(board: Board){
    this.board = board;
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
      eventStorage = eventStorage.filter(event => event.id != eventId);
      return {eventStorage}
    })
  }
}

export default EffectExecution
