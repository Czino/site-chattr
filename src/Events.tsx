import { Event } from './components/Event'
import { useURLEvents } from './hooks/useURLEvents'

type Props = {
    url: string
}
export const Events = ({ url }: Props) => {
    const { events, eose } = useURLEvents({ url })

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
