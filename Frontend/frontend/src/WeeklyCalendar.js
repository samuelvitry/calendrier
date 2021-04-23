import React from 'react'

export const WeeklyCalendar = (props) => {

    var stockageEvent = props.stockageEvent

    function offsetDebut (){
        var day = new Date(props.year, props.month - 1, 1).getDay();
        if (day === 0) {
            day = 7
        }
        day = day -1
        return day
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

    const DayRow = (props) => {

        function countProps(obj) {
            var count = 0;
            for (var p in obj) {
              obj.hasOwnProperty(p) && count++;
            }
            return count; 
        }

        for (let i = 0; i < countProps(props.eventList); i++){
            var event = props.eventList[i]
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
                positionT = ((props.date.getTime() / 1000) + 86400) - event['start_date']
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
        return (
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
                {props.eventList.map((eventList) => (<WeeklyEvent name={eventList['name']} hour='12h > 14h' position={eventList['position']} duration={eventList['duration']} double={eventList['double']} padding/>))}
                
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

    function rowToJour(nbr) {
        var d = (1 + (props.week - 1) * 7) + nbr + 3;
        return new Date(props.year, 0, d);
    }
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
                            <h3>{rowToJour(0).getDate() + offsetDebut()}</h3>
                            <p>Monday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(1).getDate() + offsetDebut()}</h3>
                            <p>Tuesday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(2).getDate() + offsetDebut()}</h3>
                            <p>Wednesday</p>
                        </div>

                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(3).getDate() + offsetDebut()}</h3>
                            <p>Thursday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(4).getDate() + offsetDebut()}</h3>
                            <p>Friday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(5).getDate() + offsetDebut()}</h3>
                            <p>Saturday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(6).getDate() + offsetDebut()}</h3>
                            <p>Sunday</p>
                        </div>
                    </div>
                </div>
                <div className='weekly-other-line'>
                    <NumRow />
                    <DayRow eventList={stockageEvent[rowToJour(0).getDate() + offsetDebut() + 1]} date={rowToJour(0)} dayName='Monday' />
                    <DayRow eventList={stockageEvent[rowToJour(1).getDate() + offsetDebut() + 1]} date={rowToJour(1)} dayName='Tuesday' />
                    <DayRow eventList={stockageEvent[rowToJour(2).getDate() + offsetDebut() + 1]} date={rowToJour(2)} dayName='Wednesday' />
                    <DayRow eventList={stockageEvent[rowToJour(3).getDate() + offsetDebut() + 1]} date={rowToJour(3)} dayName='Thursday' />
                    <DayRow eventList={stockageEvent[rowToJour(4).getDate() + offsetDebut() + 1]} date={rowToJour(4)} dayName='Friday' />
                    <DayRow eventList={stockageEvent[rowToJour(5).getDate() + offsetDebut() + 1]} date={rowToJour(5)} dayName='Saturday' />
                    <DayRow eventList={stockageEvent[rowToJour(6).getDate() + offsetDebut() + 1]} date={rowToJour(6)} dayName='Sunday' />
                </div>
            </div>
        </div>
    )
}
