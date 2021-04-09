import React from 'react'
import Typography from '@material-ui/core/Typography'

export const NextEventItem = (props) => {
    return (
        <div class="next-event-item">
            <Typography variant="body1">{props.name}, {props.time}</Typography>
        </div>
    )
}
