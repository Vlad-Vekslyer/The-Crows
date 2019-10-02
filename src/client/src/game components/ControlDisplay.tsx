import React from "react"

interface Props{
  control: number
}

function ControlDisplay(props: Props){
  return(
    <div id="control-display">
      <span>Control: </span><span>{props.control}</span>
    </div>
  )
}

export default ControlDisplay
