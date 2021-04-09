import React from 'react'
import {AppLogo} from './AppLogo'
import {ProfilButton} from './ProfilButton'

export const Header = () => {
    return (
        <div>
            <header>
                <AppLogo className="inline" />
                <ProfilButton className="inline" />
            </header>
        </div>
    )
}
