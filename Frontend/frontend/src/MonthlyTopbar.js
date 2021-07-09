import React from 'react'

export const MonthlyTopbar = (props) => {

    function monthString(nbr) {
        var months = ['January', 'February', 'March',
            'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'];
        return months[nbr - 1] || '';
    }

    return (
        <div className="monthly-topbar">
            <div className='monthly-nav'>
                <h2>{monthString(props.month)} {props.year}</h2>
                <p className="monthly-prev" onClick={() => props.prevMonth()}>&#60;</p>
                <p className="monthly-next" onClick={() => props.nextMonth()}>&#62;</p>
            </div>
            {window.matchMedia('(max-width: 450px)').matches ? null : <div className='monthly-weekly-switch'>
                <a className='monthly-weekly-switch1 switch-full'>
                    Monthly
                </a>
                <a className='monthly-weekly-switch2 switch-empty' onClick={() => props.switch()}>
                    Weekly
                </a>
            </div>}
            <div className='monthly-top-button'>
                <a className="button-full" onClick={() => { props.add() }}>
                    <span className='plus-add'>+</span>{window.matchMedia('(max-width: 450px)').matches ? null : 'New'}
                </a>
            </div>
        </div>
    )
}
