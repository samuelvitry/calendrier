import React from 'react'
import { Typography } from '@material-ui/core'
import { CalendarSelectItem } from './CalendarSelectItem'

export const CalendarSelectContainer = () => {
    return (
        <div className="container-select-calendar">
            <CalendarSelectItem selected={true} name="Perso" />
            <CalendarSelectItem selected={false} name="Travail" />
            <CalendarSelectItem selected={true} name="Famille" />
        </div>
    )
}


export const CalendarSelect = () => {
    return (
        <section className="calendar-select">
            <Typography variant="h4">Selection des calendriers</Typography>
            <div className="container-select-calendar">
                <CalendarSelectItem selected={true} name="Perso" />
                <CalendarSelectItem selected={false} name="Travail" />
                <CalendarSelectItem selected={true} name="Famille" />
            </div>
        </section>
    )
}
