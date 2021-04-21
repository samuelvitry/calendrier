import React, {useState} from 'react'
import { Typography } from '@material-ui/core'
import {MonthlyCalendarItem} from './MonthlyCalendarItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



export const MonthlyCalendarDay = (props) => {

    const eventList = props.eventList
    function screenDate(date){
        var heur = date.getHours();
        var minutes = date.getMinutes();
        if (minutes < 10){
            minutes = '0' + minutes
        }
        if (heur < 10){
            heur = '0' + heur
        }
        return (heur + "h" + minutes);
    }
    for (let i = 0; i < eventList.length; i++){
        var event = eventList[i]
        if(event['end_date'] - event['start_date'] < 86400){
            var date =  new Date(event['start_date'] * 1000)
            event['display_date'] = screenDate(date)
        }
    }
    const [isExpanded, setisExpanded] = useState(props.expand)


    //passer cette variable en props (ou pas dependament de qui fait les requetes)

    const ExpandButton = ({ onPress }) => {

        if (Object.keys(eventList).length > 4) {
            
            return (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <a className="button-empty" onClick={() => onPress()}>
                        <ExpandMoreIcon style={{color: props.disabled ? '#8EABBE' : '#E0EDF5'}}/>
                    </a> 
                </div>
            ) 
        }
        else {
            return null;
        }
    }

    
    function agrandir () {
        props.etendre();
        //remplacer par passage en vue week
    }

    while (eventList.length < 4){
        const blankEvent = {'blank': true}
        eventList.push(blankEvent);
    }


    return (
        <div className="monthly-day-card">
            <Typography variant="h5" style={{textAlign: 'right', color: props.numColor}}>{props.day.getDate()}</Typography>
            <div className="events-list">
                <MonthlyCalendarItem name={eventList[0]['name']} blank={eventList[0]['blank']} date={eventList[0]['display_date']} color={eventList[0]['color']}/>
                <MonthlyCalendarItem name={eventList[1]['name']} blank={eventList[1]['blank']} date={eventList[1]['display_date']} color={eventList[1]['color']}/>
                <MonthlyCalendarItem name={eventList[2]['name']} blank={eventList[2]['blank']} date={eventList[2]['display_date']} color={eventList[2]['color']}/>
                <MonthlyCalendarItem name={eventList[3]['name']} blank={eventList[3]['blank']} date={eventList[3]['display_date']} color={eventList[3]['color']}/>
            </div>
            <div className='expand-icon-down'>
                
            </div>
        </div>
    )
}
//<ExpandButton onPress={() => agrandir()}/>
//