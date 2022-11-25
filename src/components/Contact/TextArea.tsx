import React from 'react'
import { InputParams } from './Input'

const TextArea: React.FC<InputParams> = ({id, placeholder, errorMessage, containerClassName, value, onChange, onKeyUp}) =>
(
    <div className={containerClassName}>
        <textarea id={id} placeholder={placeholder} value={value} onChange={onChange} onKeyUp={onKeyUp}
                    className={errorMessage ? "error" : undefined}/>
        <p className='error-message'>{errorMessage}</p>
    </div>
)

export default TextArea