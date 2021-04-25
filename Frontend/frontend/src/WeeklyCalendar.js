import React from 'react'

export const WeeklyCalendar = (props) => {

    var eventList = props.eventList

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

    function getHourString (nbr) {
        let date = new Date(nbr * 1000)
        let hour = date.getHours()
        let min = date.getMinutes()
        if (min < 10){
            min = "0" + min
        }
        if (hour < 10){
            hour = "0" + hour
        }
        return hour + "h" + min
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
    var weeklyStockage = [[], [], [], [], [], [], []]
    var topWeeklyStockage = [[], [], [], [], [], [], []]
    var isTop = false
    
    for(let i = 0; i < events.length; i++){
        if (events[i]['start_date'] < getDateOfISOWeek() && events[i]['end_date'] < getDateOfISOWeek()){
            events.splice(i, 1);
        }
    }
    for(let i = 0; i < events.length; i++){

        //tri des event trop long et attribution de la longueur + posistion pour les long
        let durationT = events[i]['end_date'] - events[i]['start_date']
        let start_dateT = new Date(events[i]['start_date'] * 1000)
        events[i]['dayNbr'] = Math.floor(durationT / 86400)
        if(events[i]['dayNbr'] > 0){
            events[i]['height'] = '3vh'
            events[i]['longueur'] = events[i]['dayNbr'] + "00%"
            let lmao = start_dateT.getDay() - 1
            topWeeklyStockage[lmao].push(events[i])
            isTop = true
        }
        else {
            events[i]['height'] = Math.floor(durationT / 600) + 'vh'
            events[i]['heightRaw'] = Math.floor(durationT / 600)
            events[i]['displayDate'] = getHourString(events[i]['start_date']) + " > " + getHourString(events[i]['end_date'])
        }
        events[i]['borderColor'] = events[i]['color']
        events[i]['fillColor'] = events[i]['color'] + '7e'
    }
    //attribuer les jour (les event sont dispaché dans l'array weekly stockage)
    for (let i = 0; i < dayOfWeek.length; i ++){
        let debut = rowToJour(i).getTime() / 1000
        let fin = lastOfDay(i).getTime() / 1000
        for (let j = 0; j <  events.length; j++){
            let event = events[j]
            if (event['dayNbr'] == 0 && event['start_date'] > debut && event['end_date'] < fin){
                let position = fin - event['start_date'] + 1
                event['posY'] = Math.floor(position / 600) + 'vh'
                weeklyStockage[i].push(event)
            }
        }
    }

    function changement () {
        props.switch()
    }

    const WeeklyTopbar = (props) => {

        return (
            <div className="weekly-topbar">
                <div className='weekly-nav'>
                    <h2>Week {props.week} ({monthConv[props.month]}), {props.year}</h2>
                    <p className="weekly-prev" onClick={() => props.prevWeek()}>&#60;</p>
                    <p className="weekly-next" onClick={() => props.nextWeek()}>&#62;</p>
                </div>
                <div className='monthly-weekly-switch'>
                <a className='monthly-weekly-switch1 switch-empty' onClick={() => changement()}>
                    Monthly
                </a>
                <a className='monthly-weekly-switch2 switch-full'>
                    Weekly
                </a>
            </div>
                <div className='weekly-top-button'>
                    <a className="button-full">
                        <span className='plus-add'>+</span>New
                    </a>
                </div>
            </div>
        )
    }
    const DayRow = (props) => {

        var evenements = props.evenements

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
                {evenements.map((x) => (<WeeklyEvent name={x['name']} hour={x['displayDate']} position={x['posY']} duration={x['height']} durationRaw={x['heightRaw']} padding backColor={x['fillColor']} borderColor={x['borderColor']}/>))}
                
            </div>
        )
    }
    const WeeklyEvent = (props) => {
        if (props.double){
            return null
        }
        return(
            <div className='weekly-event' style={{position: 'relative',bottom: props.position, minHeight: props.duration, padding: props.padding ?  '5px' : '0px', backgroundColor: props.backColor, borderColor: props.borderColor, width: props.width}}>
                <p className='weekly-event-name'>{props.name}</p>
                <p className='weekly-event-hour' style={{position: 'relative', top: props.durationRaw >= 12 ? '2vh' : '0'}}>{props.hour}</p>
            </div>
        )
    }
    const NumRow = (props) => {

        var hours = ['0h00', '1h00', '2h00', '3h00', '4h00', '5h00', 
        '6h00', '7h00', '8h00', '9h00', '10h00', '11h00', '12h00', '13h00', 
        '14h00', '15h00', '16h00', '17h00', '18h00', '19h00', '20h00', '21h00', 
        '22h00', '23h00']

        return (
            <div className='number-row'>
                {hours.map((hours) => (<div className='number-cell'>{hours}</div>))}
            </div>
        )
    }


    return (
        <div className='weekly-calendar'>
            <WeeklyTopbar nextWeek={() => props.nextWeek()} prevWeek={() => props.prevWeek()} week={props.week} month={props.month} year={props.year}/>
            <div className='weekly-actual'>
                {isTop ? <div className='weekly-first-line'>
                    <div className='number-row'>
                        <div className='number-cell'><p className='hidden'>69h00</p></div>
                        <div className='entire-day-cell'>
                            
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(0).getDate()}</h3>
                            <p>Monday</p>
                        </div>
                        <div className='entire-day-cell'>
                            {topWeeklyStockage[0].map((x) => (<WeeklyEvent name={x['name']} duration={x['height']} padding backColor={x['fillColor']} borderColor={x['borderColor']} width={x['longueur']}/>))}
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(1).getDate()}</h3>
                            <p>Tuesday</p>
                        </div>
                        <div className='entire-day-cell'>
                            {topWeeklyStockage[1].map((x) => (<WeeklyEvent name={x['name']} duration={x['height']} padding backColor={x['fillColor']} borderColor={x['borderColor']} width={x['longueur']}/>))}
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(2).getDate()}</h3>
                            <p>Wednesday</p>
                        </div>
                        <div className='entire-day-cell'>
                            {topWeeklyStockage[2].map((x) => (<WeeklyEvent name={x['name']} duration={x['height']} padding backColor={x['fillColor']} borderColor={x['borderColor']} width={x['longueur']}/>))}
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(3).getDate()}</h3>
                            <p>Thursday</p>
                        </div>
                        <div className='entire-day-cell'>
                            {topWeeklyStockage[3].map((x) => (<WeeklyEvent name={x['name']} duration={x['height']} padding backColor={x['fillColor']} borderColor={x['borderColor']} width={x['longueur']}/>))}
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(4).getDate()}</h3>
                            <p>Friday</p>
                        </div>
                        <div className='entire-day-cell'>
                            {topWeeklyStockage[4].map((x) => (<WeeklyEvent name={x['name']} duration={x['height']} padding backColor={x['fillColor']} borderColor={x['borderColor']} width={x['longueur']}/>))}
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(5).getDate()}</h3>
                            <p>Saturday</p>
                        </div>
                        <div className='entire-day-cell'>
                            {topWeeklyStockage[5].map((x) => (<WeeklyEvent name={x['name']} duration={x['height']} padding backColor={x['fillColor']} borderColor={x['borderColor']} width={x['longueur']}/>))}
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(6).getDate()}</h3>
                            <p>Sunday</p>
                        </div>
                        <div className='entire-day-cell'>
                            {topWeeklyStockage[6].map((x) => (<WeeklyEvent name={x['name']} duration={x['height']} padding backColor={x['fillColor']} borderColor={x['borderColor']} width={x['longueur']}/>))}
                        </div>
                    </div>
                </div> :
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
            </div>}
                <div className='weekly-other-line'>
                    <NumRow />
                    <DayRow evenements={weeklyStockage[0]} date={rowToJour(0)} dayName='Monday' />
                    <DayRow evenements={weeklyStockage[1]} date={rowToJour(1)} dayName='Tuesday' />
                    <DayRow evenements={weeklyStockage[2]} date={rowToJour(2)} dayName='Wednesday' />
                    <DayRow evenements={weeklyStockage[3]} date={rowToJour(3)} dayName='Thursday' />
                    <DayRow evenements={weeklyStockage[4]} date={rowToJour(4)} dayName='Friday' />
                    <DayRow evenements={weeklyStockage[5]} date={rowToJour(5)} dayName='Saturday' />
                    <DayRow evenements={weeklyStockage[6]} date={rowToJour(6)} dayName='Sunday' />
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

for (let k = 0; k < events[i]['dayNbr']; k++){
    let tempDay = new Date(start_dateT.getFullYear(), start_dateT.getMonth(), start_dateT.getDate() + k)
    if(start_dateT.getDate() + k > 7){
        let lmao = start_dateT.getDay() + k
        if(lmao < 7){
            topWeeklyStockage[lmao].push(events[i])
            isTop = true
        }
    }
}

*/