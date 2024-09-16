import NDK from '@nostr-dev-kit/ndk'
import { useEffect, useState } from 'react'

export const useCustomNdk = () => {
    const [customNdk, setCustomNdk] = useState<NDK>(
        new NDK({}),
    )

    useEffect(() => {
        customNdk.connect()
    }, [customNdk])

    return [customNdk, setCustomNdk] as const
}
