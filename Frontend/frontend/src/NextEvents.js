import React from 'react'
import {NextEventItem} from "./NextEventItem"

export const NextEvents = () => {
    return (
        <section className="next-event">
            <h2>Next events</h2>
            <NextEventItem name="Vernis" time="9 Avril 10h" />
            <NextEventItem name="Coiffeur" time="10 Avril 10h" />
            <NextEventItem name="Mise a l'eau" time="Lundis 10h" />
        </section>
    )
}
