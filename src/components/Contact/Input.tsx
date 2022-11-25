import React from 'react'

export type InputParams = {
    id: string;
    placeholder?: string;
    errorMessage?: string;
    containerClassName?: string;
    value: string|number;
    onChange: React.ChangeEventHandler;
    onKeyUp: React.KeyboardEventHandler;
    type?: string;
}

const Input: React.FC<InputParams> = ({id, placeholder, errorMessage, containerClassName, value, onChange, onKeyUp, type = 'text'}) =>
(
    <div className={containerClassName ?? undefined}>
        <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyUp={onKeyUp}
               className={errorMessage ? "error" : undefined}/>
        <p className='error-message'>{errorMessage}</p>
    </div>
)

export default Input