import React, { useState } from 'react'
import { Button, Tooltip, Typography } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'
import {MonthlyCalendarDay} from './MonthlyCalendarDay'



export const MonthlyCalendar = (props) => {

    const [isExpanded, setisExpanded] = useState(false);
    
    //
    const eventList = [{'name': 'Tournage BFM', 'start_date': 1619344800, 'end_date': 1619352000}, {'name': 'Auto école', 'start_date': 1618920000, 'end_date': 1619186400}]
    const stockageEvent = {}

    //attribution des event au jours
    for (let i = 0; i < eventList.length; i++) {
        var event = eventList[i]
        var date_debut = new Date(event['start_date'] * 1000)
        var date_fin = new Date(event['end_date'] * 1000)
        var isLong = false
        if (date_fin - date_debut < 86400000) {
            isLong = false
        }
        else{
            isLong = true
        }
        if (date_debut >= getJour(1) && date_fin <= getJour(35)){
            if (getMoinsJour(date_debut) in stockageEvent) {
                stockageEvent[getMoinsJour(date_debut)].push(event);
            }
            else {
                stockageEvent[getMoinsJour(date_debut)] = [event]
            }
        }
        else{
            break
        }
    }

    let  [,setState]=useState();
    function handleUpdate() {
        //passing empty object will re-render the component
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
    function monthString (nbr) {
        var months = new Array(['January', 'February', 'March',
                     'April', 'May', 'June', 'July', 'August',
                     'September', 'October', 'November', 'December']);
        return months[nbr-1];
    }
    function getMoinsJour (date) {
        var day = new Date(props.year, props.month, 0).getDay();
        if (day === 0) {
            day = 7
        }
        day = day - 1
        return date.getDate() + day
    }
    function getJour (nbr) {
        var offsetbeggin = new Date(props.year, props.month - 1, 0).getDay();
        var day = new Date(props.year, props.month-1, nbr - offsetbeggin)
        return (day);
    }
    
    const LastLine = (props) => {

        const [isOut, setIsOut] = useState(props.isExpanded);
        setIsOut(isOut);

        if (offsetDebut(1) === false && offsetFin(7) === false){
            return null;
        }
        else {
            return (
                <div className="monthly-line">
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isOut} day={getJour(29)} disabled={offsetFin(1)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isOut} day={getJour(30)} disabled={offsetFin(2)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isOut} day={getJour(31)} disabled={offsetFin(3)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isOut} day={getJour(32)} disabled={offsetFin(4)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isOut} day={getJour(33)} disabled={offsetFin(5)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isOut} day={getJour(34)} disabled={offsetFin(6)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isOut} day={getJour(35)} disabled={offsetFin(7)} numColor={offsetFin(7) ? "#cc3600" : "#FF6B35"}/>
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
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(1)} disabled={offsetDebut(1)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(2)} disabled={offsetDebut(2)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(3)} disabled={offsetDebut(3)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(4)} disabled={offsetDebut(4)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(5)} disabled={offsetDebut(5)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(6)} disabled={offsetDebut(6)}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(7)} disabled={offsetDebut(7)} numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(8)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(9)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(10)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(11)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(12)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(13)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(14)} disabled={false} numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(15)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(16)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(17)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(18)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(19)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(20)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(21)} disabled={false} numColor="#FF6B35"/>
                </div>
                <div className="monthly-line">
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(22)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(23)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(24)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(25)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(26)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(27)} disabled={false}/>
                    <MonthlyCalendarDay etendre={() => {expand()}} expand={isExpanded} day={getJour(28)} disabled={false} numColor="#FF6B35"/>
                </div>
            </div>
        );
    }
    


    return (
        <div className="monthly-calendar">
            <div className="monthly-topbar">
                <Tooltip title="Previous month">
                    <Button><NavigateBefore style={{color: '#E0EDF5'}}/></Button>
                </Tooltip>
                <Typography variant='h4'>{monthString(props.month)} {props.year}</Typography>
                <Tooltip title="Next month">
                    <Button><NavigateNext style={{color: '#E0EDF5'}}/></Button>
                </Tooltip>
            </div>
            <br />
            <div className="monthly-actual">
                <Line />
                <div>
                <LastLine isExpanded={isExpanded}/>
                </div>
                
            </div>
        </div>
    )
}
