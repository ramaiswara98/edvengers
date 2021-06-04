import React from 'react'
import './input.css'
const Input = ({label, ...rest}) => {
    return (
        <div className="input-base">
            <p className="label">{label}</p>
            <input className="input" {...rest}></input>
        </div>
    )
}

export default Input
