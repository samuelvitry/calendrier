import React from 'react'
import { Typography } from '@material-ui/core'

export const MonthlyCalendarItem = (props) => {

    if (props.blank){
        return (
            <div className="monthly-item" style={{visibility: 'hidden', margin: '2px'}}>
                <Typography variant="body2" style={{marginLeft: '5px'}}>You found me GG !</Typography>
            </div>
        )
    }
    else {
        return (
            <div className="monthly-item" style={{borderLeft: 'solid', borderColor: props.color , borderWidth: '2px', margin: '2px', boxSizing: 'border-box'}}>
                <Typography variant="body2" style={{marginLeft: '5px'}}>{props.name}</Typography>
            </div>
        )
    }
}
