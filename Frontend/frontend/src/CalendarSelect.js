import React from 'react'
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
            <h3>Selection des calendriers</h3>
            <div className="container-select-calendar">
                <CalendarSelectItem selected={true} name="Perso" icon="HomeIcon" />
                <CalendarSelectItem selected={false} name="Travail" />
                <CalendarSelectItem selected={true} name="Famille" />
            </div>
        </section>
    )
}
