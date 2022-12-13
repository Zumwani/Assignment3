import React from 'react'

type Params = {
    count: number
}

const Rating: React.FC<Params> = ({ count }) => {
  return (
    <div className='container d-flex w-fit-content'>
        <div className='row m-auto'>
            <p className='star col'>{ count > 0 ? "★" : "☆" }</p>
            <p className='star col'>{ count > 1 ? "★" : "☆" }</p>
            <p className='star col'>{ count > 2 ? "★" : "☆" }</p>
            <p className='star col'>{ count > 3 ? "★" : "☆" }</p>
            <p className='star col'>{ count > 4 ? "★" : "☆" }</p>
        </div>
    </div>
  )
}

export default Rating