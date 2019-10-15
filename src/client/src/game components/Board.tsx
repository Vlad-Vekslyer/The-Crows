import React from "react";
import {StyledBoard, StyledBottom} from "./style"
import {Event, Card} from "../../../types/game"
import EventDisplay from "./EventDisplay/EventDisplay"
import Hand from "./Hand/Hand"
import BoardState from "../game/BoardState"
import GameState from "../game/GameState"
import EffectExecution from "../game/EffectExecution"
import ControlDisplay from "./ControlDisplay/ControlDisplay"
import AudioPlayer from "./AudioPlayer/AudioPlayer"

interface Props {
  cardDrawSound: HTMLAudioElement
}

class Board extends React.Component<Props, BoardState> {
  effectExecution: EffectExecution

  constructor(props: Readonly<Props>){
    super(props);
    props.cardDrawSound.load();
    this.state = {
      eventStorage: [],
      cardStorage: [],
      eventPool: [],
      cardPool: [],
      cardDiscard: [],
      hand: [],
      control: 3,
      gameState: GameState.waitingInput,
      currentEvent: {name: "Loading", description:"Loading....", isStarter: false, id: -1, hiddenDesc: "seriously"}
    }
    this.effectExecution = new EffectExecution(this)
    this.discardFromHand = this.discardFromHand.bind(this);
    this.drawEvent = this.drawEvent.bind(this);
    this.drawCards = this.drawCards.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.appendToEvent = this.appendToEvent.bind(this);
    this.closeEvent = this.closeEvent.bind(this);
    this.gameOver = this.gameOver.bind(this);
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
    this.playSound(this.props.cardDrawSound);
    this.setState(prevState => {
      if(cardNum && cardNum > 5) {cardNum = 5};
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
    });
  }


  playSound(sound: HTMLAudioElement): Promise<void>{
    return new Promise((resolve) => {
      // play a sound if it's fully loaded.
      if(sound.readyState === 4){
        sound.play()
        .then(() => resolve())
      } else {
        // resolve an empty promise if sound is not loaded
        resolve()
      }
    })
  }

  // remove the last event from the event pile and set it to be the current event
  drawEvent(): void {
    this.setState(prevState => {
      let {eventPool} = prevState;
      // slice off the last item in the event pool and save it to a variable
      let currentEvent: Event = eventPool.splice(eventPool.length - 1)[0];
      return {eventPool, currentEvent, gameState: GameState.waitingInput}
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
    // addition can be null if there's a combination involving Investigation card
    if(addition !== "null"){
      this.setState(prevState => {
        let {currentEvent} = prevState;
        let currentDesc = currentEvent.description;
        currentEvent.description = currentDesc + '\n \n' + addition;
        return {currentEvent}
      });
    }
  }

  // Prevent any further input from the user and print out a message
  closeEvent(): void{
    let gameState: GameState;
    this.appendToEvent("Click here to continue....");
    this.setState(prevState => {
      if(prevState.eventPool.length && prevState.control > 0) {
        gameState = GameState.finishedEvent;
      } else if(prevState.control <= 0){
        gameState = GameState.lost;
      } else {
        gameState = GameState.won;
      }
      return {gameState};
    });
  }

  // display a game end screen
  gameOver(): void {
    if(this.state.gameState === GameState.won){
      this.setState({currentEvent: {name: "Winner", description: "Winner chicken dinner", isStarter: false, id: -2, hiddenDesc: "na"}})
    } else if(this.state.gameState === GameState.lost){
      this.setState({currentEvent: {name: "Loser", description: "Try again", isStarter: false, id: -3, hiddenDesc: "na"}})
    }
  }

  // makes initial API calls to receive all cards and events
  componentDidMount(){
    // let request = new Request('http://localhost:3001/api/start',{headers:{'Access-Control-Allow-Origin': '*'}});
    fetch('http://localhost:3001/api/start')
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

  render(){
    let effectExecution = new EffectExecution(this);
    return(
      <StyledBoard>
        <AudioPlayer/>
        <EventDisplay
          drawCards = {this.drawCards}
          gameOver = {this.gameOver}
          gameState = {this.state.gameState}
          drawEvent = {this.drawEvent}
          event={this.state.currentEvent}/>
        <StyledBottom>
        <ControlDisplay control={this.state.control}/>
        <Hand
          appendToEvent={this.appendToEvent}
          eventId={this.state.currentEvent.id}
          discard={this.discardFromHand}
          effectExecution={effectExecution}
          gameState = {this.state.gameState}
          hand={this.state.hand}/>
        </StyledBottom>
      </StyledBoard>
    )
  }
}

export default Board;


// <button onClick={() => this.drawCards(6)}>Draw to 6 cards</button>
// <button onClick={() => this.shuffle(this.state.cardPool)}>Shuffle</button>
// {this.state.cardPool.length ? this.state.cardPool.map(card => {return <h1 key={card.id}>{card.name}</h1>}) : "Loading...."}
