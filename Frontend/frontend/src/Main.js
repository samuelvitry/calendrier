import React, { useState } from 'react'
import {NextEvents} from './NextEvents'
import {TodoList} from './TodoList'
import { MonthlyCalendar } from './MonthlyCalendar'
import { CalendarSelect } from './CalendarSelect'
import { MiniCalendar } from './MiniCalendar'
import { WeeklyCalendar } from './WeeklyCalendar'

export const Main = (props) => {

    const eventList = [{'name': 'Tournage BFM', 'start_date': 1619344800, 'end_date': 1619352000, 'blank': false, 'color': '#D75628', 'full': false}, {'name': 'Auto école', 'start_date': 1618920000, 'end_date': 1619186400 , 'blank': false, 'color': '#2D6186', 'full': true}, {'name': 'Tournage BFM', 'start_date': 1619344800, 'end_date': 1619352000, 'blank': false, 'color': '#D75628', 'full': false}, {'name': 'Tournage BFM', 'start_date': 1619344800, 'end_date': 1619352000, 'blank': false, 'color': '#D75628', 'full': true}, {'name': 'Tournage BFM', 'start_date': 1619344800, 'end_date': 1619352000, 'blank': false, 'color': '#D75628', 'full': false}, {'name': 'Tournage BFM', 'start_date': 1616666400, 'end_date': 1616673600, 'blank': false, 'color': '#D75628', 'full': true}]
    var stockageEvent = {}

    const [isWeekly, setisWeekly] = useState(true);

    

    const [year, setyear] = useState(2021)
    const [week, setweek] = useState(16)
    let tempMonth = rowToJour().getMonth() + 1
    const [month, setmonth] = useState(tempMonth)
    
    function rowToJour() {
        var d = (1 + (week - 1) * 7) + 3;
        return new Date(year, 0, d);
    }

    //attribution des event au jours
    for (let i = 0; i < eventList.length; i++) {
        var event = eventList[i]
        event["key"] = i
        var date_debut = new Date(event['start_date'] * 1000)
        var date_fin = new Date(event['end_date'] * 1000)
        var isLong = date_fin.getTime() - date_debut.getTime()
        isLong = isLong / 86400000
        isLong = Math.floor(isLong);
        if (date_debut >= getJour(1) && date_fin <= getJour(35)){
            if (isLong >= 1){
                if (getMoinsJour(date_debut) in stockageEvent){
                    stockageEvent[getMoinsJour(date_debut)] = []
                }
                for (let i = 0; i < isLong; i++) {
                    stockageEvent[getMoinsJour(date_debut) + i] = [event]
                }
            }
            else {
                if (getMoinsJour(date_debut) in stockageEvent) {
                    stockageEvent[getMoinsJour(date_debut)].push(event);
                }
                else {
                    stockageEvent[getMoinsJour(date_debut)] = [event]
                }
            }
        }
        else{
            
        }
    }
    for (let i = 0; i < 36; i++) {
        if (i in stockageEvent){
            
        }
        else {
            stockageEvent[i] = []
        }
    }
    function getMoinsJour (date) {
        var day = new Date(year, month, 0).getDay();
        if (day === 0) {
            day = 7
        }
        day = day - 2
        return date.getDate() + day
    }
    function getJour (nbr) {
        var offsetbeggin = new Date(year, month - 1, 0).getDay();
        var day = new Date(year, month-1, nbr - offsetbeggin)
        return (day);
    }

    

    return (
        <section className="main-section">
            <div className="left-section">
                <MiniCalendar month={month} year={year}/>
                <CalendarSelect />
                <TodoList />
                
            </div>
            <div class="right-section">
                {isWeekly ? <WeeklyCalendar year={year} week={week} month={month} stockageEvent={stockageEvent}/> : <MonthlyCalendar month={4} year={2021} stockageEvent={stockageEvent}/>}
            </div>
      </section>
    )
}