import React from 'react';
import styled from "styled-components";
import Board from './game components/Board'
import background from './assets/background.jpg'
import veteran from './assets/veteran.ttf'

const StyledApp = styled.div`
    color: white;
    height: 100vh;
    background-image: url(${background});
    background-size: cover;
    @font-face{
      font-family: "Typewriter";
      src: url(${veteran}) format("truetype");
    }`

class App extends React.Component<{}, {}> {

  render(){
    return(
      <StyledApp>
        <Board />
      </StyledApp>
    )
  }
}

export default App;
