import react from 'react'

export const MiniCalendar = (props) => {


    function getJour (nbr) {
        var offsetbeggin = new Date(props.year, props.month - 1, 0).getDay();
        var day = new Date(props.year, props.month-1, nbr - offsetbeggin)
        return (day);
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
        return (
            <div className={selected ? 'mini-jour mini-selected' : 'mini-jour'} style={{color: gris ? '#49505500' : '#111B22'}}>
                
                <p>{getJour(props.day).getDate()}</p>
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