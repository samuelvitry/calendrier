import React from 'react'
import { CalendarSelectItem } from './CalendarSelectItem'
import { Checkbox } from './Checkbox'

export const CalendarSelectContainer = () => {
    return (
        <div className="container-select-calendar">
            <Checkbox checked={true} txt="Perso" />
            <Checkbox checked={true} txt="Travail" />
            <Checkbox checked={true} txt="Famille" />
        </div>
    )
}


export const CalendarSelect = () => {
    return (
        <section className="calendar-select">
            <h2>Selection des calendriers</h2>
            <div className="container-select-calendar">
                <Checkbox checked={true} txt="Perso" />
                <Checkbox checked={true} txt="Travail" />
                <Checkbox checked={true} txt="Famille" />
            </div>
        </section>
    )
}
