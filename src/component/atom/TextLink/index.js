import React from 'react'
import './link.css'
const TextLink = ({text,onClick}) => {
    return (
        <p className="link" onClick={onClick}>{text}</p>
    )
}

export default TextLink
