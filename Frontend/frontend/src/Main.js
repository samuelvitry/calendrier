import React from 'react'
import {NextEvents} from './NextEvents'
import {TodoList} from './TodoList'
import { MonthlyCalendar } from './MonthlyCalendar'

export const Main = () => {
    return (
        <section className="main-section">
            
            <div class="right-section">
                <MonthlyCalendar month={4} year={2021}/>
            </div>
      </section>
    )
}
//ajouter le calendrier miniature
/*<aside className="left-section">
    <TodoList />
</aside>*/