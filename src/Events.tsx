import { useSubscribe } from 'nostr-hooks'
import { useMemo } from 'react'
import { Event } from './components/Event'
import { getURLOrigin } from './helpers/getURLOrigin'

const opts = {
    closeOnEose: false,
}
const relays = ['wss://nostr-pub.wellorder.net/', 'wss://nostr.bitcoiner.social', 'wss://relay.damus.io/']
type Props = {
    url: string
}

const NIP_01_KIND = 1
const NIP_73_KIND = 1111
export const Events = ({ url }: Props) => {
    const filters = useMemo(
        () => [
            {
                kinds: [NIP_01_KIND],
                '#r': [url],
            },
            {
                kinds: [NIP_73_KIND],
                '#S': [`${url}`],
                '#K': [`${getURLOrigin(url)}`],
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
        <ul className="flex flex-col-reverse gap-4 w-full">
            {events.map((event) => (
                <Event key={event.id} event={event} />
            ))}
        </ul>
    )
}
