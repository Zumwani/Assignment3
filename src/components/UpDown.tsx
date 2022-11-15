import React from 'react'

type Params = {
    count: number,
    onIncrement: () => void,
    onDecrement: () => void,
    onRemove?: () => void
}

const UpDown: React.FC<Params> = ({ count, onIncrement, onDecrement, onRemove }) => {

    return (
    <div className='up-down'>
        <button onClick={ () => count < 2 ? (onRemove == null ? null : onRemove()) : onDecrement() }>-</button>
        <span data-testid="count">{count}</span>
        <button onClick={ onIncrement }>+</button>
    </div>
    )

}

export default UpDown