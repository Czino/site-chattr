import { atom, useAtom } from 'jotai'
import { useLogin } from 'nostr-hooks'
import { init as initNostrLogin } from 'nostr-login'
import { useEffect } from 'react'
import { Button } from './Button'

export const isLoggedInAtom = atom(false)

export const Login = () => {
    const [, setIsLoggedIn] = useAtom(isLoggedInAtom)
    const { loginWithExtension, logout } = useLogin()

    useEffect(() => {
        initNostrLogin({
            noBanner: false,
            onAuth: () => loginWithExtension({ onSuccess: () => setIsLoggedIn(true) }),
        })
        document.addEventListener('nlAuth', (e: any) => {
            if (e.detail.type === 'login' || e.detail.type === 'signup') {
                loginWithExtension({ onSuccess: () => setIsLoggedIn(true) })
            } else {
                logout()
                setIsLoggedIn(false)
            }
        })
    })

    const launchLogin = () => {
        document.dispatchEvent(new CustomEvent('nlLaunch', { detail: 'welcome' }))
    }
    return (
        <div className="grid grid-cols-1 gap-2 text-center">
            <Button onClick={launchLogin}>Login</Button>
        </div>
    )
}
