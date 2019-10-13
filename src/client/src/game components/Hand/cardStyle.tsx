import styled from "styled-components"
import {sizes} from "../style"
import Assault from "../../assets/icons/Assault.png"
import ArmedAssault from "../../assets/icons/ArmedAssault.png"
import Deception from "../../assets/icons/Deception.png"
import Espionage from "../../assets/icons/Espionage.png"
import Investigation from "../../assets/icons/Investigation.png"
import Negotiation from "../../assets/icons/Negotiation.png"
import PoliceCorruption from "../../assets/icons/PoliceCorruption.png"
import Threat from "../../assets/icons/Threat.png"
import Bolt from "../../assets/Bolt.png"

const cardIcons: {[index:string]: string} = {
  "Assault": Assault,
  "Armed Assault": ArmedAssault,
  "Deception": Deception,
  "Espionage": Espionage,
  "Investigation": Investigation,
  "Negotiation": Negotiation,
  "Police Corruption": PoliceCorruption,
  "Threat": Threat
}

function getCardSpot(theme: any, cardNum: number){
  return `
    transform: ${theme[cardNum] ? theme[cardNum].rotation : "0"};
    left: ${theme[cardNum] ? theme[cardNum].verticalLocation : "0"};
    top: ${theme[cardNum] ? (theme[cardNum].horizontalLocation || "0") : "0"};
    z-index: ${theme[cardNum] ? theme[cardNum].zIndex : "0"};`
}

export const StyledCard = styled('div')<{isHighProfile: boolean}>`
    transition: top 500ms, transform 500ms;
    top: 0;
    left: 0;
    position: relative;
    margin-left: 2px;
    margin-top: 14px;
    margin-right: 2px;
    display: flex;
    flex-direction: column;
    width: 160px;
    height: 290px;
    box-shadow: ${props => {if(props.isHighProfile) return '0px 0px 18px #C60B0B'}};
    font-family: Typewriter;
    @media (min-width: ${sizes.medium}px) and (min-height: 754px){
      &:first-child  {${props => getCardSpot(props.theme, 1)}}
      &:nth-child(2) {${props => getCardSpot(props.theme, 2)}}
      &:nth-child(3) {${props => getCardSpot(props.theme, 3)}}
      &:nth-child(4) {${props => getCardSpot(props.theme, 4)}}
      &:nth-child(5) {${props => getCardSpot(props.theme, 5)}}
    }
    @media (max-width: ${sizes.medium}px){
      margin-top: 10px;
    }
    &:hover{
      z-index: 5;
      cursor: pointer;
      top: -20px;
    }`;

export const StyledCardHeader = styled.h4`
    background-color: #454242;
    height: 18.5px;
    border: 1px solid #C7C7C7;
    text-align: center;
    margin: 0;
    letter-spacing: 1px;
    padding: 5px 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 3px 3px 0px 0px;
    z-index: 1;`

export const StyledCardImage = styled('div')<{name: string}>`
    width: 100%;
    background-image: url(${props => cardIcons[props.name]});
    background-size: cover;
    background-position: center;
    height: 130px;`

export const StyledCardBottom = styled.div`
    background-color: #454242;
    border: 1px solid #C7C7C7;
    height: 120px;
    padding: 4px;
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.5);`

export const StyledCardDescription = styled.div`
    position: relative;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #848484;
    height: 100%;
    padding: 2px 5px;
    text-align: center;`

export const BoltIcon = styled('span')<{left: number, top: number}>`
    background-image: url(${Bolt});
    background-size: cover;
    background-position: center;
    display: inline-block;
    width: 7px;
    margin: 0 auto;
    height: 7px;
    position: absolute;
    left: ${props => props.left}%;
    top: ${props => props.top}%`
