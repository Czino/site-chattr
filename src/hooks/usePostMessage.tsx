import { useNewEvent } from 'nostr-hooks'
import { useCallback } from 'react'
import { getURLOrigin } from '../helpers/getURLOrigin'

type Props = {
    content: string
    url: string
    onSuccess?: () => void
}
export const usePostMessage = ({ content, url, onSuccess }: Props) => {
    const { createNewEvent } = useNewEvent()

    const handlePublish = useCallback(async () => {
        const event = createNewEvent()
        const domain = getURLOrigin(url)
        event.content = content
        event.kind = 1111
        event.tags = [
            ['S', `${url}`],
            ['K', `${domain}`],

            ['s', `${url}`],
            ['k', `${domain}`],
        ]
        event.sign()
        await event.publish()
        if (onSuccess) onSuccess()
    }, [createNewEvent, url, content, onSuccess])

    return handlePublish
}
