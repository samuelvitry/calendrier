import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'

export const TodolistAdd = () => {
    return (
        <Grid className="to-do-add" container>
            <Grid item>
                <TextField id="standard-basic" placeholder="Add something to do..." color='secondary'/>
            </Grid>
            <Grid item alignItems="stretch" style={{ display: "flex" }}>
                <div className="to-do-add-button"><Button variant="contained" color="secondary" disableElevation>ADD</Button></div>
            </Grid>
        </Grid>
    )
}
