import React from 'react'
import { Button } from './Button'

export const Login = () => {

    function submitData () {

    }
    function redirectHome () {

    }

    return (
        <div className='login-container'>
            <div className='login-card'>
                <h1>Log-in</h1>
                <input type='email' autoComplete='off' autoCapitalize='off' className='login-email input-contained' autoFocus='autofocus' placeholder='Email' required='required' />
                <input type='password' autoComplete='off' autoCapitalize='off' className='login-password input-contained' placeholder='Password' required='required' />
                <div className='login-btn-container'>
                    <div className='login-cancel'>
                        <Button className='login-cancel' full txt='Cancel' onClick={() => {redirectHome()}}/>
                    </div>
                    <div className='login-submit'>
                        <Button className='login-submit-btn' full txt='Login' onClick={() => {submitData()}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
/* faire un bouton je n'ai pas de compte */