import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export const TodoListItem = (props, { deleteTask }) => {
    return (
        <div className="to-do-list-item" id={props.idd}>
            <Checkbox color='secondary' onClick={() => {props.deleteTask(props.txt, props.idd)}}/>
            <p>{props.txt}</p>
        </div>
    )
}
