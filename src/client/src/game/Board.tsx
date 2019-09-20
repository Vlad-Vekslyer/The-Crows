import React from "react";
import {Event, Card} from "../../../types/game"
import EventDisplay from "./EventDisplay"

interface State {
  // storage contains cards/events currently out of the game
  // pile contains cards/events that can be drawn currently
  eventStorage: Event[],
  cardStorage: Card[],
  eventPool: Event[],
  cardPool: Card[],
  eventDiscard: Event[],
  cardDiscard: Card[],
  hand: Card[],
  currentEvent: Event
}

class Board extends React.Component<{}, State> {
  constructor(props: Readonly<{}>){
    super(props);
    this.state = {
      eventStorage: [],
      cardStorage: [],
      eventPool: [],
      cardPool: [],
      eventDiscard: [],
      cardDiscard: [],
      hand: [],
      currentEvent: {name: "Placeholder", description:"you shouldn't see this", isStarter: false, id: -1, hiddenDesc: "seriously"}
    }
    this.drawEvent = this.drawEvent.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  shuffle(pile: Event[]): void;
  shuffle(pile: Card[]): void;
  // shuffle the card/event pool
  shuffle(pile: any[]){
    const pileLength: number = pile.length;
    let shuffledPile: any[] = [];
    while(shuffledPile.length !== pileLength){
      let randomIndex: number = Math.floor(Math.random() * pile.length);
      shuffledPile.push(pile.splice(randomIndex, 1)[0]);
    }
    ('hiddenDesc' in shuffledPile[0]) ? this.setState({eventPool: shuffledPile}) : this.setState({cardPool: shuffledPile});
  }

  drawEvent(): void{
    this.setState(prevState => {
      let {eventPool, eventDiscard} = prevState;
      // slice off the last item in the event pool and save it to a variable
      let currentEvent: Event = eventPool.splice(eventPool.length - 1)[0];
      eventDiscard.push(currentEvent);
      return {eventDiscard, eventPool, currentEvent}
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
      this.drawEvent();
    })
  }

  render(){
    return(
      <div>
        {this.state.currentEvent ? <EventDisplay event={this.state.currentEvent}/> : "Loading...."}
        {this.state.cardPool.length ? this.state.cardPool.map(card => {return <h1 key={card.id}>{card.name}</h1>}) : "Loading...."}
        <button onClick={() => this.shuffle(this.state.cardPool)}>Shuffle</button>
      </div>

    )
  }
}

export default Board;
