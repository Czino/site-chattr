import { useSubscribe } from 'nostr-hooks'
import { useMemo } from 'react'
import { Event } from './components/Event'
import { getDomain } from './helpers/getDomain'

const opts = {
    closeOnEose: false,
}
type Props = {
    url: string
}
const GENERIC_COMMENT_KIND = 1111
export const Events = ({ url }: Props) => {
    const filters = useMemo(
        () => [
            {
                kinds: [GENERIC_COMMENT_KIND],
                '#S': [`r:${url}`],
                '#K': [`r:${getDomain(url)}`],
            },
        ],
        [url],
    )

    const { events, eose } = useSubscribe({
        filters,
        opts,
        enabled: !!url,
        fetchProfiles: true,
    })

    if (!eose) return <div>Fetching messages...</div>

    return (
        <ul className="flex flex-col-reverse w-full gap-4">
            {events.map((event) => (
                <Event key={event.id} event={event} />
            ))}
        </ul>
    )
}
