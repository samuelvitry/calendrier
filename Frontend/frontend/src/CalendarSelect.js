import React from 'react'
import { Checkbox } from './Checkbox'
import { useState } from 'react'
import { Button } from './Button'

export const CalendarSelect = (props) => {

    const [isAdd, setIsAdd] = useState(false)
    
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
                <div className='calendar-select-top'>
                    <h2>Selection des calendriers</h2>
                    <h2 onClick={() => (setIsAdd(true))} id='calendar-add'>+</h2>
                </div>
                <div className="container-select-calendar">
                    {isAdd ? <div className='calendar-add-div'><input className='contained-input' placeholder={'Calendar name'}/><Button full txt={'Add'}/></div> : null}
                    <Checkbox checked={true} txt='Default Calendar' changement={() => {}}/>
                </div>
            </section>
        )
    }
}
