import { NDKSubscriptionOptions } from '@nostr-dev-kit/ndk'
import { useSubscribe } from 'nostr-hooks'
import { useMemo } from 'react'
import { NIP_01_KIND, NIP_73_KIND, relays } from '../constants'
import { getURLOrigin } from '../helpers/getURLOrigin'

const opts: NDKSubscriptionOptions = {
    closeOnEose: false,
}
type Props = {
    url: string
}
export const useURLEvents = ({ url }: Props) => {
    const filters = useMemo(
        () => [
            {
                kinds: [NIP_01_KIND],
                '#r': [url],
            },
            {
                kinds: [NIP_73_KIND],
                '#I': [url],
                '#K': [getURLOrigin(url)],
            },
        ],
        [url],
    )

    return useSubscribe({
        filters,
        opts,
        relays,
        enabled: !!url,
        fetchProfiles: true,
    })
}
