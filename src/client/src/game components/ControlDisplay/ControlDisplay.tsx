import React from "react"
import {sizes} from "../style"
import styled from "styled-components"

const StyledControl = styled.span`
  align-self: flex-end;
  @media (max-width:${sizes.medium}px){
    align-self: inherit;
  }`

interface Props{
  control: number
}

function ControlDisplay(props: Props){
  return(
    <StyledControl>
      <span>Control: </span><span>{props.control}</span>
    </StyledControl>
  )
}

export default ControlDisplay
