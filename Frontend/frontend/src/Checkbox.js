import React, { useState } from 'react'

export const Checkbox = (props) => {

    function handleClick() {
        
    }

    return (
        <label onClick={() => handleClick()} className='check-container'>{props.txt}
            <input type='checkbox'></input>
            <span className='checkmark'></span>
        </label>
    )
}
