import React from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'

export const CalendarSelectItem = (props) => {
    return (
        <div className="calendar-select-item">
            <Checkbox color='secondary'/>
            <p>{props.name}</p>
        </div>
    )
}
