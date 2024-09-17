import { NDKEvent } from '@nostr-dev-kit/ndk'
import { useIsSelf } from '../hooks/useIsSelf'

const DEFAULTS = {
    USER_NAME: 'Anon',
}
const MS_PER_S = 1000
const GATEWAY = 'https://njump.me/'
export const Event = ({ event }: { event: NDKEvent }) => {
    const isSelf = useIsSelf()

    return (
        <li
            className={[
                'w-full rounded p-4 overflow-hidden flex flex-col gap-1',
                isSelf(event.author.pubkey) ? 'bg-highlight' : 'bg-purple-100',
            ].join(' ')}
        >
            <a className="flex gap-1 items-center leading-5"
                href={GATEWAY + event.author.npub}
                target="_blank"
                rel="noreferrer"
            >
                {event.author.profile?.image ? (
                    <img src={event.author.profile?.image} alt="" className="w-5 h-5 rounded-full" />
                ) : (
                    <div className="w-5 h-5 rounded-full bg-purple-400"></div>
                )}
                <p className="font-bold">{event.author.profile?.displayName || DEFAULTS.USER_NAME}</p>
                {!!event.created_at && (
                    <p className="text-purple-400 text-xs">
                        {new Date(event.created_at * MS_PER_S).toLocaleString()}
                    </p>
                )}
            </a>
            <p>{event.content}</p>
        </li>
    )
}
