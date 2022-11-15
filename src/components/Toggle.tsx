import React from 'react'

type Params = {
    id: string,
    name: string,
    text: string,
    onChange?: () => void,
    checked?: boolean
}

const Toggle: React.FC<Params> = ({ id, name, text, onChange, checked = false }) =>
(
    <>
        <input className='toggle' id={id} name={name} onChange={onChange} type="radio" defaultChecked={checked}/>
        <label htmlFor={id}>{text}</label>
    </>
)

export default Toggle