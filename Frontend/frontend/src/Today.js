import React from 'react'

export const Today = (props) => {

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
        return (
            <div className='event-point'>
                <div className='event-dot' />
                <div className='today-link-line' />
                <div className='event-point-info'>
                    <h2>Event Test</h2>
                    <p>12h00</p>
                </div>
            </div>
        )
    }
    

    return (
        <div className='today'>
            <h2>Today</h2>
            <div className='today-actual'>
                <div className='today-line' />
                {deuxhoursList.map((x) => <HourPoint hour={x} />)}
                <EventPoint />
            </div>
        </div>
    )
}
