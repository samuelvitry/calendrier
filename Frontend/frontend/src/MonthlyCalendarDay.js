import React, { useState } from 'react'
import { Typography } from '@material-ui/core'



export const MonthlyCalendarDay = (props, { open }) => {

    var nbrEvents = []

    var height = Math.floor((window.innerHeight - 530) / 100)

    if (window.matchMedia('(max-width: 1270px)').matches) {
        height = Math.floor((window.innerHeight - 530) / 100)
    }
    if (window.matchMedia('(max-width: 600px)').matches) {
        height = Math.floor((window.innerHeight - 330) / 100)
    }
    if (window.matchMedia('(max-width: 400px)').matches) {
        height = Math.floor((window.innerHeight - 230) / 100)
    }

    if (height < 1) {
        height = 1
    }

    for (let i = 0; i < height; i++) {
        nbrEvents.push(i)
    }

    const eventList = props.eventList.map((x) => x)
    function screenDate(date) {
        var heur = date.getHours();
        var minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        if (heur < 10) {
            heur = '0' + heur
        }
        return (heur + "h" + minutes);
    }
    for (let i = 0; i < eventList.length; i++) {
        var event = eventList[i]
        if (event['end_date'] - event['start_date'] < 86400) {
            var date = new Date(event['start_date'] * 1000)
            event['display_date'] = screenDate(date)
        }
    }

    while (eventList.length < nbrEvents.length) {
        const blankEvent = { 'blank': true }
        eventList.push(blankEvent);
    }

    function openPopup(nbr) {
        props.open(nbr)
    }

    const MonthlyCalendarItem = (props) => {


        if (props.blank) {
            return (
                <div className="monthly-item" style={{ visibility: 'hidden' }}>
                    <Typography variant="body2" style={{ marginLeft: '5px' }}>You found me GG !</Typography>
                </div>
            )
        }
        else {
            return (
                <div onClick={() => openPopup(props.nbr)} className="monthly-item" style={{
                    borderLeft: props.full ? 'none' : 'solid',
                    borderColor: props.color,
                    borderWidth: '2px',
                    boxSizing: 'border-box',
                    backgroundColor: props.full ? props.color : null,
                    color: props.full ? '#F7FAFD' : '#1B2228',
                    borderRadius: props.full ? '.5em' : '0px'
                }}>
                    <Typography variant="body2" style={{ marginLeft: '.3em' }}>{props.name}</Typography>
                </div>
            )
        }
    }

    return (
        <div className="monthly-day-card" onDoubleClick={() => props.ajouterIci()}>
            <div className='monthly-number-container'><Typography className='monthly-number' variant="h5" style={{ textAlign: 'right', color: props.numColor }}>{props.day.getDate()}</Typography></div>
            <div className="events-list">
                {nbrEvents.map((x) => <MonthlyCalendarItem nbr={eventList[x]['nbr']} name={eventList[x]['event_name']} blank={eventList[x]['blank']} date={eventList[x]['display_date']} color={eventList[x]['color']} full={eventList[x]['full']} />)}
            </div>
        </div>
    )
}
//<ExpandButton onPress={() => agrandir()}/>
//