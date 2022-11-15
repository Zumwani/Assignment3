import React from 'react'

type Params = {
    color: string,
    text: string
    simple?: boolean,
}

const ActionButton: React.FC<Params> = ({ color, simple, text }) => {
  return (
    <button className={"action " + color + (simple ? " simple" : "")}>{text}</button>
  )
}

export default ActionButton