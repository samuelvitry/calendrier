import React from 'react'

export const Today = () => {

    const hoursList = [
        "00h00",
        "01h00",
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
    ]


    return (
        <div className='today'>
            <h2>Today</h2>
            <div className='today-actual'>
                
            </div>
        </div>
    )
}
