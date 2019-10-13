import React from "react"
import styled from "styled-components"
import {sizes} from "../style"

const Message = styled('p')<{displayMessage: boolean, location?: Location}>`
    display: ${props => props.displayMessage ? 'inline-block' : 'none'};
    border-radius: 18px;
    padding: 10px;
    border: 3px black solid;
    font-family: Typewriter;
    background-color: rgb(94, 94, 94);
    border-radius: 10px;
    white-space: pre;
    position: relative;
    margin: 5px;
    top: ${props => props.location ? props.location.top : "0"}px
    left: ${props => props.location ? props.location.left : "0"}px
    @media(max-width:${sizes.small}px){
      font-size: 0.8em;
    }`


const Icon = styled('span')<{displayIcon: boolean}>`
    display: ${props => props.displayIcon ? 'inline-block' : 'none'};
    font-family: Georgia;
    background-color: rgb(94, 94, 94);
    font-style: italic;
    color: rgb(207, 207, 207);
    border-radius: 18px;
    width: 17px;
    text-align: center;
    height: 17px;
    &:hover{
      cursor: pointer;
    }`

const StyledInfocon = styled.span`
    font-size: 16px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    top: 8px;
    right: 8px;`

interface Location {
  top: number,
  left: number
}

interface Props {
  message: string,
  displayIcon: boolean,
  messageLocation?: Location
}

interface State {
  displayMessage: boolean
}

class Infocon extends React.Component<Props, State>{
  constructor(props: Props){
      super(props);
      this.state = {
        displayMessage: false
      }
  }

  render(){
    return(
      <StyledInfocon>
        <Icon
          onMouseLeave={() => this.setState({displayMessage: false})}
          displayIcon={this.props.displayIcon}
          onClick={() => this.setState(prevState => {return {displayMessage: !prevState.displayMessage}})}>i</Icon>
        <Message
          location={this.props.messageLocation}
          displayMessage={(this.state.displayMessage)}>
          {this.props.message}
        </Message>
      </StyledInfocon>
    )
  }

}

export default Infocon
