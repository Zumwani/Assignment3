import React from 'react'

type Params = {
    title: string
}

const SpecialtyButton: React.FC<Params> = ({ title }) => {
  return (
    <button className="button-specialty mt-4">
      <div className='text-center'>
          <h6>{title}</h6>
          <a className="underline" href='#a'>Get Started {">"}</a>
      </div>
    </button>
  )
}

export default SpecialtyButton