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


export const EventDetail = (props) => {

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
        <div className='detail-container' onClick={(e) => {props.closeDetail(); e.stopPropagation()}}>
            <div className='event-detail' onClick={(e) => e.stopPropagation()}>
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