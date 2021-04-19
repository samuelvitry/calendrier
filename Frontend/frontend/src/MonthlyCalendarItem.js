import React from 'react'
import { Typography } from '@material-ui/core'

export const MonthlyCalendarItem = (props) => {
    if (props.name == ''){
        
    }
    return (
        <div className="monthly-item" style={{borderLeft: 'solid', borderColor: props.color , borderWidth: '2px', margin: '2px', boxSizing: 'border-box'}}>
            <Typography variant="body2" style={{marginLeft: '5px'}}>{props.name}</Typography>
            <Typography variant="body2" style={{marginLeft: '5px'}}>{props.date}</Typography>
        </div>
    )
}
