import React from "react"
import styled from "styled-components"

const StyledControl = styled.span`
  align-self: flex-end;`

interface Props{
  control: number
}

function ControlDisplay(props: Props){
  return(
    <StyledControl id="control-display">
      <span>Control: </span><span>{props.control}</span>
    </StyledControl>
  )
}

export default ControlDisplay
