import react from 'react'

export const MiniCalendar = (props) => {
    
    var eventList = props.eventList
    const stockageEvent = {}

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
    
    function getJour (nbr) {
        var offsetbeggin = new Date(props.year, props.month - 1, 0).getDay();
        var day = new Date(props.year, props.month-1, nbr - offsetbeggin)
        return (day);
    }
    function getMoinsJour (date) {
        var day = new Date(props.year, props.month, 0).getDay();
        if (day === 0) {
            day = 7
        }
        day = day - 2
        return date.getDate() + day
    }

    const MiniJour = (props) => {

        var gris = false
        const today = new Date
        var selected = false
        if (props.premier){
            if (getJour(props.day).getDate() > 15){
                gris = true
            }
        }
        if (props.dernier){
            if (getJour(props.day).getDate() < 15){
                gris = true
            }
        }
        var mois = today.getMonth()
        mois = mois + 1
        if (getJour(props.day).getDate() == today.getDate()){
            if (props.month == mois){
                selected = true
            }
        }

        var events = stockageEvent[props.day]
        var nbrDot = events.length

        return (
            <div className={selected ? 'mini-jour mini-selected' : 'mini-jour'} style={{color: gris ? '#49505550' : '#111B22'}}>
                <p>{getJour(props.day).getDate()}</p>
                <div className='mini-dot'>
                    {nbrDot > 0 ? <div className='mini-dot1' style={{backgroundColor: events[0]['color']}}></div> : null}
                    {nbrDot > 1 ? <div className='mini-dot2' style={{backgroundColor: events[1]['color']}}></div> : null}
                </div>
            </div>
        )

    }

    const Line = (props) => {
        return (
            <div className='mini-line'>
                <MiniJour month={props.month} day={1 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour month={props.month} day={2 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour month={props.month} day={3 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour month={props.month} day={4 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour month={props.month} day={5 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour month={props.month} day={6 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour month={props.month} day={7 + props.offset} premier={props.premier} dernier={props.dernier}/>
            </div>
        )
    }
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

    return (
        <div className='mini-calendar'>
            <div className='mini-top'>
                <h2>{monthConv[props.month]} {props.year} </h2>
                <div className='mini-nav'>
                    <h2 className='mini-nav-prev' onClick={() => props.prevMonth()}>&#60;</h2>
                    <h2 className='mini-nav-next' onClick={() => props.nextMonth()}>&#62;</h2>
                </div>
            </div>
            <Line month={props.month} offset={0} premier={true} dernier={false}/>
            <Line month={props.month} offset={7} premier={false} dernier={false}/>
            <Line month={props.month} offset={14}premier={false} dernier={false}/>
            <Line month={props.month} offset={21}premier={false} dernier={false}/>
            <Line month={props.month} offset={28}premier={false} dernier={true}/>
        </div>
    )
}