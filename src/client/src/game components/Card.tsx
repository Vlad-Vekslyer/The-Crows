import React from "react"
import {Card, Effect} from "../../../types/game"
import {ComboResponse} from "../../../types/API"
import EffectExecution from "../game/EffectExecution"

interface Props {
  card: Card,
  id: number,
  eventId: number,
  isHolding: boolean,
  effectExecution: EffectExecution,
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
  resolveHighProfile(): {resultDesc: string, effects: Effect}{
    let successChance: number = this.state.successChance as number;
    let effectsArr: Effect[] = this.state.effects as Effect[];
    let didSucceed: boolean;
    let effects: Effect;
    let resultDesc: string;
    let roll: number = Math.floor(Math.random() * 100) + 1;
    roll <= successChance ? didSucceed = true : didSucceed = false;
    if(didSucceed) {
      effects = effectsArr[0];
      resultDesc= this.state.resultDesc[0];
    }
    else {
      effects = effectsArr[1];
      resultDesc = this.state.resultDesc[1];
    }
    return {resultDesc, effects};
  }

  componentDidMount(){
    fetch(`/api/combo?cardId=${this.props.id}&eventId=${this.props.eventId}`)
    .then(res => res.json())
    .then(res => this.setState(res));
  }

  render(){
    return(
      <div className="card">
        <h3>{this.props.card.name}</h3>
        <button disabled={this.props.isHolding} onClick={() => {
          this.props.discard(this.props.card);
          let resultDesc: string;
          let effects: Effect;
          this.state.successChance? ({resultDesc, effects} = this.resolveHighProfile()) : ({resultDesc, effects} = this.state as {resultDesc: string, effects: Effect});
          this.props.appendToEvent(resultDesc);
          console.log(effects);
          this.props.effectExecution.exec(effects);
        }}>{this.state.comboDesc}</button>
      </div>
    )
  }
}

export default CardDisplay
