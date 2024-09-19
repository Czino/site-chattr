import { NDKEvent } from '@nostr-dev-kit/ndk'
import { GATEWAY, MS_PER_S } from '../constants'
import { useIsSelf } from '../hooks/useIsSelf'
import { ProfileInline } from './ProfileInline'

export const Event = ({ event }: { event: NDKEvent }) => {
    const isSelf = useIsSelf()

    return (
        <li
            className={[
                'w-full rounded p-4 overflow-hidden flex flex-col gap-1',
                isSelf(event.author.pubkey) ? 'bg-highlight' : 'bg-purple-100',
            ].join(' ')}
        >
            <a
                className="flex gap-1 items-center leading-5"
                href={GATEWAY + event.author.npub}
                target="_blank"
                rel="noreferrer"
            >
                {!!event.author.profile && <ProfileInline profile={event.author.profile} />}
                {!!event.created_at && (
                    <p className="text-xs text-purple-400">{new Date(event.created_at * MS_PER_S).toLocaleString()}</p>
                )}
            </a>
            <p>{event.content}</p>
        </li>
    )
}
