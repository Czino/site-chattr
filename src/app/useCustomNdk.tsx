'use client'
import NDK from '@nostr-dev-kit/ndk'
import { useEffect, useState } from 'react'

export const useCustomNdk = () => {
    const [customNdk, setCustomNdk] = useState<NDK>(
        new NDK({
            explicitRelayUrls: ['wss://relay.damus.io/'],
        }),
    )

    useEffect(() => {
        customNdk.connect()
    }, [customNdk])

    return [customNdk, setCustomNdk] as const
}
