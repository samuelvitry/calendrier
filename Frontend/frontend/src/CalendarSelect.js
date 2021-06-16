import React from 'react'
import { Checkbox } from './Checkbox'
import { useState } from 'react'
import { Button } from './Button'
import { api } from './Main'

export const CalendarSelect = (props) => {

    const [isAdd, setIsAdd] = useState(false)
    const [txt, setTxt] = useState('')
    const [reload, setReload] = useState(0)

    var keyList = []

    function addCalendar() {
        let data = {
            "event_name": txt,
            "start_date": 0,
            "end_date": 1,
            "color": 0,
            "full": true,
            "calendar": txt,
        }
        api.post("/create", data).then(res => {props.ajouterEvent()})
        setIsAdd(false)
        setTxt('')
    }

    for (var key in props.stockageCalendar) {
        keyList.push(key)
    }
    
    if(Object.keys(props.stockageCalendar).length > 0){
        return (
            <section className="calendar-select">
                <div className='calendar-select-top'>
                    <h2>Selection des calendriers</h2>
                    <h2 onClick={() => (setIsAdd(!isAdd))} id='calendar-add'>+</h2>
                </div>
                <div className="container-select-calendar">
                {isAdd ? <div className='calendar-add-div'><input onChange={(e) => setTxt(e.target.value)} className='input-contained' placeholder={'Calendar name'}/><Button onClick={() => (addCalendar())} full txt={'Add'}/></div> : null}
                    {keyList.map((x) => (
                        <div className='calendar-select-item' onClick={() => {props.calendarSelecSwitch(x)}}>
                            <Checkbox checked={props.stockageCalendar[x][0]} txt={x} changement={() => props.calendarSelecSwitch(x)} />
                            <div className='calendar-select-option'>
                                <i className="fas fa-pen"></i>
                                <i className="fas fa-trash"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )
    }
    else {
        return (
            <section className="calendar-select">
                <div className='calendar-select-top'>
                    <h2>Selection des calendriers</h2>
                    <h2 onClick={() => (setIsAdd(!isAdd))} id='calendar-add'>+</h2>
                </div>
                <div className="container-select-calendar">
                    {isAdd ? <div className='calendar-add-div'><input onChange={(e) => setTxt(e.target.value)} className='input-contained' placeholder={'Calendar name'}/><Button onClick={() => (addCalendar())} full txt={'Add'}/></div> : null}
                    <Checkbox checked={true} txt='Default Calendar' changement={() => {}}/>
                </div>
            </section>
        )
    }
}
