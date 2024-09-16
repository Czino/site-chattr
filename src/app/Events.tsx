'use client'
import { useActiveUser, useSubscribe } from 'nostr-hooks'
import { useMemo } from 'react'

const DEFAULTS = {
    USER_NAME: 'Anon',
}
type Props = {
    currentDomain: string
    currentURL: string
}
export const Events = ({ currentDomain, currentURL }: Props) => {
    const { activeUser } = useActiveUser()
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
    const isSelf = (pubkey: string) => activeUser?.pubkey === pubkey
    if (!eose) return <div>Fetching messages...</div>

    return (
        <ul className="grid w-full gap-4">
            {events.map((event) => (
                <li
                    key={event.id}
                    className={[
                        'w-full rounded p-4 overflow-hidden flex flex-col gap-1',
                        isSelf(event.author.pubkey) ? 'bg-purple-100' : 'bg-highlight',
                    ].join(' ')}
                >
                    <div className="flex gap-2 items-end leading-5">
                        <p className="font-bold">{event.author.profile?.displayName || DEFAULTS.USER_NAME}</p>
                        {!!event.created_at && (
                            <p className="text-purple-400 text-xs">
                                {new Date(event.created_at * 1000).toLocaleString()}
                            </p>
                        )}
                    </div>
                    <p>{event.content}</p>
                </li>
            ))}
        </ul>
    )
}
