import react, { useState } from 'react'
import { Checkbox } from './Checkbox'
import { Button } from './Button'
import { api } from './Main'
import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const AddPopup = (props) => {

    const [isColor, setisColor] = useState(false)
    const [isCalendar, setIsCalendar] = useState(false)
    const [calendarNbr, setCalendarNbr] = useState(0)
    const [color, setcolor] = useState(0)

    const colorConv = ['Blue', 'Green', 'Yellow', 'Orange', 'Red']
    const colorCodeConv = ['#3581B8', '#5BA94C', '#E4C111', '#FF6B35', '#A72A2A']

    const [name, setName] = useState('')
    const [start, setStart] = useState(new Date().getTime())
    const [end, setEnd] = useState(new Date().getTime() + 3600)
    const [fullDay, setFullDay] = useState(false)
    //calendar select

    function submitData () {
        if (fullDay) {
            let tempStart = new Date(start)
            setStart(new Date(tempStart.getFullYear(), tempStart.getMonth(), tempStart.getDate()).getTime())
            let tempEnd = new Date(end)
            setEnd(new Date(tempEnd.getFullYear(), tempEnd.getMonth(), tempEnd.getDate(), 23, 59, 59).getTime())
        }
        if (end > start && name !== ''){
            let data = {
                "event_name": name,
                "start_date": start / 1000,
                "end_date": end / 1000,
                "color": color,
                "full": true,
                "calendar": props.calendarList()[calendarNbr],
            }
            console.log(data)
            api.post("/create", data).then(res => console.log(res)).catch(err => console.log(err)).then(res => props.setisAdd(false))
        }
        else {
            //afficher une erreur
        }
    }

    return (
        <div className='add-container'>
            <div className='add-popup'>
                <div className='add-first-line'>
                    <h2>New Event</h2>
                </div>
                <div className='add-line'>
                    <input onChange={(e) => setName(e.target.value)} style={{borderColor: colorCodeConv[color]}} placeholder='Event name' className='input-open'></input>
                </div>
                <div className='add-half-line'>
                    <p className='add-p-half'>Start Date</p>
                    <p className='add-p-half'>End Date</p>
                </div>
                <div className='add-line'>
                    <input onChange={(e) => setStart(new Date(e.target.value).getTime())} style={{borderColor: colorCodeConv[color]}} type={fullDay ? "date" :"datetime-local"} placeholder='Start date' className='input-open input-add-half input-add-half-first'></input>
                    <input onChange={(e) => setEnd(new Date(e.target.value).getTime())} style={{borderColor: colorCodeConv[color]}} type={fullDay ? "date" :"datetime-local"} placeholder='End date' className='input-open input-add-half input-add-half-second'></input>
                </div>
                <div className='add-under-line'>
                    <Checkbox changement={(bo) => setFullDay(bo => !bo)} color={colorCodeConv[color]} txt='All day' />
                </div>
                <div className='add-half-line'>
                    <p className='add-p-half'>Color</p>
                    <p className='add-p-half'>Calendar</p>
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
                    <Button onClick={() => props.setisAdd(false)} txt='Cancel'/>
                    <Button onClick={() => submitData()} full txt='Create Event'/>
                </div>
            </div>
        </div>
    )
}