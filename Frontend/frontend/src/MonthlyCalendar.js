import React, { useState, useEffect } from 'react'
import { Button, Tooltip, Typography } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'
import {MonthlyCalendarDay} from './MonthlyCalendarDay'
import { MonthlyTopbar } from './MonthlyTopbar'
import { Checkbox } from './Checkbox'
import { AddPopup } from './AddPopup'



export const MonthlyCalendar = (props) => {

    const [isExpanded, setisExpanded] = useState(false);

    const monthConv = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    }

    const [isDetail, setisDetail] = useState(-1);
    const [isAdd, setisAdd] = useState(false)

    var eventList = props.eventList

    function dispatchEvent (nbr) {
        // récup le nbr du jour réel
        let offset = new Date(props.year, props.month - 1, 1).getDay()
        if (offset == 0) {
            offset = 7
        }
        offset = offset - 1
        let start_date = new Date(props.year, props.month - 1, nbr - offset).getTime() / 1000
        let end_date = new Date(props.year, props.month - 1, nbr - offset).getTime() / 1000
        let tempStockage = []
        for (let i = 0; i < props.eventList.length; i++){
            let event = props.eventList[i]
            event['blank'] = false
            if (event['start_date'] >= start_date && event['start_date'] <= end_date) {
                tempStockage.push(event)
            }
            else if (event['end_date'] >= start_date && event['end_date'] <= end_date) {
                tempStockage.push(event)
            }
            else if (event['start_date'] <= start_date && event['end_date'] >= end_date) {
                tempStockage.push(event)
            }
        }
        while (tempStockage.length < 4) {
            tempStockage.push({'blank': true})
        }
        return tempStockage
    }
    

    function setPopup(test) {
        setisDetail(test);
    }
    function closePopup() {
        setisDetail(-1)
    }

    let  [,setState]=useState();
    function handleUpdate() {
       setState({});
    }
    function expand () {
        if (isExpanded === false){
            setisExpanded(true);
            handleUpdate();
        }
        else {
            setisExpanded(false);
            handleUpdate();
        }
    }
    function offsetDebut (dayNbr){
        var day = new Date(props.year, props.month - 1, 1).getDay();
        if (day === 0) {
            day = 7
        }
        if (day > dayNbr) {
            return true;
        }
        else {
            return false;
        }
    }
    function offsetFin (dayNbr) {
        var day = new Date(props.year, props.month, 0).getDay();
        if (day === 0) {
            day = 7
        }
        if (day >= dayNbr){
            return false;
        }
        else {
            return true;
        }
    }
    function getJour (nbr) {
        var offsetbeggin = new Date(props.year, props.month - 1, 0).getDay();
        var day = new Date(props.year, props.month-1, nbr - offsetbeggin)
        return (day);
    }
    
    const LastLine = (props) => {

        const [isOut, setIsOut] = useState(props.isExpanded);
        

        if (offsetDebut(1) === false && offsetFin(7) === false){
            return null;
        }
        else {
            return (
                <div className={props.annim}>
                    <div className="monthly-line">
                        <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={dispatchEvent(29)} day={getJour(29)} disabled={offsetFin(1)}/>
                        <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={dispatchEvent(30)} day={getJour(30)} disabled={offsetFin(2)}/>
                        <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={dispatchEvent(31)} day={getJour(31)} disabled={offsetFin(3)}/>
                        <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={dispatchEvent(32)} day={getJour(32)} disabled={offsetFin(4)}/>
                        <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={dispatchEvent(33)} day={getJour(33)} disabled={offsetFin(5)}/>
                        <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={dispatchEvent(34)} day={getJour(34)} disabled={offsetFin(6)}/>
                        <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={dispatchEvent(35)} day={getJour(35)} disabled={offsetFin(7)} numColor={offsetFin(7) ? "#cc3600" : "#FF6B35"}/>
                    </div>
                </div>
            );
        }
    }

    //le fait on arrive a appeler la fonction expand depuis le composant dernière line mais pas dans le parent, je fait donc un composant parent a toutes les lignes
    const Line = (props) => {

        //const [isOut, setIsOut] = useState(props.isExpanded);
        //const [offset, setoffset] = useState(props.offset);

        return (
            <div className={props.annim}>
                <div className="monthly-line">
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(1)} day={getJour(1)} disabled={offsetDebut(1)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(2)} day={getJour(2)} disabled={offsetDebut(2)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(3)} day={getJour(3)} disabled={offsetDebut(3)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(4)} day={getJour(4)} disabled={offsetDebut(4)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(5)} day={getJour(5)} disabled={offsetDebut(5)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(6)} day={getJour(6)} disabled={offsetDebut(6)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(7)} day={getJour(7)} disabled={offsetDebut(7)} numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(8)} day={getJour(8)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(9)} day={getJour(9)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(10)} day={getJour(10)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(11)} day={getJour(11)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(12)} day={getJour(12)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(13)} day={getJour(13)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(14)} day={getJour(14)} disabled={false} numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(15)} day={getJour(15)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(16)} day={getJour(16)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(17)} day={getJour(17)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(18)} day={getJour(18)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(19)} day={getJour(19)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(20)} day={getJour(20)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(21)} day={getJour(21)} disabled={false} numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(22)} day={getJour(22)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(23)} day={getJour(23)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(24)} day={getJour(24)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(25)} day={getJour(25)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(26)} day={getJour(26)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(27)} day={getJour(27)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={dispatchEvent(28)} day={getJour(28)} disabled={false} numColor="#FF6B35"/>
                </div>
            </div>
        );
    }
    
    const EventDetail = (props) => {

        console.log(props.event)
        var name = props.event['event_name']
        var date_debut = ''
        var duration = ''
        var repetition = ''

        var durationT = props.event['end_date'] - props.event['start_date']
        var debut = new Date(props.event['start_date'] * 1000)

        if (durationT >= 86400) {
            var debutMo = monthConv[debut.getMonth() + 1]
            var debutY = debut.getFullYear()
            var debutD = debut.getDate()
            date_debut = debutD + ', ' + debutMo + ', ' + debutY
            duration = Math.floor(durationT/86400) + ' days'
        }
        else {
            var durationH = Math.floor(durationT/3600)
            var durationM = Math.floor((durationT- (3600 * durationH))/60)
            if (durationM < 10){
                durationM = '0' + durationM
            }
            duration = durationH + 'h' + durationM

            var debutMo = monthConv[debut.getMonth() + 1]
            var debutY = debut.getFullYear()
            var debutD = debut.getDate()
            var debutH = debut.getHours()
            var debutM = debut.getMinutes()
            if (debutM < 10){
                debutM = '0' + debutM
            }
            date_debut = debutD + ', ' + debutMo + ', ' + debutY + ' at ' + debutH + 'h' + debutM
        }
        
        //ajouter l'affichage du calendrier :
        // <i class="far fa-calendar-alt"></i>

        const [isDropdown, setisDropdown] = useState(false)
        //faire une fonction qui gère l'appuie sur le bouton édit et delete
    
        return (
            <div className='detail-container'>
                <div className='event-detail'>
                    <div className='detail-first-line'>
                        <i class="fas fa-times" onClick={() => props.closeDetail()}></i>
                        <h2 style={{color: props.event['color']}}>{name}</h2>
                        <i class="fas fa-ellipsis-h" onClick={() => setisDropdown(isDropdown ? false : true)}></i>
                    </div>
                    {isDropdown ? <div className='detail-dropdown'>
                        <div onClick={() => setisDropdown(false)} className='detail-drop-edit'><i class="fas fa-pen"></i>Edit</div>
                        <div onClick={() => setisDropdown(false)} className='detail-drop-delete'><i class="fas fa-trash"></i>Delete</div>
                    </div> : null}
                    <div className='detail-line'>
                        <i class="far fa-clock"></i>
                        <p>{date_debut}</p>
                    </div>
                    <div className='detail-line'>
                        <i class="far fa-hourglass"></i>
                        <p>{duration}</p>
                    </div>
                    {repetition !== '' ? 
                    <div className='detail-line'>
                        <i class="fas fa-redo"></i>
                        <p>{repetition}</p>
                    </div> : null}
                </div>
            </div>
            
        )
    }

    //todo add calendar selector
    console.log(eventList)

    return (
        <div className="monthly-calendar">
            <MonthlyTopbar add={() => setisAdd(true)} switch={props.switch} month={props.month} year={props.year} nextMonth={() => props.nextMonth()} prevMonth={() => props.prevMonth()}/>
            <div className="monthly-actual">
                <Line annim={props.annim} />
                <div>
                    <LastLine annim={props.annim} isExpanded={isExpanded}/>
                </div>
            </div>
            {isDetail !== - 1 ? <EventDetail nbr={isDetail} event={eventList[isDetail]} closeDetail={() => closePopup()}/> : isAdd ? <AddPopup ajouterEvent={(x) => props.ajouterEvent(x)} calendarList={(x) => props.calendarList} setisAdd={() => setisAdd(false)}/> : null}
        </div>
    )
}
