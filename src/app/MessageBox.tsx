'use client'
import { useState } from 'react'
import { Textarea } from './Textarea'
import { currentDomain, currentURL } from './page'
import { usePostMessage } from './useConnectAndPost'

export const MessageBox = () => {
    const [content, setContent] = useState('')
    const postMessage = usePostMessage({ content, domain: currentDomain, url: currentURL })

    return (
        <>
            <Textarea id="textarea" value={content} onTextChange={setContent} placeholder="Your message..." />
            <button
                className="bg-gradient-purple text-white p-2 rounded hover:bg-gradient-purple-dark"
                onClick={postMessage}
            >
                Send
            </button>
        </>
    )
}
