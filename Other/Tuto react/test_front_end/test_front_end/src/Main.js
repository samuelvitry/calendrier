import React from 'react'
import {NextEvents} from './NextEvents'
import {TodoList} from './TodoList'
import { MonthlyCalendar } from './MonthlyCalendar'

export const Main = () => {
    return (
        <section className="main-section">
            <aside className="left-section">
                <NextEvents />
                <hr/>
                <TodoList />
            </aside>
            <div class="right-section">
                <MonthlyCalendar month={4} year={2021}/>
            </div>
      </section>
    )
}
