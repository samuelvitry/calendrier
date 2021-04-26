import React, { useState, useEffect } from 'react'
import { Button, Tooltip, Typography } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'
import {MonthlyCalendarDay} from './MonthlyCalendarDay'
import { MonthlyTopbar } from './MonthlyTopbar'



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

    var eventList = props.eventList
    const stockageEvent = {}

    //attibution des event au jours
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
            break
        }
    }
    //remplire les espace blanc
    for (let i = 0; i < 36; i++) {
        if (i in stockageEvent){

        }
        else {
            stockageEvent[i] = []
        }
    }
    

    function setPopup(test) {
        setisDetail(test);
    }
    function closePopup() {
        //todo add annimation
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
    function getMoinsJour (date) {
        var day = new Date(props.year, props.month, 0).getDay();
        if (day === 0) {
            day = 7
        }
        day = day - 2
        return date.getDate() + day
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
                <div className="monthly-line">
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={stockageEvent[29]} day={getJour(29)} disabled={offsetFin(1)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={stockageEvent[30]} day={getJour(30)} disabled={offsetFin(2)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={stockageEvent[31]} day={getJour(31)} disabled={offsetFin(3)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={stockageEvent[32]} day={getJour(32)} disabled={offsetFin(4)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={stockageEvent[33]} day={getJour(33)} disabled={offsetFin(5)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={stockageEvent[34]} day={getJour(34)} disabled={offsetFin(6)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isOut} eventList={stockageEvent[35]} day={getJour(35)} disabled={offsetFin(7)} numColor={offsetFin(7) ? "#cc3600" : "#FF6B35"}/>
                </div>
            );
        }
    }


    //le fait on arrive a appeler la fonction expand depuis le composant dernière line mais pas dans le parent, je fait donc un composant parent a toutes les lignes
    const Line = (props) => {

        //const [isOut, setIsOut] = useState(props.isExpanded);
        //const [offset, setoffset] = useState(props.offset);

        return (
            <div>
                <div className="monthly-line">
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[1]} day={getJour(1)} disabled={offsetDebut(1)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[2]} day={getJour(2)} disabled={offsetDebut(2)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[3]} day={getJour(3)} disabled={offsetDebut(3)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[4]} day={getJour(4)} disabled={offsetDebut(4)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[5]} day={getJour(5)} disabled={offsetDebut(5)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[6]} day={getJour(6)} disabled={offsetDebut(6)}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[7]} day={getJour(7)} disabled={offsetDebut(7)} numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[8]} day={getJour(8)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[9]} day={getJour(9)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[10]} day={getJour(10)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[11]} day={getJour(11)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[12]} day={getJour(12)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[13]} day={getJour(13)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[14]} day={getJour(14)} disabled={false} numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[15]} day={getJour(15)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[16]} day={getJour(16)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[17]} day={getJour(17)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[18]} day={getJour(18)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[19]} day={getJour(19)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[20]} day={getJour(20)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[21]} day={getJour(21)} disabled={false} numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[22]} day={getJour(22)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[23]} day={getJour(23)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[24]} day={getJour(24)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[25]} day={getJour(25)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[26]} day={getJour(26)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[27]} day={getJour(27)} disabled={false}/>
                    <MonthlyCalendarDay open={(nbr) => setPopup(nbr)} etendre={() => {expand()}} expand={isExpanded} eventList={stockageEvent[28]} day={getJour(28)} disabled={false} numColor="#FF6B35"/>
                </div>
            </div>
        );
    }
    
    const EventDetail = (props) => {

        var name = props.event['name']
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

    return (
        <div className="monthly-calendar">
            <MonthlyTopbar switch={props.switch} month={props.month} year={props.year} nextMonth={() => props.nextMonth()} prevMonth={() => props.prevMonth()}/>
            <div className="monthly-actual">
                <Line />
                <div>
                    <LastLine isExpanded={isExpanded}/>
                </div>
            </div>
            {isDetail !== - 1 ? <EventDetail nbr={isDetail} event={eventList[isDetail]} closeDetail={() => closePopup()}/> : null}
        </div>
    )
}
