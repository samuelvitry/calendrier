import React from 'react'

export const WeeklyCalendar = (props) => {

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

    function rowToJour() {
        return 5
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
                            <h3>{rowToJour(0)}</h3>
                            <p>Monday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(1)}</h3>
                            <p>Tuesday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(2)}</h3>
                            <p>Wednesday</p>
                        </div>

                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(3)}</h3>
                            <p>Thursday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(4)}</h3>
                            <p>Friday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(5)}</h3>
                            <p>Saturday</p>
                        </div>
                    </div>
                    <div className='day-row'>
                        <div className='weekly-cell'>
                            <h3>{rowToJour(6)}</h3>
                            <p>Sunday</p>
                        </div>
                    </div>
                </div>
                <div className='weekly-other-line'>
                    <NumRow />
                    <DayRow dayName='Monday' dayNbr={19}/>
                    <DayRow dayName='Tuesday' dayNbr={20}/>
                    <DayRow dayName='Wednesday' dayNbr={21}/>
                    <DayRow dayName='Thursday' dayNbr={22}/>
                    <DayRow dayName='Friday' dayNbr={23}/>
                    <DayRow dayName='Saturday' dayNbr={24}/>
                    <DayRow dayName='Sunday' dayNbr={25}/>
                </div>
                
            </div>
        </div>
    )
}
