import React from "react";
import {Event, Card} from "../../../types/game"

interface State {
  // storage contains cards/events currently out of the game
  // pile contains cards/events that can be drawn currently
  eventStorage: Event[],
  cardStorage: Card[],
  eventPool: Event[],
  cardPool: Card[],
  currentEvent: Event | undefined
}

class Board extends React.Component<{}, State> {
  constructor(props: Readonly<{}>){
    super(props);
    this.state = {
      eventStorage: [],
      cardStorage: [],
      eventPool: [],
      cardPool: [],
      currentEvent: undefined
    }
    this.shuffle = this.shuffle.bind(this);
  }

  shuffle(pile: Event[]): void;
  shuffle(pile: Card[]): void;

  shuffle(pile: any[]){
    const pileLength: number = pile.length;
    let shuffledPile: any[] = [];
    while(shuffledPile.length !== pileLength){
      let randomIndex: number = Math.floor(Math.random() * pile.length);
      shuffledPile.push(pile.splice(randomIndex, 1)[0]);
    }
    ('hiddenDesc' in shuffledPile[0]) ? this.setState({eventPool: shuffledPile}) : this.setState({cardPool: shuffledPile});
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
    return(
      <div>
        {this.state.cardPool.length ? this.state.cardPool.map(card => {return <h1>{card.name}</h1>}) : "Loading...."}
        <button onClick={() => this.shuffle(this.state.cardPool)}>Shuffle</button>
      </div>

    )
  }
}

export default Board;
