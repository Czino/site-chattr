'use client'

import { useAtom } from 'jotai'
import { useNostrHooks } from 'nostr-hooks'
import { useState } from 'react'
import { Events } from './Events'
import { Login, isLoggedInAtom } from './Login'
import { Textarea } from './Textarea'
import { usePostMessage } from './useConnectAndPost'
import { useCustomNdk } from './useCustomNdk'

const currentDomain = 'https://github.com'
const currentURL = 'https://github.com/nostr-protocol/nips/pull/1233'

export default () => {
    const [customNdk] = useCustomNdk()
    useNostrHooks(customNdk)
    const [isLoggedIn] = useAtom(isLoggedInAtom)
    const [content, setContent] = useState('')
    const postMessage = usePostMessage({ content, domain: currentDomain, url: currentURL })

    return (
        <main className="h-full flex flex-col gap-4">
            <div>
                {currentDomain} – {currentURL}
            </div>
            <div className="overflow-auto flex-shrink">
                <Events currentDomain={currentDomain} currentURL={currentURL} />
            </div>
            {isLoggedIn ? (
                <>
                    <Textarea id="textarea" value={content} onTextChange={setContent} placeholder="Your message..." />
                    <button onClick={postMessage}>Send</button>
                </>
            ) : (
                <Login />
            )}
        </main>
    )
}
