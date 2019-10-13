import styled from "styled-components"
import revolver from "../../assets/revolver.png"
import {sizes} from "../style"

export const StyledTextArea = styled.textarea`
  width: 100%;
  background-color: black;
  color: white;
  font-family: "Typewriter";
  letter-spacing: 0.8px;
  font-size: 1.2em;
  line-height: 1em;
  padding: 10px;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  display: inline-block;
  background-image: url(${revolver});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media(max-width:${sizes.small}px){
    font-size: 1em;
  }`

export const StyledHeader = styled.header`
  display: block;
  text-align: center;
  font-family: Diplomata SC;
  color: #D4D4D4;
  font-size: 1.5em;
  margin-bottom: 10px;`
