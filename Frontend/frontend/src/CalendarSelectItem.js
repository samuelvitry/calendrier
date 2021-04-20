import React from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'

export const CalendarSelectItem = (props) => {
    return (
        <div className="calendar-select-item">
            <FormControlLabel 
                control={<Checkbox color='secondary' checked={props.selected ? true : false}/>}
                label={props.name}
            />
        </div>
    )
}
