import React from "react";
import {Event, Card} from "../../../types/game"

interface State {
  // storage contains cards/events currently out of the game
  // pile contains cards/events that can be drawn currently
  eventStorage: Event[],
  cardStorage: Card[],
  eventPool: Event[],
  cardPool: Card[],
  eventDiscard: Event[],
  cardDiscard: Card[],
  currentEvent: Event | undefined,
  hand: Card[]
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
      currentEvent: undefined,
      hand: []
    }
    this.shuffle = this.shuffle.bind(this);
    this.draw = this.draw.bind(this);
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

  draw(): void{
    for(var i = 0; i < 3; i ++) {
      if(this.state.hand.length < 3){
        this.setState(prevState => {
          console.log(prevState);
          let {hand, cardPool} = prevState;
          let card : Card = cardPool[prevState.cardPool.length - 1];
          hand[prevState.hand.length] = card;
          cardPool.splice(cardPool.length - 1);
          return {
            hand,
            cardPool
          }
        });
      }
      if(!this.state.currentEvent){
        this.setState(prevState => {
          let eventPool = prevState.eventPool;
          let event: Event = eventPool[eventPool.length - 1];
          eventPool.splice(eventPool.length - 1);
          return {
            currentEvent: event,
            eventPool
          }
        });
      }
    }
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
      })
    })
  }

  render(){
    console.log(this.state);
    return(
      <div>
        {this.state.cardPool.length ? this.state.cardPool.map(card => {return <h1>{card.name}</h1>}) : "Loading...."}
        <button onClick={() => this.shuffle(this.state.cardPool)}>Shuffle</button>
        <button onClick={() => this.draw()}>Draw</button>
      </div>

    )
  }
}

export default Board;
