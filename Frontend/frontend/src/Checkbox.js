import React from 'react'

export const Checkbox = (props) => {

    return (
        <label className='check-container'>{props.txt}
            <input type='checkbox'></input>
            <span className='checkmark'></span>
        </label>
    )
}
