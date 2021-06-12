import react, { useState } from 'react'
import { Checkbox } from './Checkbox'
import { Button } from './Button'
import { api } from './Main'
import axios from 'axios'
import AES from 'crypto-js'
import { useCookies } from "react-cookie";

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const AddPopup = (props) => {

    const [isColor, setisColor] = useState(false)
    const [isCalendar, setIsCalendar] = useState(false)
    const [calendarNbr, setCalendarNbr] = useState(0)
    const [color, setcolor] = useState(0)

    const [cookies, setCookie] = useCookies();

    const colorConv = ['Blue', 'Green', 'Yellow', 'Orange', 'Red']
    const colorCodeConv = ['#3581B8', '#5BA94C', '#E4C111', '#FF6B35', '#A72A2A']

    const [name, setName] = useState('')
    const [start, setStart] = useState(new Date().getTime())
    const [end, setEnd] = useState(new Date().getTime() + 3600)
    const [fullDay, setFullDay] = useState(false)
    const [dateChanged, setDateChanged] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [startEndError, setStartEndError] = useState(false)


    function submitData () {
        var TZoffset = new Date().getTimezoneOffset() * 60
        setNameError(false)
        setStartEndError(false)
        setDateError(false)
        if (fullDay) {
            let tempStart = new Date(start)
            setStart(toHtmlDate(new Date(tempStart.getFullYear(), tempStart.getMonth() + 1, tempStart.getDate()), true))
            let tempEnd = new Date(end)
            setEnd(toHtmlDate(new Date(tempEnd.getFullYear(), tempEnd.getMonth() + 1, tempEnd.getDate(), 23, 59, 59), true))
            console.log(tempStart, tempEnd)
        }
        if (end > start && name !== ''){
            let code = cookies.code
            code = code.concat(' ceci est du sel')
            if (props.calendarList()[calendarNbr]) {
                var tempCalendar = props.calendarList()[calendarNbr]
            }
            else {
                var tempCalendar = "Default Calendar"
            }
            var encrypted = AES.AES.encrypt(name, code).toString()
            let data = {
                "event_name": encrypted,
                "start_date": (new Date(start).getTime() / 1000) + TZoffset,
                "end_date": (new Date(end).getTime() / 1000) + TZoffset,
                "color": color,
                "full": true,
                "calendar": tempCalendar,
            }
            api.post("/create", data).then(res => {props.setisAdd(false); props.ajouterEvent()})
        }
        else if(fullDay && end == start && name !== '') {
            let code = cookies.code
            code = code.concat(' ceci est du sel')
            if (props.calendarList()[calendarNbr]) {
                var tempCalendar = props.calendarList()[calendarNbr]
            }
            else {
                var tempCalendar = "Default Calendar"
            }
            let tempCustEnd = new Date(end)
            tempCustEnd.setHours(tempCustEnd.getHours() + 23)
            tempCustEnd.setMinutes(59)
            tempCustEnd.setSeconds(59)
            var encrypted = AES.AES.encrypt(name, code).toString()
            let data = {
                "event_name": encrypted,
                "start_date": (new Date(start).getTime() / 1000) + (2 * TZoffset),
                "end_date": (new Date(tempCustEnd).getTime() / 1000) + (2 * TZoffset),
                "color": color,
                "full": true,
                "calendar": tempCalendar,
            }
            api.post("/create", data).then(res => {props.setisAdd(false); props.ajouterEvent()})
        }
        else {
            if(name == '') {
                setNameError(true)
            }
            if (start > end){
                setStartEndError(true)
            }
            //todo treat date error
        }
    }

    function toHtmlDate(date, full) {
        let tempM = date.getMonth()
        if (tempM < 10){
            tempM = '0' + tempM
        }
        let tempD = date.getDate()
        if (tempD < 10){
            tempD = '0' + tempD
        }
        let tempH = date.getHours()
        if (tempH < 10){
            tempH = '0' + tempH
        }
        let temp
        if (full) {
            temp = date.getFullYear() + '-' + tempM + '-' + tempD
        }
        else{
            temp = date.getFullYear() + '-' + tempM + '-' + tempD + 'T' + tempH + ':00:00'
        }
        return temp
    }

    if(dateChanged == false){
        var time = new Date(props.time * 1000)
        var now = new Date()
        var mtnH = new Date(time.getFullYear(), time.getMonth() + 1, time.getDate(), now.getHours())
        var mtnD = new Date(time.getFullYear(), time.getMonth() + 1, time.getDate())
        var oneH = new Date(time.getFullYear(), time.getMonth() + 1, time.getDate(), now.getHours() + 1)
        var oneD = new Date(time.getFullYear(), time.getMonth() + 1, time.getDate())

        mtnH = toHtmlDate(mtnH, false)
        mtnD = toHtmlDate(mtnD, true)
        oneH = toHtmlDate(oneH, false)
        oneD = toHtmlDate(oneD, true)

        if (fullDay && start != mtnD) {
            setStart(mtnD)
            setEnd(oneD)
        }
        else if(fullDay == false && start != mtnH){
            setStart(mtnH)
            setEnd(oneH)
        }
    }

    return (
        <div className='add-container'>
            <div className='add-popup'>
                <div className='add-first-line'>
                    <h2>New Event</h2>
                </div>
                {nameError ? <p className='add-error-line'>Please provide a name</p> : null}
                <div className='add-line'>
                    <input onChange={(e) => setName(e.target.value)} style={{borderColor: colorCodeConv[color]}} placeholder='Event name' className='input-open'></input>
                </div>
                <div className='add-half-line'>
                    <p className='add-p-half'>Start Date</p>
                    <p className='add-p-half'>End Date</p>
                </div>
                {dateError ? <p className='add-error-line'>Incorrect date</p> : startEndError ? <p className='add-error-line'>Event can't end before starting</p> : null}
                <div className='add-line'>
                    <input value={start} onChange={(e) => {setDateChanged(true); setStart(e.target.value)}} style={{borderColor: colorCodeConv[color]}} type={fullDay ? "date" :"datetime-local"} placeholder='Start date' className='input-open input-add-half input-add-half-first'></input>
                    <input value={end} onChange={(e) => {setDateChanged(true); setEnd(e.target.value)}} style={{borderColor: colorCodeConv[color]}} type={fullDay ? "date" :"datetime-local"} placeholder='End date' className='input-open input-add-half input-add-half-second'></input>
                </div>
                <div className='add-under-line'>
                    <Checkbox changement={(bo) => setFullDay(bo => !bo)} color={colorCodeConv[color]} txt='All day' />
                </div>
                <div className='add-half-line'>
                    <p className='add-p-half'>Calendar</p>
                    <p className='add-p-half'>Color</p>
                </div>
                <div className='color-add-line add-line'>
                    <div className='add-half-drop'>
                        <div style={{borderColor: colorCodeConv[color]}} onClick={() => {isCalendar ? setIsCalendar(false) : setIsCalendar(true); setisColor(false)}} className='add-color-selector'>
                            <i className="fas fa-calendar-alt" style={{color: colorCodeConv[color]}}></i>
                            <p>{props.calendarList()[calendarNbr]}</p>
                            <i className="fas fa-caret-down" style={{right: '2em'}}></i>
                        </div>
                        {isCalendar ? <div className='add-color-drop'>
                            {props.calendarList().map((x) => (
                            <div onClick={() => {setCalendarNbr(props.calendarList().indexOf(x)); setIsCalendar(false)}} className='add-color-drop-element'>
                                <i className="fas fa-calendar-alt" style={{color: colorCodeConv[color]}}></i>
                                <p>{x}</p>
                            </div>))}
                        </div> : null}
                    </div>
                    <div className='add-half-drop'>
                        <div  style={{borderColor: colorCodeConv[color]}} onClick={() => {isColor ? setisColor(false) : setisColor(true); setIsCalendar(false)}} className='add-color-selector'>
                            <i className="fas fa-tag" style={{color: colorCodeConv[color]}}></i>
                            <p>{colorConv[color]}</p>
                            <i className="fas fa-caret-down"></i>
                        </div>
                        {isColor ? <div className='add-color-drop'>
                            <div onClick={() => {setcolor(0); setisColor(false)}} className='add-color-drop-element'>
                                <i className="fas fa-tag" style={{color: '#3581B8'}}></i>
                                <p>Blue</p>
                            </div>
                            <div onClick={() => {setcolor(1); setisColor(false)}} className='add-color-drop-element'>
                                <i className="fas fa-tag" style={{color: '#5BA94C'}}></i>
                                <p>Green</p>
                            </div>
                            <div onClick={() => {setcolor(2); setisColor(false)}} className='add-color-drop-element'>
                                <i className="fas fa-tag" style={{color: '#E4C111'}}></i>
                                <p>Yellow</p>
                            </div>
                            <div onClick={() => {setcolor(3); setisColor(false)}} className='add-color-drop-element'>
                                <i className="fas fa-tag" style={{color: '#FF6B35'}}></i>
                                <p>Orange</p>
                            </div>
                            <div onClick={() => {setcolor(4); setisColor(false)}} className='add-color-drop-element'>
                                <i className="fas fa-tag" style={{color: '#A72A2A'}}></i>
                                <p>Red</p>
                            </div>
                        </div> : null}
                    </div>
                </div>
                <div className='add-button-line add-line'>
                    <Button onClick={() => props.setisAdd(false)} txt='Cancel' first/>
                    <Button onClick={() => submitData()} full txt='Create Event' last/>
                </div>
            </div>
        </div>
    )
}