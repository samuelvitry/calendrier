import react from 'react'

export const MiniCalendar = (props) => {

    //definir les props year and month
    function getJour (nbr) {
        var offsetbeggin = new Date(props.year, props.month - 1, 0).getDay();
        var day = new Date(props.year, props.month-1, nbr - offsetbeggin)
        return (day);
    }

    const MiniJour = (props) => {
        var gris = false
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
        return (
            <div className={props.selected ? 'mini-jour mini-selected' : 'mini-jour'} style={{color: gris ? '#495055' : '#111B22'}}>
                
                <p>{getJour(props.day).getDate()}</p>
            </div>
        )

    }

    const Line = (props) => {
        return (
            <div className='mini-line'>
                <MiniJour day={1 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour day={2 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour day={3 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour day={4 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour day={5 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour day={6 + props.offset} premier={props.premier} dernier={props.dernier}/>
                <MiniJour day={7 + props.offset} premier={props.premier} dernier={props.dernier}/>
            </div>
        )
    }

    return (
        <div className='mini-calendar'>
            <Line offset={0} premier={true} dernier={false}/>
            <Line offset={7} premier={false} dernier={false}/>
            <Line offset={14}premier={false} dernier={false}/>
            <Line offset={21}premier={false} dernier={false}/>
            <Line offset={28}premier={false} dernier={true}/>
        </div>
    )
}