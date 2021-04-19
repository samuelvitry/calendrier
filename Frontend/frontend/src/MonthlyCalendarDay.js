import React, {useState} from 'react'
import { Typography } from '@material-ui/core'
import {MonthlyCalendarItem} from './MonthlyCalendarItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



export const MonthlyCalendarDay = (props) => {


    const [eventList, seteventList] = useState([
        {"name": "Auto école", "date": "9h30", "color": "white"}, 
        {"name": "Coiffeur", "date": "10h30", "color": "#3581B8"},  
        {"name": "Tournage BFM", "date": "13h30", "color": "#FF6B35"}, 
        {"name": "Coiffeur lol", "date": "14h30", "color": "#3581B8"},  
        {"name": "Mise à l'eau", "date": "15h30", "color": "white"}
    ]);
    const [shorteventList, setshorteventList] = useState([
        {"name": "Auto école", "date": "9h30", "color": "white"}, 
        {"name": "Coiffeur", "date": "10h30", "color": "#3581B8"},  
        {"name": "Tournage BFM", "date": "13h30", "color": "#FF6B35"}
    ]);
    const [isExpanded, setisExpanded] = useState(props.expand)

    //regler les variables non utilisés a supprimer
    seteventList(eventList);
    setshorteventList(shorteventList);
    setisExpanded(isExpanded);

    if (isExpanded){
        console.log('true');
    }
    else {
        console.log('false');
    }
    

    //passer cette variable en props (ou pas dependament de qui fait les requetes)

    const ExpandButton = ({ onPress }) => {

        if (Object.keys(eventList).length > 4) {
            
            return (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <a href='/#' className="button-empty" onClick={() => onPress()}>
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
            <div>
                {eventList.map(eventList => (
                    <MonthlyCalendarItem name={eventList.name} date={eventList.date} color={eventList.color} key={eventList.name}/>
                ))}
            </div>
            <div className='expand-icon-down'>
                <ExpandButton onPress={() => agrandir()}/>
            </div>
        </div>
    ) : (
        <div className="monthly-day-card" style={{backgroundColor: props.disabled ? '#121E2B' : '#233D58', color: props.disabled ? '#8EABBE' : '#E0EDF5'}}>
            <Typography variant="h5" style={{textAlign: 'right', color: props.numColor}}>{props.day.getDate()}</Typography>
            <div>
                {shorteventList.map(shorteventList => (
                    <MonthlyCalendarItem name={shorteventList.name} date={shorteventList.date} color={shorteventList.color} key={shorteventList.name}/>
                ))}
            </div>
            <div className='expand-icon-up'>
                <ExpandButton onPress={() => agrandir()}/>
            </div>
        </div>
    )
}
