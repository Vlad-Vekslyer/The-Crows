import React from "react"
import styled from "styled-components"

const Message = styled.span`
    display: none;`

const Icon = styled.span`
    display: inline-block;
    font-family: Georgia;
    font-style: italic;
    color: rgb(207, 207, 207);`

const StyledInfocon = styled.span`
    display: inline-block;
    box-shadow: 0px 10px 46px 14px rgba(0,0,0,0.75);
    text-align: center;
    width: 17px;
    height: 17px;
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgb(94, 94, 94);
    border-radius: 18px;`

interface Props {
  message: string
}

function Infocon(props: Props){
  return(
    <StyledInfocon>
      <Icon>i</Icon>
      <Message>{props.message}</Message>
    </StyledInfocon>
  )
}

export default Infocon
