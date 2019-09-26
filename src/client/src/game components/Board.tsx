import React from "react";
import {Event, Card} from "../../../types/game"
import EventDisplay from "./EventDisplay"
import Hand from "./Hand"
import BoardState from "../game/BoardState"
import EffectExecution from "../game/EffectExecution"

class Board extends React.Component<{}, BoardState> {
  constructor(props: Readonly<{}>){
    super(props);
    this.state = {
      eventStorage: [],
      cardStorage: [],
      eventPool: [],
      cardPool: [],
      cardDiscard: [],
      hand: [],
      control: 5,
      effectExecution: new EffectExecution(this),
      currentEvent: {name: "Placeholder", description:"you shouldn't see this", isStarter: false, id: -1, hiddenDesc: "seriously"}
    }
    this.discardFromHand = this.discardFromHand.bind(this);
    this.drawEvent = this.drawEvent.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.appendToEvent = this.appendToEvent.bind(this);
  }

  shuffle(pile: Event[]): void;
  shuffle(pile: Card[]): void;
  shuffle(pile: Event[], returnPile: boolean): Event[];
  shuffle(pile: Card[], returnPile: boolean): Card[];
  // shuffle the card/event pool
  // @returnPile asks whether the shulled pile should be insterted into state or should it be a return value
  shuffle(pile: any[], returnPile?: boolean){
    const pileLength: number = pile.length;
    let shuffledPile: any[] = [];
    while(shuffledPile.length !== pileLength){
      let randomIndex: number = Math.floor(Math.random() * pile.length);
      shuffledPile.push(pile.splice(randomIndex, 1)[0]);
    }
    if(returnPile){
      return shuffledPile;
    } else {
      // checks whether the shuffled pile is a pile of events or cards and sets the state based on that
      ('hiddenDesc' in shuffledPile[0]) ? this.setState({eventPool: shuffledPile}) : this.setState({cardPool: shuffledPile});
    }
  }

  // draw either up to three cards or up to specified number of cards
  drawCards(cardNum?: number): void{
    this.setState(prevState => {
      let {hand, cardPool, cardDiscard} = prevState;
      for(let i = 0; i < (cardNum || 3); i++){
        if(hand[i]) continue
        // shuffle discard pile into the card pool if the card pool is empty
        if(!cardPool.length) {
          cardPool = [...prevState.cardDiscard];
          cardPool = this.shuffle(cardPool, true);
          cardDiscard = [];
        }
        let drawnCard: Card = cardPool.splice(cardPool.length - 1)[0];
        hand.push(drawnCard);
      }
      return {hand, cardPool, cardDiscard}
    })
  }

  drawEvent(): void {
    this.setState(prevState => {
      let {eventPool} = prevState;
      // slice off the last item in the event pool and save it to a variable
      let currentEvent: Event = eventPool.splice(eventPool.length - 1)[0];
      return {eventPool, currentEvent}
    });
  }

  // discard a certain card from hand, add it to discard pile and return it
  discardFromHand(card: Card): Card {
    let hand: Card[] = [...this.state.hand];
    let cardDiscard: Card[] = [...this.state.cardDiscard];
    let cardIndex: number = hand.indexOf(card);
    let discardedCard: Card = hand.splice(cardIndex, 1)[0];
    cardDiscard.push(discardedCard);
    this.setState({hand, cardDiscard});
    return discardedCard;
  }

  // add additional text beneath the current event description
  appendToEvent(addition: string): void {
    this.setState(prevState => {
      let {currentEvent} = prevState;
      let currentDesc = currentEvent.description;
      currentEvent.description = currentDesc + '\n \n' + addition;
      return {currentEvent}
    });
  }

  // makes initial API calls to receive all cards and events
  componentDidMount(){
    fetch('/api/start')
    .then(res => res.json())
    .then(res => {
      this.setState({
        cardStorage: res.cards.filter((card: Card) => !card.isStarter),
        cardPool: res.cards.filter((card: Card) => card.isStarter),
        eventStorage: res.events.filter((event: Event) => !event.isStarter),
        eventPool: res.events.filter((event: Event) => event.isStarter)
      });
      this.shuffle(this.state.cardPool);
      this.drawEvent();
      this.drawCards();
    })
  }

//         {this.state.cardPool.length ? this.state.cardPool.map(card => {return <h1 key={card.id}>{card.name}</h1>}) : "Loading...."}

  render(){
    return(
      <div>
        {this.state.currentEvent ? <EventDisplay event={this.state.currentEvent}/> : "Loading...."}
        <h2>Hand:</h2>
        {this.state.hand.length ? <Hand
          appendToEvent={this.appendToEvent}
          eventId={this.state.currentEvent.id}
          discard={this.discardFromHand}
          hand={this.state.hand}/> : "No hand"}
        <button onClick={() => this.drawCards()}>Draw</button>
        <button onClick={() => this.shuffle(this.state.cardPool)}>Shuffle</button>
      </div>
    )
  }
}

export default Board;
