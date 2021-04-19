import React, {useState} from 'react'
import { Typography } from '@material-ui/core'
import {MonthlyCalendarItem} from './MonthlyCalendarItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



export const MonthlyCalendarDay = (props) => {

    const eventList = props.eventList
    var shorteventList = []
    if (eventList.length > 3){
        for (let i = 0; i < 3; i++) {
            shorteventList.push(eventList[i])
        }   
    }
    else{
        shorteventList = eventList
    }
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

    console.log(eventList);

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
    }

    return isExpanded ?  (
        <div className="monthly-day-card" style={{backgroundColor: props.disabled ? '#121E2B' : '#233D58', color: props.disabled ? '#8EABBE' : '#E0EDF5'}}>
            <Typography variant="h5" style={{textAlign: 'right', color: props.numColor}}>{props.day.getDate()}</Typography>
            <div className="events-list">
                {eventList.map(eventList => (
                    <MonthlyCalendarItem name={eventList.name} date={eventList.display_date} color={eventList.color} key={eventList.name}/>
                ))}
            </div>
            <div className='expand-icon-down'>
                <ExpandButton onPress={() => agrandir()}/>
            </div>
        </div>
    ) : (
        <div className="monthly-day-card" style={{backgroundColor: props.disabled ? '#121E2B' : '#233D58', color: props.disabled ? '#8EABBE' : '#E0EDF5'}}>
            <Typography variant="h5" style={{textAlign: 'right', color: props.numColor}}>{props.day.getDate()}</Typography>
            <div className="events-list">
                {shorteventList.map(shorteventList => (
                    <MonthlyCalendarItem name={shorteventList.name} date={shorteventList.display_date} color={shorteventList.color} key={shorteventList.name}/>
                ))}
            </div>
            <div className='expand-icon-up'>
                <ExpandButton onPress={() => agrandir()}/>
            </div>
        </div>
    )
}
