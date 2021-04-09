import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export const TodoListItem = (props) => {
    return (
        <div className="to-do-list-item">
            <FormControlLabel 
                control={<Checkbox color='secondary'/>}
                label={props.txt}
            />
        </div>
    )
}
