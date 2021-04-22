import React from 'react'
import {NextEvents} from './NextEvents'
import {TodoList} from './TodoList'
import { MonthlyCalendar } from './MonthlyCalendar'
import { CalendarSelect } from './CalendarSelect'
import { MiniCalendar } from './MiniCalendar'

export const Main = () => {
    return (
        <section className="main-section">
            <div className="left-section">
                <MiniCalendar month={4} year={2021}/>
                <CalendarSelect />
                <TodoList />
                
            </div>
            <div class="right-section">
                <MonthlyCalendar month={4} year={2021}/>
            </div>
      </section>
    )
}
//ajouter le calendrier miniature
//réduire la taille de la todo et selec (plus petite police et padding)