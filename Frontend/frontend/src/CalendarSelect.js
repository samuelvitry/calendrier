import React from 'react'
import { CalendarSelectItem } from './CalendarSelectItem'
import { Checkbox } from './Checkbox'

export const CalendarSelectContainer = () => {
    return (
        <div className="container-select-calendar">
            <Checkbox txt="Perso" />
            <Checkbox txt="Travail" />
            <Checkbox txt="Famille" />
        </div>
    )
}


export const CalendarSelect = () => {
    return (
        <section className="calendar-select">
            <h2>Selection des calendriers</h2>
            <div className="container-select-calendar">
                <Checkbox txt="Perso" />
                <Checkbox txt="Travail" />
                <Checkbox txt="Famille" />
            </div>
        </section>
    )
}
