import React from "react"
import {Card, Effect} from "../../../../types/game"
import * as style from "./cardStyle"
import {ComboResponse} from "../../../../types/API"
import EffectExecution from "../../game/EffectExecution"
import GameState from "../../game/GameState"

interface Props {
  card: Card,
  id: number,
  eventId: number,
  gameState: GameState
  effectExecution: EffectExecution,
  discard: (card: Card) => Card,
  appendToEvent: (addition: string) => void
}

class CardDisplay extends React.Component<Props, ComboResponse>{
  cardRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props){
    super(props);
    this.state = {
      comboDesc: "",
      resultDesc: "",
      effects: []
    }
    this.cardRef = React.createRef();
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

  componentDidUpdate(prevProps: Props){
    if(this.props.eventId > 0 && prevProps.eventId !== this.props.eventId){
      fetch(`/api/combo?cardId=${this.props.id}&eventId=${this.props.eventId}`)
      .then(res => res.json())
      .then(res => {
        if(res.successChance) this.setState(res);
        else this.setState({comboDesc: res.comboDesc, resultDesc: res.resultDesc, effects: res.effects, successChance: undefined})
      });
    }
  }

  componentDidMount(){
    fetch(`/api/combo?cardId=${this.props.id}&eventId=${this.props.eventId}`)
    .then(res => res.json())
    .then(res => this.setState(res))
    .catch(err => console.error(err));
  }

  render(){
    let disablingGameState: GameState[] = [GameState.lost, GameState.won, GameState.finishedEvent]
    return(
      <style.StyledCard ref={this.cardRef}
        isHighProfile={this.state.resultDesc.length === 2}
        onClick={() => {
          // if the current gameState does not prevent card selection
          if(disablingGameState.indexOf(this.props.gameState) === -1){
            window.scrollTo(0,0);
            if(this.cardRef.current) {
              this.cardRef.current.style.animation = `card-click 200ms linear`;
              this.cardRef.current.addEventListener('animationend', () => {
                this.props.discard(this.props.card);
                let resultDesc: string;
                let effects: Effect;
                // having multiple result descriptions means the combination is high profile
                this.state.successChance ? ({resultDesc, effects} = this.resolveHighProfile()) : ({resultDesc, effects} = this.state as {resultDesc: string, effects: Effect});
                this.props.appendToEvent(resultDesc);
                this.props.effectExecution.exec(effects);
              })
            }
          }
      }}>
        <style.StyledCardHeader>{this.props.card.name}</style.StyledCardHeader>
        <style.StyledCardImage name={this.props.card.name}/>
        <style.StyledCardBottom>
          <style.StyledCardDescription>
            <style.BoltIcon top={1} left={1}/><style.BoltIcon top={1} left={95}/>
            {this.state.comboDesc}
            <style.BoltIcon top={92} left={1}/><style.BoltIcon top={92} left={95}/>
          </style.StyledCardDescription>
        </style.StyledCardBottom>
      </style.StyledCard>
    )
  }
}

export default CardDisplay
