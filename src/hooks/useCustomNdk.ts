import NDK from '@nostr-dev-kit/ndk'
import { useEffect, useState } from 'react'
import { relays } from '../constants'

export const useCustomNdk = () => {
    const [customNdk, setCustomNdk] = useState<NDK>(new NDK({ explicitRelayUrls: relays }))

    useEffect(() => {
        customNdk.connect()
    }, [customNdk])

    return [customNdk, setCustomNdk] as const
}
