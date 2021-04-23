import React from 'react'
import { MonthlyWeeklySwitch } from './MonthlyWeeklySwitch'

export const MonthlyTopbar = (props) => {
    
    function monthString (nbr) {
        var months = ['January', 'February', 'March',
                     'April', 'May', 'June', 'July', 'August',
                     'September', 'October', 'November', 'December'];
        return months[nbr - 1] || '';
    }

    return (
        <div className="monthly-topbar">
            <div className='monthly-nav'>
                <h2>{monthString(props.month)} {props.year}</h2>
                <p className="monthly-prev">&#60;</p>
                <p className="monthly-next">&#62;</p>
            </div>
            <div className='monthly-top-button'>
                <a className="button-full" onClick={() => {props.onClick()}}>
                    <span className='plus-add'>+</span>New
                </a>
            </div>
        </div>
    )
}
