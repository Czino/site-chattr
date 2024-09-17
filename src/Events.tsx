import { useSubscribe } from 'nostr-hooks'
import { useMemo } from 'react'
import { Event } from './components/Event'
import { getDomain } from './helpers/getDomain'

const opts = {
    closeOnEose: false,
}
const relays = [
    'wss://nostr-pub.wellorder.net/',
    'wss://nostr.bitcoiner.social',
    'wss://relay.damus.io/',
]
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
        relays,
        enabled: !!url,
        fetchProfiles: true,
    })

    if (!eose) return <div className="text-center text-purple-300">Fetching messages...</div>
    if (events.length === 0) return <div className="text-center text-purple-300">No messages yet</div>

    return (
        <ul className="flex flex-col-reverse w-full gap-4">
            {events.map((event) => (
                <Event key={event.id} event={event} />
            ))}
        </ul>
    )
}
