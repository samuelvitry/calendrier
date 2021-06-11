import React from 'react'
import { Checkbox } from './Checkbox'

export const CalendarSelect = (props) => {
    
    if(Object.keys(props.stockageCalendar).length > 0){
        return (
            <section className="calendar-select">
                <h2>Selection des calendriers</h2>
                <div className="container-select-calendar">
                    {props.calendarList.map((x) => (<Checkbox checked={props.stockageCalendar[x][0]} txt={x} changement={() => props.calendarSelecSwitch(x)} />))}
                </div>
            </section>
        )
    }
    else {
        return (
            <section className="calendar-select">
                <h2>Selection des calendriers</h2>
                <div className="container-select-calendar">
                    <Checkbox checked={true} txt='Default Calendar' changement={() => {}}/>
                </div>
            </section>
        )
    }

    return (
        <section className="calendar-select">
            <h2>Selection des calendriers</h2>
            <div className="container-select-calendar">
                {props.calendarList.map((x) => (<Checkbox checked={props.stockageCalendar[x][0]} txt={x} changement={() => props.calendarSelecSwitch(x)} />))}
            </div>
        </section>
    )
}
