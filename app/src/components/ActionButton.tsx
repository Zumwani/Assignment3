import React from 'react'

type Params = {
  color: string;
  text: string;
  simple?: boolean;
  className?: string;
}

const ActionButton: React.FC<Params> = ({ color, simple, text, className }) => {
  return (
    <button className={"action " + color + (simple ? " simple" : "") + (className ? " " + className : undefined)}>{text}</button>
  )
}

export default ActionButton