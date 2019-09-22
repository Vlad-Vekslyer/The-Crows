import React from "react"
import {Card} from "../../../types/game"

interface Props {
  card: Card,
  id: number,
  eventId: number,
  discard: (card: Card) => Card
}

interface State {
  comboDesc: string
}

class CardDisplay extends React.Component<Props, State>{
  constructor(props: Props){
    super(props);
    this.state = {
      comboDesc: ""
    }
  }

  componentDidMount(){
    fetch(`/api/combo?cardId=${this.props.id}&eventId=${this.props.eventId}`)
    .then(res => res.json())
    .then(res => this.setState({comboDesc: res.comboDesc}));
  }

  render(){
    return(
      <div className="card">
        <h3>{this.props.card.name}</h3>
        <button onClick={() => this.props.discard(this.props.card)}>{this.state.comboDesc}</button>
      </div>
    )
  }
}

export default CardDisplay
