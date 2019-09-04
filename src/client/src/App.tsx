import React from 'react';
import {Card, Event} from '../types/game'

interface State {
  starterCards : Card[],
  starterEvents: Event[]
}

class App extends React.Component<{}, State> {

  constructor(props: Readonly<State>){
    super(props);
    this.state = {
      starterCards : [],
      starterEvents : []
    }
  }

  componentDidMount = () => {
    fetch('/api/starter')
    .then(res => res.json())
    .then(res => this.setState({starterCards: res.cards, starterEvents: res.events}))
  }

  supplyCardComponents = (): React.ReactNode[] => this.state.starterCards.map(card => <h2 key={card.id}>{card.name}</h2>);

  render(){
    let cardNames : React.ReactNode[] | null;
    cardNames = this.state.starterCards.length !== 0 ? this.supplyCardComponents() : null;
    return(
      <div>
        {this.state.starterCards.length !== 0 ? cardNames : <h2>Loading...</h2>}
        <h2 style={{textDecoration: "underline"}}>{this.state.starterEvents[0] ? this.state.starterEvents[0].name : "Loading..."}</h2>
      </div>
    )
  }
}

export default App;
