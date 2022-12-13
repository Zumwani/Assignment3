import React from 'react'

type param = {
    icon: string
}

const IconButton = ({ icon }: param) => {
  return (
    <div className={"button-icon fa " + icon}></div>
  )
}

export default IconButton