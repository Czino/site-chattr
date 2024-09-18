import NDK from '@nostr-dev-kit/ndk'
import { useEffect, useState } from 'react'

export const explicitRelayUrls = [
    'wss://nostr-pub.wellorder.net/',
    'wss://nostr.bitcoiner.social',
    'wss://relay.damus.io/',
]
export const useCustomNdk = () => {
    const [customNdk, setCustomNdk] = useState<NDK>(new NDK({ explicitRelayUrls }))

    useEffect(() => {
        customNdk.connect()
    }, [customNdk])

    return [customNdk, setCustomNdk] as const
}
