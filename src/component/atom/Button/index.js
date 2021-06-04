import React from 'react'
import "./button.css"
const Button = ({title, ...rest}) => {
    return (
        <div>
            <button className="button" {...rest}><b>{title}</b></button>
        </div>
    )
}

export default Button
