import React from 'react'
import { AccountCircle } from '@material-ui/icons'

export const ProfilButton = () => {
    return (
        <div className="profil-button">
            <AccountCircle style={{ fontSize: window.matchMedia('(max-width: 450px)').matches ? '40px' : '80px' }} />
        </div>
    )
}
