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

  // add a new card to the card pool from the card storage
  private addCard(cardId: number): void{
    let {cardPool, cardStorage} = this.board.state;
    let card: Card | undefined = this.transferItem(cardId, cardStorage, cardPool);
    cardPool = this.board.shuffle(cardPool, true);
    if(card) {
      this.board.setState({cardPool, cardStorage});
      this.board.appendToEvent(`Added card ${card.name}`);
    } else {
      this.board.appendToEvent(`Card is already in your possession. Adding 1 control instead`);
      this.controlVariation(1);
    };

  }

  // adds a new event to the event pool from the event storage
  private addEvent(eventId: number): void{
    this.board.setState(prevState => {
      let {eventPool, eventStorage} = prevState;
      this.transferItem(eventId, eventStorage, eventPool);
      eventPool = this.board.shuffle(eventPool, true);
      return {eventPool, eventStorage}
    });
  }

  // remove a card from the card pile or the hand and add it to the card storage for potential future use
  private removeCard(cardId: number): void{
    let {cardPool, cardStorage, hand} = this.board.state;
    let card: Card | undefined = this.transferItem(cardId, cardPool, cardStorage);
    if(card) {
      this.board.appendToEvent(`Removed ${card.name}`);
      this.board.setState({cardPool, cardStorage});
    } else {
      card = this.transferItem(cardId, hand, cardStorage);
      if(card){
        this.board.appendToEvent(`Removed ${card.name}`);
        this.board.setState({hand, cardStorage});
      } else console.log("Card wasn't in the hand or the card pool");
    }
 }

  // remove an event from the Event storage or pool
  private removeEvent(eventId: number): void{
    this.board.setState(prevState => {
      let {eventPool, eventStorage} = prevState;
      eventPool = eventPool.filter(event => event.id !== eventId);
      eventStorage = eventStorage.filter(event => event.id !== eventId);
      return {eventPool, eventStorage}
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

  // attempts to find an item in one array and move it to the second array. If no item found it returns undefined
  private transferItem(id: number, arr: Event[], arr2: Event[]): Event | undefined;
  private transferItem(id: number, arr: Card[], arr2: Card[]): Card | undefined;
  private transferItem(id: number, arr: any[], arr2: any[]) {
    let item: Card | Event | undefined = arr.filter(item => item.id === id)[0];
    let itemIndex: number = arr.indexOf(item);
    arr.splice(itemIndex, 1);
    if(item) arr2.push(item);
    return item;
  }
}

export default EffectExecution
