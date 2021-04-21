import React from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'

export const CalendarSelectItem = (props) => {
    return (
        <div className="calendar-select-item">
            <FormControlLabel 
                control={<Checkbox color='secondary'/>}
                label={props.name}
            />
        </div>
    )
}
