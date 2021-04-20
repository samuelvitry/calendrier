import React from 'react'
import {NextEvents} from './NextEvents'
import {TodoList} from './TodoList'
import { MonthlyCalendar } from './MonthlyCalendar'
import { CalendarSelect } from './CalendarSelect'

export const Main = () => {
    return (
        <section className="main-section">
            <div className="left-section">
                <TodoList />
                <CalendarSelect />
            </div>
            <div class="right-section">
                <MonthlyCalendar month={4} year={2021}/>
            </div>
      </section>
    )
}
//ajouter le calendrier miniature
//