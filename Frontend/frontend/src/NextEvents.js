import React, { useState } from 'react'
import { api } from './Main'

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

const EventDetail = (props) => {

    var name = props.event['event_name']
    var date_debut = ''
    var duration = ''
    var repetition = ''

    var durationT = props.event['end_date'] + 1 - props.event['start_date']
    var debut = new Date(props.event['start_date'] * 1000)

    function deleteEvent() {
        api.get('eventDelete' + '?key=' + props.event['key']).then((response) => {if(response.status == 200) {props.closeDetail(); props.reload()}})
    }

    if (durationT >= 86400) {
        var debutMo = monthConv[debut.getMonth() + 1]
        var debutY = debut.getFullYear()
        var debutD = debut.getDate()
        date_debut = debutD + ', ' + debutMo + ', ' + debutY
        duration = Math.floor(durationT/86400) + ' days'
    }
    else {
        var durationH = Math.floor(durationT/3600)
        var durationM = Math.floor((durationT- (3600 * durationH))/60)
        if (durationM < 10){
            durationM = '0' + durationM
        }
        duration = durationH + 'h' + durationM

        var debutMo = monthConv[debut.getMonth() + 1]
        var debutY = debut.getFullYear()
        var debutD = debut.getDate()
        var debutH = debut.getHours()
        var debutM = debut.getMinutes()
        if (debutM < 10){
            debutM = '0' + debutM
        }
        date_debut = debutD + ', ' + debutMo + ', ' + debutY + ' at ' + debutH + 'h' + debutM
    }

    const [isDropdown, setisDropdown] = useState(false)
    //faire une fonction qui gère l'appuie sur le bouton édit et delete

    return (
        <div className='detail-container'>
            <div className='event-detail'>
                <div className='detail-first-line'>
                    <i className="fas fa-times" onClick={(e) => {props.closeDetail(); e.stopPropagation()}}></i>
                    <h2 style={{color: props.event['color']}}>{name}</h2>
                    <i className="fas fa-ellipsis-h" onClick={() => setisDropdown(isDropdown ? false : true)}></i>
                </div>
                {isDropdown ? <div className='detail-dropdown'>
                    <div onClick={() => setisDropdown(false)} className='detail-drop-edit'><i className="fas fa-pen"></i>Edit</div>
                    <div onClick={() => setisDropdown(false)} className='detail-drop-delete' onClick={() => deleteEvent()}><i className="fas fa-trash"></i>Delete</div>
                </div> : null}
                <div className='detail-line'>
                    <i style={{color: props.event['color']}} className="fas fa-clock"></i>
                    <p>{date_debut}</p>
                </div>
                <div className='detail-line'>
                    <i style={{color: props.event['color']}} className="fas fa-hourglass"></i>
                    <p>{duration}</p>
                </div>
                <div className='detail-line'>
                    <i style={{color: props.event['color']}} className="fas fa-calendar"></i>
                    <p>{props.event['calendar']}</p> 
                </div>
                {repetition !== '' ? 
                <div className='detail-line'>
                    <i className="fas fa-redo"></i>
                    <p>{repetition}</p>
                </div> : null}
            </div>
        </div>
    )
}

export const NextEvents = (props) => {

    var filteredList = props.eventList.map((x) => x)
    var now = new Date()

    filteredList.sort(function(a,b) {
        return a['start_date'] - b['start_date']
    })
    filteredList = filteredList.filter(event => event['start_date'] > now.getTime() / 1000)

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

        const [isDetail, setIsDetail] = useState(false)

        function dateToTxt(nbr) {
            let date = new Date(nbr * 1000)
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
            return dateString
        }

        return (
            <>
                {isDetail ? <EventDetail event={props.event} reload={() => props.reload()} closeDetail={() => {setIsDetail(false)}}/> : null}
                <div className="next-event-item" onClick={(e) => setIsDetail(true)}>
                    <div className='next-event-dot' style={{backgroundColor: props.event['color']}}></div>
                    <div className='next-event-text'>
                        <p className='next-event-name'>{props.event['event_name']}</p>
                        <p className='next-event-date'>{dateToTxt(props.event['start_date'])}</p>
                    </div>
                </div>
            </>
            
        )
    }

    //todo ajouter une image pour quand ya pas d'évent (peut être mascote ?)

    return (
        <section className="next-event">
            <h2>Prochains évenements</h2>
            {filteredList.map((x) => (<NextEventItem key={x['key']} reload={() => props.reload()} event={x}/>))}
            {filteredList.length < 1 ? 
            <div className='next-event-error'>
                <p>Il n'y a rien par ici...</p>
            </div> : null}
        </section>
    )
}



