import React from 'react'
import { Button, Tooltip, Typography } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'
import {MonthlyCalendarDay} from './MonthlyCalendarDay'

const MonthlyLine = (props) => {

    //calculer les jours selon la props de num de semaine

    return(
        <div className="monthly-line">
            <MonthlyCalendarDay day="10" backColor="#345883"/>
            <MonthlyCalendarDay day="11" backColor="#345883"/>
            <MonthlyCalendarDay day="12" backColor="#345883"/>
            <MonthlyCalendarDay day="13" backColor="#345883"/>
            <MonthlyCalendarDay day="14" backColor="#345883"/>
            <MonthlyCalendarDay day="15" backColor="#345883"/>
            <MonthlyCalendarDay day="16" backColor="#345883" numColor="#FF6B35"/>
        </div>
    )
}

export const MonthlyCalendar = (props) => {
    return (
        <div className="monthly-calendar">
            <div className="monthly-topbar">
                <Tooltip title="Previous month">
                    <Button><NavigateBefore style={{color: '#E0EDF5'}}/></Button>
                </Tooltip>
                <Typography variant='h4'>{props.month}</Typography>
                <Tooltip title="Next month">
                    <Button><NavigateNext style={{color: '#E0EDF5'}}/></Button>
                </Tooltip>
            </div>
            <br />
            <div className="monthly-actual">
                <div className="monthly-line">
                    <MonthlyCalendarDay day="10" backColor="#294566"/>
                    <MonthlyCalendarDay day="11" backColor="#294566"/>
                    <MonthlyCalendarDay day="12" backColor="#294566"/>
                    <MonthlyCalendarDay day="13" backColor="#345883"/>
                    <MonthlyCalendarDay day="14" backColor="#345883"/>
                    <MonthlyCalendarDay day="15" backColor="#345883"/>
                    <MonthlyCalendarDay day="16" backColor="#345883" numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay day="10" backColor="#345883"/>
                    <MonthlyCalendarDay day="11" backColor="#345883"/>
                    <MonthlyCalendarDay day="12" backColor="#345883"/>
                    <MonthlyCalendarDay day="13" backColor="#345883"/>
                    <MonthlyCalendarDay day="14" backColor="#345883"/>
                    <MonthlyCalendarDay day="15" backColor="#345883"/>
                    <MonthlyCalendarDay day="16" backColor="#345883" numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay day="10" backColor="#345883"/>
                    <MonthlyCalendarDay day="11" backColor="#345883"/>
                    <MonthlyCalendarDay day="12" backColor="#345883"/>
                    <MonthlyCalendarDay day="13" backColor="#345883"/>
                    <MonthlyCalendarDay day="14" backColor="#345883"/>
                    <MonthlyCalendarDay day="15" backColor="#345883"/>
                    <MonthlyCalendarDay day="16" backColor="#345883" numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay day="10" backColor="#345883"/>
                    <MonthlyCalendarDay day="11" backColor="#345883"/>
                    <MonthlyCalendarDay day="12" backColor="#345883"/>
                    <MonthlyCalendarDay day="13" backColor="#345883"/>
                    <MonthlyCalendarDay day="14" backColor="#345883"/>
                    <MonthlyCalendarDay day="15" backColor="#345883"/>
                    <MonthlyCalendarDay day="16" backColor="#345883" numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay day="10" backColor="#345883"/>
                    <MonthlyCalendarDay day="11" backColor="#345883"/>
                    <MonthlyCalendarDay day="12" backColor="#345883"/>
                    <MonthlyCalendarDay day="13" backColor="#345883"/>
                    <MonthlyCalendarDay day="14" backColor="#345883"/>
                    <MonthlyCalendarDay day="15" backColor="#294566"/>
                    <MonthlyCalendarDay day="16" backColor="#294566" numColor="#FF6B35"/>
                </div>
            </div>
        </div>
    )
}
