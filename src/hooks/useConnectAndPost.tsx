import { useNewEvent } from 'nostr-hooks'
import { useCallback } from 'react'
import { getDomain } from '../helpers/getDomain'

type Props = {
    content: string
    url: string
    onSuccess?: () => void
}
export const usePostMessage = ({ content, url, onSuccess }: Props) => {
    const { createNewEvent } = useNewEvent()

    const handlePublish = useCallback(async () => {
        const event = createNewEvent()
        const domain = getDomain(url)
        event.content = content
        event.kind = 1111
        event.tags = [
            ['S', `r:${url}`],
            ['K', `r:${domain}`],

            ['s', `r:${url}`],
            ['k', `r:${domain}`],
        ]
        event.sign()
        await event.publish()
        if (onSuccess) onSuccess()
    }, [createNewEvent, url, content, onSuccess])

    return handlePublish
}