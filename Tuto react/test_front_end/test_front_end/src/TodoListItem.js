import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export const TodoListItem = (props, { deleteTask }) => {
    return (
        <div className="to-do-list-item" id={props.idd}>
            <FormControlLabel 
                control={<Checkbox color='secondary'/>}
                label={props.txt}
                style={{overflow: 'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}
                onClick={() => {props.deleteTask(props.txt, props.idd)}}
            />
        </div>
    )
}
