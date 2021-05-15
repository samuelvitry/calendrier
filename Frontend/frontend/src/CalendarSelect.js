import React from 'react'
import { Checkbox } from './Checkbox'

export const CalendarSelect = (props) => {

    return (
        <section className="calendar-select">
            <h2>Selection des calendriers</h2>
            <div className="container-select-calendar">
                {props.calendarList.map((x) => (<Checkbox checked={props.stockageCalendar[x][0]} txt={x} changement={() => props.calendarSelecSwitch(x)} />))}
            </div>
        </section>
    )
}
