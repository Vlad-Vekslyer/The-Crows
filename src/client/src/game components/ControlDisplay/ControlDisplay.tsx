import React from "react"
import {sizes} from "../style"
import styled from "styled-components"
import ControlCounter from "../../assets/ControlCounter.png"

const StyledControl = styled.span`
  align-self: flex-end;
  text-align: center;
  width: 80px;
  height: 52px;
  font-size: 3em
  font-family: Typewriter;
  background-image: url(${ControlCounter});
  background-position: center;
  background-size: cover;
  @media (max-width:${sizes.medium}px){
    align-self: inherit;
  }`

const StyledNumber = styled.span`
  display: inline-block;
  margin-top: 6px;`

interface Props{
  control: number
}

function ControlDisplay(props: Props){
  return(
    <StyledControl>
      <StyledNumber>{props.control}</StyledNumber>
    </StyledControl>
  )
}

export default ControlDisplay
