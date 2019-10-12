import React, {useState} from "react"
import {sizes} from "../style"
import styled from "styled-components"
import ControlCounter from "../../assets/ControlCounter.png"
import Infocon from "../InfoDisplay/Infocon"

const StyledControl = styled.span`
  position: relative;
  align-self: flex-end;
  text-align: center;
  width: 80px;
  height: 100px;
  font-size: 3em
  font-family: Typewriter;
  background-image: url(${ControlCounter});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  @media (max-width:${sizes.medium}px){
    align-self: inherit;
  }`

const StyledNumber = styled.span`
  display: inline-block;
  margin-top: 28px;`

interface Props{
  control: number
}

function ControlDisplay(props: Props){
  let [isHovered, setHovered] = useState(false)
  return(
    <StyledControl onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Infocon
        messageLocation={{left: 65, top: -90}}
        displayIcon={isHovered}
        message={"Your gang's overall\ncontrol of London"}
      />
      <StyledNumber>{props.control}</StyledNumber>
    </StyledControl>
  )
}

export default ControlDisplay
