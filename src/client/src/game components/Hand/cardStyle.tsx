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

export const StyledCard = styled('div')<{isHighProfile: boolean}>`
    margin: 0 2px;
    display: flex;
    flex-direction: column;
    width: 160px;
    box-shadow: ${props => {if(props.isHighProfile) return '0px 0px 18px #C60B0B'}};
    font-family: Typewriter`;

export const StyledCardHeader = styled.h4`
    background-color: #454242;
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
