import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

export const MonthlyCalendarItem = (props, { ouvrir }) => {

    
    if (props.blank){
        return (
            <div className="monthly-item" style={{visibility: 'hidden'}}>
                <Typography variant="body2" style={{marginLeft: '5px'}}>You found me GG !</Typography>
            </div>
        )
    }
    else {
        return (
            <div onClick={() => props.ouvrir(props.nbr)} className="monthly-item" style={{
                    borderLeft: props.full ? 'none' : 'solid', 
                    borderColor: props.color , 
                    borderWidth: '2px', 
                    boxSizing: 'border-box', 
                    backgroundColor: props.full ? props.color : null, 
                    color: props.full ? '#F7FAFD' : '#1B2228', 
                    borderRadius: props.full ? '5px' : '0px'
                }}>
                <Typography variant="body2" style={{marginLeft: '5px'}}>{props.name}</Typography>
            </div>
        )
    }
}