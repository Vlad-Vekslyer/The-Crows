import styled from "styled-components"

export const sizes = {
  large: 1140,
  medium: 1000,
  small: 870
}

export const StyledBoard = styled.div`
  width: 80%;
  margin: 0 auto;
  @media (max-width: ${sizes.large}px){
    width: 90%;
  }
  @media (max-width: ${sizes.medium}px){
    width: 95%;
  }`

export const StyledBottom = styled.footer`
  display: flex;
  @media (max-width: ${sizes.medium}px){
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }`
