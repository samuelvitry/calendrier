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

    const [isWeekly, setisWeekly] = useState(false);

    

    const [year, setyear] = useState(2021)
    const [week, setweek] = useState(16)
    let tempMonth = getDateOfISOWeek().getMonth() + 1
    const [month, setmonth] = useState(tempMonth)
    

    function rowToJour(nbr) {
        let mon =  getDateOfISOWeek()
        return new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + nbr)
    }
    function getDateOfISOWeek() {
        var simple = new Date(year, 0, 1 + (week - 1) * 7);
        var dow = simple.getDay();
        var ISOweekStart = simple;
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        return ISOweekStart;
    }
    

    //attribution des event au jours pour le monthly
    for (let i = 0; i < eventList.length; i++) {
        var event = eventList[i]
        event["key"] = i
        var date_debut = new Date(event['start_date'] * 1000)
        var date_fin = new Date(event['end_date'] * 1000)
        var isLong = date_fin.getTime() - date_debut.getTime()
        isLong = isLong / 86400000
        isLong = Math.floor(isLong);
        var day = new Date(date_debut.getFullYear(), date_debut.getMonth(), date_debut.getDate())    
        if (date_debut >= getJour(1) && date_fin <= getJour(35)){
            if (isLong >= 1){
                if (getMoinsJour(date_debut) in stockageEvent){
                    stockageEvent[getMoinsJour(day)] = []
                }
                for (let i = 0; i < isLong; i++) {
                    var day2 = new Date(day.getFullYear(), day.getMonth(), day.getDate() + i)
                    stockageEvent[getMoinsJour(day2)] = [event]
                }
            }
            else {
                if (getMoinsJour(date_debut) in stockageEvent) {
                    stockageEvent[getMoinsJour(day)].push(event);
                }
                else {
                    stockageEvent[getMoinsJour(day)] = [event]
                }
            }
        }
        else{
            
        }
    }
    function getMoinsJour (date) {
        var day = new Date(year, month, 0).getDay();
        if (day === 0) {
            day = 7
        }
        return date.getDate() + day
    }
    function getJour (nbr) {
        var offsetbeggin = new Date(year, month - 1, 0).getDay();
        var day = new Date(year, month-1, nbr - offsetbeggin)
        return (day);
    }
    console.log(stockageEvent)
    return (
        <section className="main-section">
            <div className="left-section">
                <MiniCalendar month={month} year={year}/>
                <CalendarSelect />
                <TodoList />
                
            </div>
            <div class="right-section">
                {isWeekly ? <WeeklyCalendar year={year} week={week} month={month} eventList={eventList}/> : <MonthlyCalendar month={month} year={year} stockageEvent={stockageEvent}/>}
            </div>
      </section>
    )
}