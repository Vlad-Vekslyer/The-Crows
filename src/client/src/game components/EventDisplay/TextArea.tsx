import React from "react"

interface TextAreaProps {
  value: string,
  clickHandler?: () => void
}

function EventTextArea(props: TextAreaProps){
  return (
    <textarea rows={15} cols={180} readOnly value={props.value} onClick={props.clickHandler} className="desc"/>
  )
}

export default EventTextArea
