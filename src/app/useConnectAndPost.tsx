'use client'
import { useNewEvent } from 'nostr-hooks'

type Props = {
    content: string
    domain: string
    url: string
}
export const usePostMessage = ({ content, domain, url }: Props) => {
    const { createNewEvent } = useNewEvent()

    const handlePublish = async () => {
        const event = createNewEvent()
        event.content = content
        event.kind = 1111
        event.tags = [
            ['S', `r:${url}`],
            ['K', `r:${domain}`],

            ['s', `r:${url}`],
            ['k', `r:${domain}`],
        ]
        event.sign()
        event.publish()
    }
    return handlePublish
}
