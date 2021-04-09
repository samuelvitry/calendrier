import React from 'react'
import {NextEventItem} from "./NextEventItem"
import Typography from '@material-ui/core/Typography'

export const NextEvents = () => {
    return (
        <section class="next-event">
            <Typography variant="h4">Next events</Typography>
            <NextEventItem name="Vernis" time="9 Avril 10h" />
            <NextEventItem name="Coiffeur" time="10 Avril 10h" />
            <NextEventItem name="Mise a l'eau" time="Lundis 10h" />
        </section>
    )
}
