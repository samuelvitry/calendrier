import React from 'react'

export const NextEvents = (props) => {

    var filteredList = props.eventList.map((x) => x)

    //filter events

    const dayConv = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]
    const monthConv = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    }

    const NextEventItem = (props) => {

        function dateToTxt(nbr) {
            let date = new Date(nbr * 1000)
            let now = new Date()
            let dateString = ''
            let durationT = props.event['end_date'] + 1 - props.event['start_date']
            if (date.getDate() == now.getDate() && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear()) {
                dateString = dateString.concat('Today')
            }
            else if (date.getDate() == now.getDate() + 1 && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear()) {
                dateString = dateString.concat('Tomorrow')
            }
            else if (date.getDate() == now.getDate() - 1 && date.getMonth() == now.getMonth() && date.getFullYear() == now.getFullYear()) {
                dateString = dateString.concat('Yesterday')
            }
            else {
                dateString = dateString.concat(monthConv[date.getMonth() + 1])
                dateString = dateString.concat(', ')
                dateString = dateString.concat(date.getDay())
                dateString = dateString.concat(' ')
                dateString = dateString.concat(date.getFullYear())
            }
            if (durationT >= 86400) {
                
            }
            else {
                dateString = dateString.concat(' at ')
                dateString = dateString.concat(date.getHours())
                if (date.getHours() < 10) {
                    dateString = dateString.concat('0')
                }
                dateString = dateString.concat('h')
                dateString = dateString.concat(date.getMinutes())
                if (date.getMinutes() < 10) {
                    dateString = dateString.concat('0')
                }
            }
            console.log(dateString)
            return dateString
        }

        return (
            <div className="next-event-item">
                <div className='next-event-dot'>
                </div>
                <div className='next-event-text'>
                    <p className='next-event-name'>{props.event['event_name']}</p>
                    <p className='next-event-date'>{dateToTxt(props.event['start_date'])}</p>
                </div>
            </div>
        )
    }

    return (
        <section className="next-event">
            {filteredList.map((x) => (<NextEventItem event={x}/>))}
        </section>
    )
}



