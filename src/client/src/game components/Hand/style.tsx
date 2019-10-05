import styled from "styled-components"
import {sizes} from "../style"


export const StyledHand = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center
  @media (max-width: ${sizes.small}px){
    flex-wrap: wrap;
  }`

export const StyledCard = styled.div`
    margin: 0 2px;
    width: 160px`;
