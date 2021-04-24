import React from 'react'

export const WeeklyCalendar = (props) => {

    var eventList = props.eventList

    //retourne la date de debut du jour moyenant le numéro de colonne (0 = lundis 6 = dimanche)
    function rowToJour(nbr) {
        let mon =  getDateOfISOWeek()
        return new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + nbr)
    }
    //retourne la dernière seconde du jour moyenant le num de colonne
    function lastOfDay(nbr){
        let mon =  getDateOfISOWeek()
        return new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + nbr, 23, 59, 59)
    }
    function getDateOfISOWeek() {
        var simple = new Date(props.year, 0, 1 + (props.week - 1) * 7);
        var dow = simple.getDay();
        var ISOweekStart = simple;
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        return ISOweekStart;
    }

    //retourne le décalage au debut du calendrier (0 si mois commence par lundis, 6 si dimanche)
    function offsetDebut (){
        var day = new Date(props.year, props.month - 1, 1).getDay();
        if (day === 0) {
            day = 7
        }
        day = day -1
        return day
    }

    const dayOfWeek = ['Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    //attribuer aux event une propriété duration et position
    //dabord filtrer les date extérieurs a la semaine puis les dates par jour et leurs donner une position x puis par heur et leur donner un posy
    var events = eventList.map((x) => x);
    var weeklyStockage = new Array([])
    weeklyStockage = [[], [], [], [], [], [], []]
    
    for(let i = 0; i < events.length; i++){
        if (events[i]['start_date'] < getDateOfISOWeek() && events[i]['end_date'] < getDateOfISOWeek()){
            events.splice(i, 1);
        }
    }
    for(let i = 0; i < events.length; i++){
        //definition de quelques variable d'attribution
        for (let j = 0; j < dayOfWeek.length; j++){
            events[i][dayOfWeek[j]] = false
        }

        //tri des event trop long et attribution de la longueur + posistion pour les long
        let durationT = events[i]['end_date'] - events[i]['start_date']
        let start_dateT = new Date(events[i]['start_date'] * 1000)
        events[i]['dayNbr'] = Math.floor(durationT / 86400)
        if(events[i]['dayNbr'] > 0){
            events[i]['posY'] = '150vh'
            events[i]['height'] = '6vh'
            for (let k = 0; k < events[i]['dayNbr']; k++){
                let tempDay = new Date(start_dateT.getFullYear(), start_dateT.getMonth(), start_dateT.getDate() + k)
                if(start_dateT.getDate() + k > 7){
                    let lmao = start_dateT.getDay() + k
                    if(lmao < 7){
                        weeklyStockage[lmao].push(events[i])
                    }
                }
                //placer direct l'event dans la bonne case
            }
        }
        else {
            events[i]['height'] = Math.floor(durationT / 600) + 'vh'
        }
    }
    //attribuer les jour (les event sont dispaché dans l'array weekly stockage)
    for (let i = 0; i < dayOfWeek.length; i ++){
        let debut = rowToJour(i).getTime() / 1000
        let fin = lastOfDay(i).getTime() / 1000
        for (let j = 0; j <  events.length; j++){
            let event = events[j]
            if (event['dayNbr'] == 0 && event['start_date'] > debut && event['end_date'] < fin){
                let position = fin - event['start_date'] + 1
                event['posY'] = Math.floor(position / 600) + 'vh'*
                weeklyStockage[i].push(event)
            }
        }
    }



    const WeeklyTopbar = (props) => {

        return (
            <div className="weekly-topbar">
                <div className='weekly-nav'>
                    <h2>Week {props.week}, {props.year}</h2>
                    <p className="weekly-prev">&#60;</p>
                    <p className="weekly-next">&#62;</p>
                </div>
                <div className='weekly-top-button'>
                    <a className="button-full" onClick={() => {props.onClick()}}>
                        <span className='plus-add'>+</span>New
                    </a>
                </div>
            </div>
        )
    }
    const DayRow = () => {

        //{evenements.map((x) => (<WeeklyEvent name={x['name']} hour='12h' position={x['posY']} duration={['height']} padding/>))}
        console.log(props.evenements)

        return(
            <div className='day-row'>
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                <div className='weekly-cell' />
                
            </div>
        )
    }
    const WeeklyEvent = (props) => {
        if (props.double){
            return null
        }
        return(
            <div className='weekly-event' style={{position: 'relative',bottom: props.position, minHeight: props.duration, padding: props.padding ?  '5px' : '0px'}}>
                <p className='weekly-event-name'>{props.name}</p>
                <p className='weekly-event-hour'>{props.hour}</p>
            </div>
        )
    }
    const NumRow = (props) => {

        var hours = ['Entire day' ,'0h00', '1h00', '2h00', '3h00', '4h00', '5h00', 
        '6h00', '7h00', '8h00', '9h00', '10h00', '11h00', '12h00', '13h00', 
        '14h00', '15h00', '16h00', '17h00', '18h00', '19h00', '20h00', '21h00', 
        '22h00', '23h00']

        return (
            <div className='number-row'>
                {hours.map((hours) => (<div className='number-cell'>{hours}</div>))}
            </div>
        )
    }

    var lunEvents = weeklyStockage[0]
    var marEvents = weeklyStockage[1]
    var merEvents = weeklyStockage[2]
    var jeuEvents = weeklyStockage[3]
    var venEvents = weeklyStockage[4]
    var samEvents = weeklyStockage[5]
    var dimEvents = weeklyStockage[6]

    //todo, j'essaie de passer weeklyStockage aux dayrow mais il se transforme en undefined

    return (
        <div className='weekly-calendar'>
            <WeeklyTopbar week={props.week} year={props.year}/>
            <div className='weekly-actual'>
                <div className='weekly-first-line'>
                    <div className='number-row'>
                        <div className='number-cell'><p className='hidden'>69h00</p></div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(0).getDate()}</h3>
                            <p>Monday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(1).getDate()}</h3>
                            <p>Tuesday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(2).getDate()}</h3>
                            <p>Wednesday</p>
                        </div>

                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(3).getDate()}</h3>
                            <p>Thursday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(4).getDate()}</h3>
                            <p>Friday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(5).getDate()}</h3>
                            <p>Saturday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(6).getDate()}</h3>
                            <p>Sunday</p>
                        </div>
                    </div>
                </div>
                <div className='weekly-other-line'>
                    <NumRow />
                    <DayRow evenements={lunEvents} date={rowToJour(0)} dayName='Monday' />
                    <DayRow evenements={marEvents} date={rowToJour(1)} dayName='Tuesday' />
                    <DayRow evenements={merEvents} date={rowToJour(2)} dayName='Wednesday' />
                    <DayRow evenements={jeuEvents} date={rowToJour(3)} dayName='Thursday' />
                    <DayRow evenements={venEvents} date={rowToJour(4)} dayName='Friday' />
                    <DayRow evenements={samEvents} date={rowToJour(5)} dayName='Saturday' />
                    <DayRow evenements={dimEvents} date={rowToJour(6)} dayName='Sunday' />
                </div>
            </div>
        </div>
    )
}

/*
if(props.date in props.eventList){
    for (let i = 0; i < countProps(props.eventList); i++){
        var event = props.eventList[props.date][i]
        var durationT = event['end_date'] - event['start_date']
        var durationS = ''
        var positionS = ''
        var positionT
        if (durationT >= 86399){
            durationS = '6vh'
            positionS = '150vh'
        }
        else {
            durationS = Math.floor(durationT / 600) + 'vh'
            positionT = ((props.date.getTime() / 1000) - 86400) - event['start_date']
            positionT = positionT - 3600
            if (positionT < 0){
                positionT = Math.sqrt(positionT * positionT)
            }
            
            positionS = Math.floor(positionT / 600) + 'vh'
        }
        event['duration'] = durationS
        event['position'] = positionS
    }
    var positionList = []
    for (let i = 0; i < countProps(props.eventList); i++){
        var event = props.eventList[i]
        if (positionList.indexOf(event['position']) != -1){
            event['double'] = true
        }
        else{
            positionList.push(event['position'])
            event['double'] = false
        }
    }
}

function countProps(obj) {
            var count = 0;
            for (var p in obj) {
              obj.hasOwnProperty(p) && count++;
            }
            return count; 
        }


*/