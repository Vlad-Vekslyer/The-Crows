import React from "react"
import styled from "styled-components"
import EasyNight from "../../assets/EasyNight.mp3"

const StyledAudioPlayer = styled.div`
    display: inline;
    position: fixed;`

const StyledButton = styled.button`
    border: none;
    padding: 0;
    background-color: transparent;
    color: white;
    font-weight: 800;
    font-size: 1em;
    &:hover {
      color: grey;
    }
    &:focus {
      outline: none;
    }
    &:nth-of-type(2){
      margin-left: 7px;
    }`

class AudioPlayer extends React.Component<{}, {isPaused: boolean}>{
  constructor(props: Readonly<{}>){
      super(props);
      this.state = {
        isPaused: true
      }
      this.playHandler = this.playHandler.bind(this);
      this.resetHandler = this.resetHandler.bind(this);
  }

  playHandler(){
    let audio: HTMLAudioElement = document.getElementsByTagName("audio")[0];
    audio.paused ? audio.play() : audio.pause();
    this.setState({isPaused: audio.paused});
  }

  resetHandler(){
    let audio: HTMLAudioElement = document.getElementById("background-music") as HTMLAudioElement;
    audio.load();
    audio.play();
    this.setState({isPaused: audio.paused});
  }

  render(){
    return(
      <StyledAudioPlayer>
        <audio id="background-music" loop={true}>
          <source src={EasyNight}/>
        </audio>
        <StyledButton onClick={this.playHandler}>{this.state.isPaused ? "▶" : "❚❚"}</StyledButton>
        <StyledButton onClick={this.resetHandler}>↻</StyledButton>
      </StyledAudioPlayer>
    )
  }
}

export default AudioPlayer
