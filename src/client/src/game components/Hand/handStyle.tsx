import styled from "styled-components"
import {sizes} from "../style"

interface Themes {
  [index: string]: CardSpots
}

interface CardSpot {
  rotation: string,
  verticalLocation: string,
  horizontalLocation?: string,
  zIndex: string
}

interface CardSpots {
  1: CardSpot,
  2?: CardSpot,
  3?: CardSpot,
  4?: CardSpot,
  5?: CardSpot
}

export const themes: Themes = {
  "1 Cards": {
    1: {
      rotation: "rotate(0deg);",
      verticalLocation: "0px;",
      zIndex: "2"
    }
  },
  "2 Cards": {
    1: {
      rotation: "rotate(-2deg);",
      verticalLocation: "10px",
      horizontalLocation: "8px",
      zIndex: "2"
    },
    2: {
      rotation: "rotate(2deg);",
      verticalLocation: "10px",
      horizontalLocation: "8px",
      zIndex: "1"
    }
  },
  "3 Cards": {
    1: {
      rotation: "rotate(-6deg);",
      verticalLocation: "10px",
      horizontalLocation: "8px",
      zIndex: "2"
    },
    2: {
      rotation: "rotate(0);",
      verticalLocation: "0",
      zIndex: "1"
    },
    3: {
      rotation: "rotate(6deg);",
      horizontalLocation: "8px",
      verticalLocation: "-10px",
      zIndex: "0"
    }
  },
  "4 Cards": {
    1: {
      rotation: "rotate(-12deg);",
      verticalLocation: "7px",
      horizontalLocation: "23px",
      zIndex: "3"
    },
    2: {
      rotation: "rotate(-5deg);",
      verticalLocation: "0",
      zIndex: "2"
    },
    3: {
      rotation: "rotate(3deg);",
      horizontalLocation: "-2px",
      verticalLocation: "-8px",
      zIndex: "1"
    },
    4: {
      rotation: "rotate(12deg);",
      horizontalLocation: "19px",
      verticalLocation: "-17px",
      zIndex: "0"
    }
  },
  "5 Cards": {
    1: {
      rotation: "rotate(-12deg);",
      verticalLocation: "15px",
      horizontalLocation: "22px",
      zIndex: "4"
    },
    2: {
      rotation: "rotate(-6deg);",
      verticalLocation: "0",
      zIndex: "3"
    },
    3: {
      rotation: "rotate(0);",
      verticalLocation: "-15px",
      horizontalLocation: "-7px",
      zIndex: "2"
    },
    4: {
      rotation: "rotate(6deg);",
      horizontalLocation: "0",
      verticalLocation: "-28px",
      zIndex: "1"
    },
    5: {
      rotation: "rotate(12deg);",
      horizontalLocation: "24px",
      verticalLocation: "-43px",
      zIndex: "0"
    }
  }
}

export const StyledHand = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  padding-right: 25px;
  justify-content: center
  @media (max-width: ${sizes.small}px){
    flex-wrap: wrap;
  }`
