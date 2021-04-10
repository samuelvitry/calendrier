import React from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'

export const CalendarSelectItem = (props) => {
    return (
        <div className="calendar-select-item" style={{backgroundColor: props.selected ? '#3581B8' : '#233D58'}}>
            <FormControlLabel 
                control={<Checkbox color='secondary' checked={props.selected ? true : false}/>}
                label={props.name}
            />
        </div>
    )
}
