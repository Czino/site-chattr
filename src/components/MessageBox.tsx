import { useState } from 'react'
import { usePostMessage } from '../hooks/usePostMessage'
import { Button } from './Button'
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
            <Button onClick={postMessage}>Send</Button>
        </>
    )
}
