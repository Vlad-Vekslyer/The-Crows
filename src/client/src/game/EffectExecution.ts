import Board from "../game components/Board"
import {Event, Effect, Card} from "../../../types/game"


class EffectExecution {
  private board: Board

  constructor(board: Board){
    this.board = board;
  }

  // executes all the mechanical effects inside of an Effect
  exec(effect: Effect){
    for(let property in effect){
      // don't do anything with null values
      if(effect[property]){
        switch(property){
          case "controlVariation": this.controlVariation(effect.controlVariation); break;
          case "addEvent": this.addEvent(effect.addEvent); break;
          case "removeEvent": this.removeEvent(effect.removeEvent); break;
          case "drawExtra": this.drawExtra(effect.drawExtra); break;
          case "revealHidden": this.revealHidden(); break;
          case "addCard": this.addCard(effect.addCard); break;
          case "removeCard": this.removeCard(effect.removeCard); break;
        }
      }
    }
    if(!effect.holdEvent) this.board.closeEvent();
  }

  private addCard(cardId: number): void{
    this.board.setState(prevState => {
      let {cardPool, cardStorage} = prevState;
      let card: Card = cardStorage.filter(card => card.id = cardId)[0];
      let eventIndex: number = cardStorage.indexOf(card);
      cardStorage.splice(eventIndex, 1);
      cardPool.push(card);
      cardPool = this.board.shuffle(cardPool, true);
      this.board.appendToEvent(`Added the card ${card.name}`);
      return {cardPool}
    });
  }

  // adds an event in Event Storage to the Event Pool
  private addEvent(eventId: number): void{
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

  private removeCard(cardId: number): void{
   this.board.setState(prevState => {
     let cardPool = [...prevState.cardPool];
     cardPool = cardPool.filter(card => card.id !== cardId);
     if(JSON.stringify(cardPool) !== JSON.stringify(prevState.cardPool)) this.board.appendToEvent(`A card was removed`);
     return {cardPool}
   })
 }

   // remove an event from the Event Storage or Pile
   private removeEvent(eventId: number): void{
    this.board.setState(prevState => {
      let {eventStorage, eventPool} = prevState;
      eventStorage = eventStorage.filter(event => event.id !== eventId);
      eventPool = eventPool.filter(event => event.id !== eventId);
      return {eventStorage, eventPool}
    })
  }

  // add to or subtract from the current control amount
  private controlVariation(amount: number): void{
    this.board.setState(prevState => {
      let newControl: number = prevState.control + amount
      return {control: newControl}
    });
    let word: string = amount > 0 ? "received" : "lost";
    this.board.appendToEvent(`You ${word} ${Math.abs(amount)} control`);
  }

  // draw to three cards and then draw the specified amount of extra cards
  private drawExtra(amount: number): void{
    this.board.drawCards(3 + amount);
    this.board.appendToEvent(`You drew an extra card`);
  }

  // reveal an event's hidden description
  private revealHidden(): void{
    let eventHiddenDesc: string = this.board.state.currentEvent.hiddenDesc;
    this.board.appendToEvent(eventHiddenDesc);
  }
}

export default EffectExecution
