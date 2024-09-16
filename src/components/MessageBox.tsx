import { useState } from 'react'
import { usePostMessage } from '../hooks/useConnectAndPost'
import { Textarea } from './Textarea'

type Props = { url: string }
export const MessageBox = ({ url }: Props) => {
    const [content, setContent] = useState('')
    const clearContent = () => setContent('')
    const postMessage = usePostMessage({
        content,
        url,
        onSuccess: clearContent,
    })

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
