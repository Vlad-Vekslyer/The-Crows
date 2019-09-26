import React from "react"
import {Card} from "../../../types/game"
import {ComboResponse} from "../../../types/API"

interface Props {
  card: Card,
  id: number,
  eventId: number,
  discard: (card: Card) => Card,
  appendToEvent: (addition: string) => void
}

class CardDisplay extends React.Component<Props, ComboResponse>{
  constructor(props: Props){
    super(props);
    this.state = {
      comboDesc: "",
      resultDesc: "",
      effects: []
    }
    this.resolveHighProfile = this.resolveHighProfile.bind(this);
  }

  // decide whether the high profile action succeeded and return the appropriate result description
  resolveHighProfile(): string{
    let successChance: number = this.state.successChance as number;
    let didSucceed: boolean;
    let roll: number = Math.floor(Math.random() * 100) + 1;
    roll <= successChance ? didSucceed = true : didSucceed = false;
    if(didSucceed) {
      let resultDesc: string = this.state.resultDesc[0];
      this.setState(prevState => {return {resultDesc: prevState.resultDesc[0]}});
      return resultDesc;
    }
    else {
      let resultDesc: string = this.state.resultDesc[1];
      this.setState(prevState => {return {resultDesc: prevState.resultDesc[1]}});
      return resultDesc;
    }
  }

  componentDidMount(){
    fetch(`/api/combo?cardId=${this.props.id}&eventId=${this.props.eventId}`)
    .then(res => res.json())
    .then(res => this.setState(res));
  }

  render(){
    console.log(this.state.effects);
    return(
      <div className="card">
        <h3>{this.props.card.name}</h3>
        <button onClick={() => {
          this.props.discard(this.props.card);
          let resultDesc: string;
          this.state.successChance? resultDesc = this.resolveHighProfile() : resultDesc = this.state.resultDesc as string;
          this.props.appendToEvent(resultDesc);
        }}>{this.state.comboDesc}</button>
      </div>
    )
  }
}

export default CardDisplay
