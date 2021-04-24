import React from 'react'
import { Checkbox } from './Checkbox'

export const CalendarSelectItem = (props) => {
    return (
        <div className="calendar-select-item">
            <Checkbox txt={props.name} />
        </div>
    )
}
