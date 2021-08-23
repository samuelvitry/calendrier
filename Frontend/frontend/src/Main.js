import React, { useState } from 'react'
import { NextEvents } from './NextEvents'
import { MonthlyCalendar } from './MonthlyCalendar'
import { CalendarSelect } from './CalendarSelect'
import { MiniCalendar } from './MiniCalendar'
import { WeeklyCalendar } from './WeeklyCalendar'
import axios from 'axios'
import { useCookies } from "react-cookie"
import { Button } from './Button'
import { sha256 } from 'js-sha256'
import AES from 'crypto-js'
import { Today } from './Today'
import { Planning } from './Planning'
import { Checkbox } from './Checkbox'

export function encryptCode(code, user) {
    var key = ''
    if ('email' in user) {
        key = sha256(user['email'])
        key = key + sha256(user['account_creation_date'])
        key = sha256(key)
        return AES.AES.encrypt(code, key).toString()
    }
}
export function decryptCode(code, user) {
    var key = ''
    if ('email' in user && code != null) {
        key = sha256(user['email'])
        key = key + sha256(user['account_creation_date'])
        key = sha256(key)
        return AES.AES.decrypt(code, key).toString(AES.enc.Utf8)
    }
}

axios.defaults.withCredentials = true;

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

export const Main = (props) => {

    const [cookies, setCookie] = useCookies();

    const colorCodeConv = ['#3581B8', '#5BA94C', '#E4C111', '#FF6B35', '#A72A2A']

    const [isCode, setIsCode] = useState(false)
    const [code, setCode] = useState('')
    const [codeHash, setCodeHash] = useState('')
    const [shldFetch, setShldFetch] = useState(true)
    const [isCodeSave, setIsCodeSave] = useState(false)

    const [isWeekly, setisWeekly] = useState(false);

    const [, setHeight] = useState(window.innerHeight)
    const [, setWidth] = useState(window.innerwidth)

    const [user, setUser] = useState({})

    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    React.useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    function getWeek(d) {
        let date = new Date(d)
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    if (shldFetch) {
        api.get("/").then((response) => {
            if (response.status === 200) {
                setCodeHash(response.data.code[0]['key']);
                setUser(response.data.user[0]);
                traiterEvent(response.data.event);
            }
        }).catch((err) => { console.log(err); console.log('Failed ! Redirect !'); window.location.href = "./login" })
        setShldFetch(false)
    }

    const [eventList, seteventList] = useState([])
    const [stockageCalendar, setStockageCalendar] = useState({})
    const [recurentEvents, setRecurentEvents] = useState([])
    const [reload, setReload] = useState(0)

    if (isCode && decryptCode(cookies.code, user) !== undefined) {
        if (codeHash === sha256(decryptCode(cookies.code, user))) {
            setIsCode(false)
            forceReload()
        }
    }

    function forceReload() {
        setShldFetch(true)
    }

    function submitCode() {
        if (code !== '') {
            if (codeHash === sha256(code)) {
                if (isCodeSave) {
                    setCookie("code", encryptCode(code, user), { path: '/' })
                }
                else {
                    setCookie("code", encryptCode(code, user), { path: '/', maxAge: 15 })
                }
                setIsCode(false)
                forceReload()
            }
            //todo afficher une erreur
        }
    }

    function traiterEvent(list) {
        var tempList = list.sort((a, b) => a['start_date'] - b['start_date'])
        let tempEvents = []
        let tempRecu = []
        let tempSto = {}
        if (decryptCode(cookies.code, user) != null) {
            if (sha256(decryptCode(cookies.code, user)) !== codeHash) {
                let temp = {}
                temp['Default Calendar'] = [true]
                setStockageCalendar(temp)
                setIsCode(true)
            }
            else {
                for (let i = 0; i < tempList.length; i++) {
                    let code = parseInt(tempList[i]['color'])
                    tempEvents.push(tempList[i])
                    tempEvents[i]['color'] = colorCodeConv[code]
                    tempEvents[i]['nbr'] = i
                    let fullCode = decryptCode(cookies.code, user)
                    fullCode = fullCode.concat(' ceci est du sel')
                    var bytes = AES.AES.decrypt(tempEvents[i]['event_name'], fullCode)
                    tempEvents[i]['event_name'] = bytes.toString(AES.enc.Utf8)
                    var objCalName = tempEvents[i]['calendar']
                    if (tempSto[objCalName]) {
                        tempSto[objCalName].push(tempEvents[i])
                    }
                    else {
                        tempSto[objCalName] = [true, tempEvents[i]]
                    }
                    var TZoffset = new Date().getTimezoneOffset() * 60
                    tempEvents[i]['start_date'] = tempEvents[i]['start_date'] - TZoffset
                    tempEvents[i]['end_date'] = tempEvents[i]['end_date'] - TZoffset
                    var recuNbr = tempEvents[i]['recurence'].toString()
                    if (tempEvents[i]['recurence'] !== -1) {
                        tempEvents[i]['recurence_nbr'] = parseInt(recuNbr.split('')[1])
                        tempEvents[i]['recurence_type'] = parseInt(recuNbr.split('')[0])
                        tempRecu.push(tempEvents[i])
                    }
                }
                if (tempSto.length < 1) {
                    tempSto['Default Calendar'] = [true]
                }
                setRecurentEvents(tempRecu)
                setStockageCalendar(tempSto)
                seteventList(tempEvents)
            }
        }
        else {
            setIsCode(true)
        }
    }

    function calendarSelecSwitch(name) {
        let temp = stockageCalendar
        stockageCalendar[name][0] = stockageCalendar[name][0] ? false : true
        setStockageCalendar(temp)
        setReload(reload + 1)
    }

    function generateEventList() {
        let tempList = []
        for (let name in stockageCalendar) {
            if (stockageCalendar[name][0]) {
                tempList = tempList.concat(stockageCalendar[name].slice(1))
            }
        }
        return tempList
    }
    function generateWeeklyList() {
        let total = generateEventList()
        return total.filter(valeur => {
            if (valeur.start_date > getDateOfISOWeek().getTime() / 1000 && valeur.start_date < lastOfDay(6).getTime() / 1000) return true;
            if (valeur.end_date > getDateOfISOWeek().getTime() / 1000 && valeur.end_date < lastOfDay(6).getTime() / 1000) return true;
            return false
        })
    }

    function generateCalendarTable() {
        let calendarList = []
        for (let i = 0; i < eventList.length; i++) {
            if (calendarList.includes(eventList[i]['calendar'])) {

            }
            else {
                calendarList.push(eventList[i]['calendar'])
            }
        }
        if (calendarList.length < 1) {
            calendarList.push('Default Calendar')
        }
        return calendarList
    }


    // function isFromWeek(event) {
    //     if (event['start_date'] > getDateOfISOWeek().getTime() / 1000 && event['start_date'] < lastOfDay(6).getTime() / 1000) {
    //         return true;
    //     }
    //     if (event['end_date'] > getDateOfISOWeek().getTime() / 1000 && event['end_date'] < lastOfDay(6).getTime() / 1000) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    function switchMonWee() {
        setAnnim("")
        let temp = isWeekly
        if (temp) {
            setisWeekly(false)
        }
        else {
            setisWeekly(true)
        }
    }

    function ajouterEvent(event) {
        setAnnim("")
        forceReload()
    }


    var now = new Date()
    const [year, setyear] = useState(now.getFullYear())
    const [week, setweek] = useState(getWeek(now))
    const [month, setmonth] = useState(now.getMonth() + 1)
    const [annim, setAnnim] = useState("")

    // var weeklyEventList = eventList.filter(valeur => {
    //     if (valeur.start_date > getDateOfISOWeek().getTime() / 1000 && valeur.start_date < lastOfDay(6).getTime() / 1000) return true;
    //     if (valeur.end_date > getDateOfISOWeek().getTime() / 1000 && valeur.end_date < lastOfDay(6).getTime() / 1000) return true;
    // })

    function nextWeek() {
        let tempMonth = month - 1
        let temp = new Date(year, tempMonth, getDateOfISOWeek().getDate() + 7)
        setweek(getWeek(temp))
        setmonth(temp.getMonth() + 1)
        setyear(temp.getFullYear())
        setAnnim("right-appear")
    }
    function prevWeek() {
        let tempMonth = month - 1
        let temp = new Date(year, tempMonth, getDateOfISOWeek().getDate() - 7)
        setweek(getWeek(temp))
        setmonth(temp.getMonth() + 1)
        setyear(temp.getFullYear())
        setAnnim("left-appear")
    }
    function nextMonth() {
        let temp = new Date(year, month, 1)
        setweek(getWeek(temp))
        setmonth(temp.getMonth() + 1)
        setyear(temp.getFullYear())
        setAnnim("right-appear")
    }
    function prevMonth() {
        let temp = new Date(year, month - 2, 1)
        setweek(getWeek(temp))
        setmonth(temp.getMonth() + 1)
        setyear(temp.getFullYear())
        setAnnim("left-appear")
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
    function lastOfDay(nbr) {
        let mon = getDateOfISOWeek()
        return new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + nbr, 23, 59, 59)
    }

    // function getMoinsJour(date) {
    //     var day = new Date(year, month, 0).getDay();
    //     if (day === 0) {
    //         day = 7
    //     }
    //     return date.getDate() + day
    // }
    // function getJour(nbr) {
    //     var offsetbeggin = new Date(year, month - 1, 0).getDay();
    //     var day = new Date(year, month - 1, nbr - offsetbeggin)
    //     return (day);
    // }
    // function rowToJour(nbr) {
    //     let mon = getDateOfISOWeek()
    //     return new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + nbr)
    // }

    // <MiniCalendar annim={annim} eventList={generateEventList()} isSele={isWeekly} month={month} year={year} week={week} nextMonth={() => nextMonth()} prevMonth={() => prevMonth()}/>
    // <CalendarSelect reload={() => forceReload()} stockageCalendar={stockageCalendar} calendarSelecSwitch={(x) => calendarSelecSwitch(x)} calendarList={generateCalendarTable()} ajouterEvent={(x) => ajouterEvent(x)}/>
    // <NextEvents eventList={eventList} reload={() => forceReload()}/>

    // <Today eventList={generateEventList()} reload={() => forceReload()}/>

    const mql_large = window.matchMedia('(min-width: 1610px)')
    const mql_mobile = window.matchMedia('(max-width: 1270px)')

    let large = mql_large.matches
    let mobile = mql_mobile.matches

    return (
        <section className="main-section" style={large ? { gridTemplateColumns: '300px 3fr 255px' } : mobile ? { gridTemplateColumns: '3fr' } : { gridTemplateColumns: '300px 3fr' }}>
            {!mobile ? <div className="left-section">
                <MiniCalendar annim={annim} eventList={generateEventList()} isSele={isWeekly} month={month} year={year} week={week} nextMonth={() => nextMonth()} prevMonth={() => prevMonth()} />
                <CalendarSelect reload={() => forceReload()} stockageCalendar={stockageCalendar} calendarSelecSwitch={(x) => calendarSelecSwitch(x)} calendarList={generateCalendarTable()} ajouterEvent={(x) => ajouterEvent(x)} />
                <NextEvents eventList={eventList} reload={() => forceReload()} />
            </div> : null}
            <div className={mobile ? "right-section right-section-mobile" : "right-section"}>
                {isWeekly ? <WeeklyCalendar recu={recurentEvents} user={user} mobile={mobile} reload={() => forceReload()} setAnnim={(x) => setAnnim(x)} ajouterEvent={(x) => ajouterEvent(x)} calendarList={generateCalendarTable()} switch={() => switchMonWee()} nextWeek={() => nextWeek()} prevWeek={() => prevWeek()} year={year} week={week} month={month} eventList={generateWeeklyList()} /> : <MonthlyCalendar recu={recurentEvents} user={user} mobile={mobile} reload={() => forceReload()} setAnnim={(x) => setAnnim(x)} annim={annim} ajouterEvent={(x) => ajouterEvent(x)} switch={() => switchMonWee()} calendarList={generateCalendarTable()} nextMonth={() => nextMonth()} prevMonth={() => prevMonth()} month={month} year={year} eventList={generateEventList()} />}
            </div>
            {large ? <Today eventList={generateEventList()} reload={() => forceReload()} /> : null}
            {mobile ? (
                <>
                    <Planning mobile eventList={eventList} reload={() => forceReload()} />
                    {/* <CalendarSelect mobile reload={() => forceReload()} stockageCalendar={stockageCalendar} calendarSelecSwitch={(x) => calendarSelecSwitch(x)} calendarList={generateCalendarTable()} ajouterEvent={(x) => ajouterEvent(x)} /> */}
                </>
            ) : null}
            {isCode ? <div className='code-popup-container'>
                <div className='code-popup'>
                    <h1>There is a problem !</h1>
                    <p>We need your code to access the events !</p>
                    <div className='code-in-line'>
                        <input className='input-contained' type='password' onChange={(e) => setCode(e.target.value)} autoFocus />
                        <Button onClick={() => submitCode()} full txt='Submit' />
                    </div>
                    <Checkbox checked={isCodeSave} changement={(x) => setIsCodeSave(x)} txt='Remember me ?' color='#3581b8' />
                </div>
            </div> : null}
        </section>
    )
}