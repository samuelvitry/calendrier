import React, { useState } from 'react'
import {NextEvents} from './NextEvents'
import {TodoList} from './TodoList'
import { MonthlyCalendar } from './MonthlyCalendar'
import { CalendarSelect } from './CalendarSelect'
import { MiniCalendar } from './MiniCalendar'
import { WeeklyCalendar } from './WeeklyCalendar'

export const Main = (props) => {

    Date.prototype.getWeek = function() {
        var date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                              - 3 + (week1.getDay() + 6) % 7) / 7);
      }

    const eventList = [{'name': 'Tournage BFM', 'start_date': 1619344800, 'end_date': 1619352000, 'blank': false, 'color': '#D75628', 'full': false}, {'name': 'Auto école', 'start_date': 1618920000, 'end_date': 1619186400 , 'blank': false, 'color': '#2D6186', 'full': true}, {'name': 'Tournage BFM', 'start_date': 1619344800, 'end_date': 1619352000, 'blank': false, 'color': '#D75628', 'full': false}, {'name': 'Tournage BFM', 'start_date': 1619344800, 'end_date': 1619352000, 'blank': false, 'color': '#D75628', 'full': true}, {'name': 'Tournage BFM', 'start_date': 1619344800, 'end_date': 1619352000, 'blank': false, 'color': '#D75628', 'full': false}, {'name': 'Tournage BFM', 'start_date': 1616666400, 'end_date': 1616673600, 'blank': false, 'color': '#D75628', 'full': true}]
    var stockageEvent = {}

    function isFromWeek(event){
        if (event['start_date'] > getDateOfISOWeek().getTime() / 1000 && event['start_date'] < lastOfDay(6).getTime() / 1000){
            return true;
        }
        if(event['end_date'] > getDateOfISOWeek().getTime() / 1000 && event['end_date'] < lastOfDay(6).getTime() / 1000){
            return true;
        }
        else {
            return false;
        }
    }

    const [isWeekly, setisWeekly] = useState(true);

    
    var now = new Date()
    const [year, setyear] = useState(now.getFullYear())
    const [week, setweek] = useState(now.getWeek())
    const [month, setmonth] = useState(now.getMonth() + 1)

    var weeklyEventList = eventList.filter(valeur => {
        if( valeur.start_date > getDateOfISOWeek().getTime() / 1000 && valeur.start_date < lastOfDay(6).getTime() / 1000) return true;
        if( valeur.end_date > getDateOfISOWeek().getTime() / 1000 && valeur.end_date < lastOfDay(6).getTime() / 1000) return true;
    })

    function nextWeek(){
        let tempMonth = month - 1
        let temp = new Date(year, tempMonth, getDateOfISOWeek().getDate() + 7)
        setweek(temp.getWeek())
        setmonth(temp.getMonth() + 1)
        setyear(temp.getFullYear())
    }
    function prevWeek(){
        let tempMonth = month - 1
        let temp = new Date(year, tempMonth, getDateOfISOWeek().getDate() - 7)
        setweek(temp.getWeek())
        setmonth(temp.getMonth() + 1)
        setyear(temp.getFullYear())
    }
    function nextMonth(){
        let temp = new Date(year, month , 1)
        setweek(temp.getWeek())
        setmonth(temp.getMonth() + 1)
        setyear(temp.getFullYear())
    }
    function prevMonth(){
        let temp = new Date(year, month - 2, 1)
        setweek(temp.getWeek())
        setmonth(temp.getMonth() + 1)
        setyear(temp.getFullYear())
    }
    

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
    function lastOfDay(nbr){
        let mon =  getDateOfISOWeek()
        return new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + nbr, 23, 59, 59)
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
    return (
        <section className="main-section">
            <div className="left-section">
                <MiniCalendar month={month} year={year} nextMonth={() => nextMonth()} prevMonth={() => prevMonth()}/>
                <CalendarSelect />
                
            </div>
            <div class="right-section">
                {isWeekly ? <WeeklyCalendar nextWeek={() => nextWeek()} prevWeek={() => prevWeek()} year={year} week={week} month={month} eventList={weeklyEventList}/> : <MonthlyCalendar nextMonth={() => nextMonth()} prevMonth={() => prevMonth()} month={month} year={year} eventList={eventList}/>}
            </div>
      </section>
    )
}