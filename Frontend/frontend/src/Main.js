import React, { useState, useEffect } from 'react'
import {NextEvents} from './NextEvents'
import {TodoList} from './TodoList'
import { MonthlyCalendar } from './MonthlyCalendar'
import { CalendarSelect } from './CalendarSelect'
import { MiniCalendar } from './MiniCalendar'
import { WeeklyCalendar } from './WeeklyCalendar'
import axios from 'axios'

axios.defaults.withCredentials = true;

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

export const Main = (props) => {

    const colorCodeConv = ['#3581B8', '#5BA94C', '#E4C111', '#FF6B35', '#A72A2A']

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

    useEffect(() => {
        api.get("/").then((response) => traiterEvent(response.data.event))
    }, [])

    const [eventList, seteventList] = useState([])
    const [stockageCalendar, setStockageCalendar] = useState({})
    const [reload, setReload] = useState(0)

    function forceReload () {
        setReload(reload + 1)
    }

    function traiterEvent (tempList) {
        let tempEvents = []
        let tempSto = {}
        for (let i = 0; i < tempList.length; i ++){
            let code = parseInt(tempList[i]['color'])
            tempEvents.push(tempList[i])
            tempEvents[i]['color'] = colorCodeConv[code]
            var objCalName = tempEvents[i]['calendar']
            if (tempSto[objCalName]) {
                tempSto[objCalName].push(tempEvents[i])
            }
            else {
                tempSto[objCalName] = [false, tempEvents[i]]
            }
        }
        setStockageCalendar(tempSto)
        seteventList(tempEvents)
    }

    function calendarSelecSwitch (name) {
        let temp = stockageCalendar
        stockageCalendar[name][0] = stockageCalendar[name][0] ? false : true
        setStockageCalendar(temp)
        forceReload()
    }

    function generateEventList () {
        let tempList = []
        for (let name in stockageCalendar) {
            if (stockageCalendar[name][0]) {
                tempList = tempList.concat(stockageCalendar[name].slice(1))
            }
        }
        return tempList
    }
    function generateWeeklyList () {
        let total = generateEventList()
        return total.filter(valeur => {
            if( valeur.start_date > getDateOfISOWeek().getTime() / 1000 && valeur.start_date < lastOfDay(6).getTime() / 1000) return true;
            if( valeur.end_date > getDateOfISOWeek().getTime() / 1000 && valeur.end_date < lastOfDay(6).getTime() / 1000) return true;
        })
    }

    function generateCalendarTable () {
        let calendarList = []
        for (let i = 0; i < eventList.length; i++) {
            if (calendarList.includes(eventList[i]['calendar'])) {
                
            }
            else {
                calendarList.push(eventList[i]['calendar'])
            }
        }
        return calendarList
    }


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

    const [isWeekly, setisWeekly] = useState(false);

    function switchMonWee() {
        let temp = isWeekly
        if(temp){
            setisWeekly(false)
        }
        else{
            setisWeekly(true)
        }
    }

    
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
                <MiniCalendar eventList={generateEventList()} isSele={isWeekly} month={month} year={year} week={week} nextMonth={() => nextMonth()} prevMonth={() => prevMonth()}/>
                <CalendarSelect calendarSelecSwitch={(x) => calendarSelecSwitch(x)} calendarList={generateCalendarTable()} />
            </div>
            <div className="right-section">
                {isWeekly ? <WeeklyCalendar calendarList={generateCalendarTable()} switch={() => switchMonWee()} nextWeek={() => nextWeek()} prevWeek={() => prevWeek()} year={year} week={week} month={month} eventList={generateWeeklyList()}/> : <MonthlyCalendar switch={() => switchMonWee()} calendarList={generateCalendarTable()} nextMonth={() => nextMonth()} prevMonth={() => prevMonth()} month={month} year={year} eventList={generateEventList()}/>}
            </div>
      </section>
    )
}