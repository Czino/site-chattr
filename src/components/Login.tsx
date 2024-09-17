import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk'
import { atom, useAtom } from 'jotai'
import { useActiveUser, useLogin } from 'nostr-hooks'
import { useEffect } from 'react'
import { Button } from './Button'

export const isLoggedInAtom = atom(false)

export const Login = () => {
    const [, setIsLoggedIn] = useAtom(isLoggedInAtom)
    const { loginFromLocalStorage, loginWithExtension, loginWithSecretKey } = useLogin()
    const createNewPrivateKey = () => {
        const newSigner = NDKPrivateKeySigner.generate()
        return newSigner.privateKey
    }
    const onError = (e: unknown) => {
        throw new Error(String(e))
    }
    const { activeUser } = useActiveUser()

    useEffect(() => loginFromLocalStorage(), [loginFromLocalStorage])
    useEffect(() => {
        setIsLoggedIn(!!activeUser)
    }, [activeUser, setIsLoggedIn])

    return (
        <div className="grid grid-cols-1 gap-2">
            {/* <Button onClick={() => loginWithExtension({ onError })}>Login with Extension</Button> */}
            {/* <Button onClick={() => loginWithRemoteSigner({ onError })}>Login with Remote Signer</Button> */}
            {/* <Button
                onClick={() => loginWithSecretKey({ secretKey: prompt('Paste your secret here') || '', onError })}>
                Login with Secret Key
            </Button> */}
            <Button onClick={() => loginWithSecretKey({ secretKey: createNewPrivateKey(), onError })}>
                Create new user
            </Button>
        </div>
    )
}
