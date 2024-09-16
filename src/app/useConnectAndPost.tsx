'use client'
import { useNewEvent, useSigner } from 'nostr-hooks'

type Props = {
    content: string
    domain: string
    url: string
}
export const useConnectAndPost = ({ content, domain, url }: Props) => {
    const { createNewEvent } = useNewEvent()
    const { signer } = useSigner()

    const handlePublish = () => {
        if (!signer) return
        const event = createNewEvent()
        event.content = content
        event.kind = 1111
        event.tags = [
            ['S', `r:${url}`],
            ['K', `r:${domain}`],

            ['s', `r:${url}`],
            ['k', `r:${domain}`],
        ]
        event.sign(signer)
        event.publish()
    }
    return handlePublish
}
