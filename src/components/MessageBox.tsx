import { useState } from 'react'
import { IoMdSend } from 'react-icons/io'
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
        <div className="flex flex-col gap-2">
            <div className="flex flex-row flex-nowrap gap-2 items-end p-2">
                <Textarea
                    className="flex-shrink pr-12 w-full"
                    id="textarea"
                    value={content}
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement
                        target.style.height = 'auto'
                        target.style.height = `${target.scrollHeight}px`
                    }}
                    onTextChange={setContent}
                    placeholder="Your message..."
                />
                <Button
                    onClick={postMessage}
                    aria-label="Send"
                    className="flex absolute right-3 bottom-3 justify-center items-center p-0 w-10 h-10 rounded-full"
                >
                    <IoMdSend className="w-7 h-7 relative left-[2px] flex-shrink-0" />
                </Button>
            </div>
        </div>
    )
}
