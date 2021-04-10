import React from 'react'
import { Typography } from '@material-ui/core'
import {MonthlyCalendarItem} from './MonthlyCalendarItem'

export const MonthlyCalendarDay = (props) => {
    return (
        <div className="monthly-day-card" style={{backgroundColor: props.backColor}}>
            <Typography variant="h5" style={{textAlign: 'right', color: props.numColor}}>{props.day}</Typography>
            <MonthlyCalendarItem name='Auto école' date='9h30' color='white' />
            <MonthlyCalendarItem name='Coiffeur' date='10h30' color='#3581B8'/>
            <MonthlyCalendarItem name='Tournage BFM' date='13h30' color='#FF6B35' />
        </div>
    )
}
