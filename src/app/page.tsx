'use client'

import NDK, { NDKNip07Signer } from '@nostr-dev-kit/ndk'
import { useNostrHooks } from 'nostr-hooks'
import { ChangeEvent, useEffect, useState } from 'react'
import { Events } from './Events'
import { Textarea } from './Textarea'
import { useConnectAndPost } from './useConnectAndPost'
const nip07signer = new NDKNip07Signer()
const ndk = new NDK({
    signer: nip07signer,
    explicitRelayUrls: ['wss://relay.damus.io/'],
})
ndk.connect()

const currentDomain = 'https://github.com'
const currentURL = 'https://github.com/nostr-protocol/nips/pull/1233'

export default () => {
    useNostrHooks(ndk)
    const [pubkey, setPubkey] = useState('')
    const [content, setContent] = useState('')
    const connectAndPost = useConnectAndPost({ content, domain: currentDomain, url: currentURL })
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)
    }
    useEffect(() => {
        ;(async () => {
            setPubkey((await nip07signer.user()).pubkey)
        })()
    }, [])

    return (
        <main className="h-full flex flex-col gap-4">
            <div>
                {currentDomain} – {currentURL}
            </div>
            {!!pubkey && (
                <div className="overflow-auto flex-shrink">
                    <Events currentDomain={currentDomain} currentURL={currentURL} />
                </div>
            )}
            <Textarea id="textarea" value={content} onChange={handleChange} placeholder="Your message..." />
            <button onClick={connectAndPost}>Send</button>
        </main>
    )
}
