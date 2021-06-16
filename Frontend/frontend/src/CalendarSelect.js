import React from 'react'
import { Checkbox } from './Checkbox'
import { useState } from 'react'
import { Button } from './Button'
import { api } from './Main'

export const CalendarSelect = (props) => {

    const [isAdd, setIsAdd] = useState(false)
    const [txt, setTxt] = useState('')
    const [reload, setReload] = useState(0)
    const [isDelete, setIsDelete] = useState('')

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

    function deleteCalendar() {
        var eventList = props.stockageCalendar[isDelete].map((x) => x)
        eventList.shift()
        eventList.map((x) => {
            api.get('eventDelete' + '?key=' + x['key']).then((response) => props.reload())
        })
        setIsDelete('')
    }

    for (var key in props.stockageCalendar) {
        keyList.push(key)
    }
    
    if(Object.keys(props.stockageCalendar).length > 0){
        return (
            <section className='calendar-select'>
                {isDelete !== '' ? <div className='calendar-delete-container'>
                    <div className='calendar-delete-popup'>
                        <h2>Delete Event</h2>
                        <p>Are you sure to delete {isDelete}? It will destroy every event inside of it! (It has {props.stockageCalendar[isDelete].length - 2} event{props.stockageCalendar[isDelete].length - 2 < 2 ? null : 's'} !)</p>
                        <div className='calendar-delete-btn'>
                            <Button full txt='Cancel' first onClick={() => setIsDelete('')}/>
                            <Button full txt='Delete' last onClick={() => deleteCalendar()}/>
                        </div>
                    </div>
                </div> : null}
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
                                <i className="fas fa-pen" onClick={(e) => {e.stopPropagation(); }}></i>
                                <i className="fas fa-trash" onClick={(e) => {e.stopPropagation(); setIsDelete(x)}}></i>
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
