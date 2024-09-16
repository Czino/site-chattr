import { useAtom } from 'jotai'
import { useNostrHooks } from 'nostr-hooks'
import { useState } from 'react'
import { Events } from './Events'
import { Input } from './components/Input'
import { Login, isLoggedInAtom } from './components/Login'
import { MessageBox } from './components/MessageBox'
import { useCustomNdk } from './hooks/useCustomNdk'

export const SiteChattr = () => {
    const [currentURL, setCurrentURL] = useState('https://github.com/nostr-protocol/nips/pull/1233')
    const [customNdk] = useCustomNdk()
    useNostrHooks(customNdk)
    const [isLoggedIn] = useAtom(isLoggedInAtom)

    return (
        <main className="h-full flex flex-col gap-4">
            <div>
                <Input type="text" value={currentURL} onTextChange={setCurrentURL} />
            </div>
            <div className="overflow-auto flex-shrink">
                <Events url={currentURL} />
            </div>
            {isLoggedIn ? <MessageBox url={currentURL} /> : <Login />}
        </main>
    )
}
