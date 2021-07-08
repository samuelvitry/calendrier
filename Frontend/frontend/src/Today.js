import React, { useState } from 'react'
import { EventDetail } from './EventDetail'

export const Today = (props) => {

    const [isDetail, setIsDetail] = useState(-1)

    const hoursList = [
        "00h00",
        "01h00",
        "02h00",
        "03h00",
        "04h00",
        "05h00",
        "06h00",
        "07h00",
        "08h00",
        "09h00",
        "10h00",
        "11h00",
        "12h00",
        "13h00",
        "14h00",
        "15h00",
        "16h00",
        "17h00",
        "18h00",
        "19h00",
        "20h00",
        "21h00",
        "22h00",
        "23h00",
        "24h00"
    ]
    const deuxhoursList = [
        "00h00",
        "02h00",
        "04h00",
        "06h00",
        "08h00",
        "10h00",
        "12h00",
        "14h00",
        "16h00",
        "18h00",
        "20h00",
        "22h00",
        "24h00"
    ]

    const HourPoint = (props) => {
        return (
            <div className='hour-point'>
                <p>{props.hour}</p>
                <div className='hour-dot' />
            </div>
        )
    }

    const EventPoint = (props) => {

        let today = new Date()
        let ceMatin = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() / 1000

        let offsetY = (props.event['start_date'] - ceMatin) / 3600 * 3

        return (
            <div className='event-point' onClick={() => setIsDetail(props.index)}>
                <div className='event-dot' style={{ top: offsetY + 'vh', borderColor: props.event['color'] }} />
                <div className='today-link-line' style={{ top: offsetY + 'vh', borderColor: props.event['color'] }} />
                <div className='event-point-info' style={{ top: offsetY + 'vh', backgroundColor: props.event['color'] }}>
                    <h2>{props.event['event_name']}</h2>
                </div>
            </div>
        )
    }

    function filterEvent(event) {
        let today = new Date()
        let ceMatin = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() / 1000
        let ceSoir = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).getTime() / 1000
        if (event['end_date'] - event['start_date'] >= 86399) {
            return false
        }
        if (event['start_date'] >= ceMatin && event['start_date'] <= ceSoir) {
            return true
        }
        else {
            return false
        }
    }

    var todayEvents = props.eventList.filter((x) => filterEvent(x))

    //todo inserer la date

    return (
        <div className='today'>
            {isDetail !== -1 ? <EventDetail event={todayEvents[isDetail]} reload={() => props.reload()} closeDetail={() => { setIsDetail(-1) }} /> : null}
            <h2>Today, insérer la date</h2>
            <div className='today-actual'>
                <div className='today-line' />
                {deuxhoursList.map((x) => <HourPoint hour={x} />)}
                {todayEvents.map((x, index) => <EventPoint index={index} event={x} />)}
            </div>
        </div>
    )
}
