import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'

export const TodolistAdd = () => {
    return (
        <Grid className="to-do-add" container style = {{width: '94%', position: 'relative', whiteSpace: 'nowarp', overflow: 'hidden'}}>
            <Grid item style = {{width: '60%', marginRight: '5%'}} >
                <TextField id="standard-basic" placeholder="Add something..." color='secondary'/>
            </Grid>
            <Grid item style={{ display: "flex", position: "absolute", right: '5%'}}>
                <Button className="to-do-add-button" variant="contained" color="secondary" disableElevation>ADD</Button>
            </Grid>
        </Grid>
    )
}
