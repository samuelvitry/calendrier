import React from 'react'
import {AppLogo} from './AppLogo'
import {ProfilButton} from './ProfilButton'
import { CalendarSelectContainer } from './CalendarSelect'

export const Header = () => {
    return (
        <div>
            <header>
                <AppLogo className="inline" />
                <h1>This header is WIP lol</h1>
                <ProfilButton className="inline" />
            </header>
        </div>
    )
}
