import React from 'react'
import { CalendarSelectItem } from './CalendarSelectItem'

export const CalendarSelectContainer = () => {
    return (
        <div className="container-select-calendar">
            <CalendarSelectItem name="Perso" />
            <CalendarSelectItem name="Travail" />
            <CalendarSelectItem name="Famille" />
        </div>
    )
}


export const CalendarSelect = () => {
    return (
        <section className="calendar-select">
            <h2>Selection des calendriers</h2>
            <div className="container-select-calendar">
                <CalendarSelectItem name="Perso" icon="HomeIcon" />
                <CalendarSelectItem name="Travail" />
                <CalendarSelectItem name="Famille" />
            </div>
        </section>
    )
}
