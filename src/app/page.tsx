'use client'

import { useAtom } from 'jotai'
import { useNostrHooks } from 'nostr-hooks'
import { Events } from './Events'
import { Login, isLoggedInAtom } from './Login'
import { MessageBox } from './MessageBox'
import { useCustomNdk } from './useCustomNdk'

export const currentDomain = 'https://github.com'
export const currentURL = 'https://github.com/nostr-protocol/nips/pull/1233'

export default () => {
    const [customNdk] = useCustomNdk()
    useNostrHooks(customNdk)
    const [isLoggedIn] = useAtom(isLoggedInAtom)

    return (
        <main className="h-full flex flex-col gap-4">
            <div>
                {currentDomain} – {currentURL}
            </div>
            <div className="overflow-auto flex-shrink">
                <Events currentDomain={currentDomain} currentURL={currentURL} />
            </div>
            {isLoggedIn ? <MessageBox /> : <Login />}
        </main>
    )
}
