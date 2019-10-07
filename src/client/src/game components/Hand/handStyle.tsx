import styled from "styled-components"
import {sizes} from "../style"

export const StyledHand = styled.div`
  display: flex;
  margin: 30px auto 0;
  justify-content: center
  @media (max-width: ${sizes.small}px){
    flex-wrap: wrap;
  }`
