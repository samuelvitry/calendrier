import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { Button } from './Button'

export const TodolistAdd = () => {
    return (
        <Grid className="to-do-add" container style = {{width: '94%', position: 'relative', whiteSpace: 'nowarp', overflow: 'hidden'}}>
            <Grid item style = {{width: '60%', marginRight: '5%'}} >
                <TextField id="standard-basic" placeholder="Add something..." color='secondary'/>
            </Grid>
            <Grid item style={{ display: "flex", position: "absolute", right: '5%'}}>
                <Button className="to-do-add-button" full={true} txt='ADD'></Button>
            </Grid>
        </Grid>
    )
}
