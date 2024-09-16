'use client'
import { useSubscribe } from 'nostr-hooks'
import { useMemo } from 'react'

type Props = {
    currentDomain: string
    currentURL: string
}
export const Events = ({ currentDomain, currentURL }: Props) => {
    const filters = useMemo(
        () => [
            {
                kinds: [1111],
                '#S': [`r:${currentURL}`],
                '#K': [`r:${currentDomain}`],
            },
        ],
        [],
    )
    const { events, eose } = useSubscribe({ filters, fetchProfiles: true })

    if (!eose) return <div>Fetching messages...</div>

    return (
        <ul className="grid w-full gap-4">
            {events.map((event) => (
                <li key={event.id} className="w-full bg-slate-50 rounded p-4 overflow-hidden">
                    <p>{event.author.profile?.displayName}</p>
                    <p>{event.content}</p>
                    <p>{JSON.stringify(event.tags)}</p>
                    <p>{event.id}</p>
                </li>
            ))}
        </ul>
    )
}
