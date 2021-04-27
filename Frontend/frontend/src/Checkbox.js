import React, { useState } from 'react'

export const Checkbox = (props) => {

    const [isChecked, setisChecked] = useState(false)

    function handleClick() {
        setisChecked(isChecked ? false : true)
    }

    return (
        <label onMouseDown={() => handleClick()} className='check-container'>{props.txt}
            <input type='checkbox' checked={isChecked}></input>
            <span className='checkmark' style={{borderColor: props.color, backgroundColor: isChecked ? props.color : '#EEF2F6'}}></span>
        </label>
    )
}
