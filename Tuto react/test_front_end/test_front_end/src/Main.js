import React from 'react'
import {NextEvents} from './NextEvents'
import {TodoList} from './TodoList'

export const Main = () => {
    return (
        <section class="main-section">
            <div class="left-section">
                <NextEvents />
                <hr/>
                <TodoList />
            </div>
            <div class="right-section">

            </div>
      </section>
    )
}
