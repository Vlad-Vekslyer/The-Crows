import React from 'react';
import styled from "styled-components";
import Board from './game components/Board'
import background from './assets/background.jpg'
import veteran from './assets/veteran.ttf'
import Bohemian from './assets/Bohemian.ttf'
import CardDraw from "./assets/CardDraw.mp3"
import {sizes} from "./game components/style"

const StyledApp = styled.div`
    color: white;
    height: 100vh;
    background-image: url(${background});
    background-size: cover;
    @font-face{
      font-family: "Typewriter";
      src: url(${veteran}) format("truetype");
    }
    @font-face{
      font-family: "Bohemian";
      src: url(${Bohemian}) format("truetype");
    }
    @media (max-width:${sizes.medium}px) and (max-height:852px){
      height: 100%;
    }`

class App extends React.Component<{}, {}> {
  render(){
    return(
      <StyledApp>
        <Board cardDrawSound={new Audio(CardDraw)}/>
      </StyledApp>
    )
  }
}

export default App;
