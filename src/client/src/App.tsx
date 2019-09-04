import React from 'react';
import {Card} from '../types/game'

interface State {
  starterCards : Card[]
}

class App extends React.Component<{}, State> {

  constructor(props: Readonly<State>){
    super(props);
    this.state = {
      starterCards : []
    }
  }

  componentDidMount = () : void => {
    fetch('/api/starter_cards')
    .then(res => res.json())
    .then(res => this.setState({starterCards: res.cards}))
  }

  render(){
    let cardNames : React.ReactNode[];
    cardNames = this.state.starterCards.map(card => <h2>{card.name}</h2>)
    return(
      <div>
        {this.state.starterCards ? cardNames : "Loading..."}
      </div>
    )
  }
}

export default App;
