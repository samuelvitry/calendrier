import React from 'react'
import {TodoListItem} from './TodoListItem'
import {TodolistAdd} from './TodolistAdd'
import Typography from '@material-ui/core/Typography'


export const TodoList = () => {
    return (
        <section class="to-do-list">
            <Typography variant="h4">To-do list</Typography>
            <TodoListItem txt="Terminer la base du front end" />
            <TodoListItem txt="Ameliorer le CSS" />
            <TodolistAdd />
        </section>
    )
}