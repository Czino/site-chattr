import { useActiveUser } from 'nostr-hooks'
import { useCallback } from 'react'

export const useIsSelf = () => {
    const { activeUser } = useActiveUser()
    const isSelf = useCallback((pubkey: string) => activeUser?.pubkey === pubkey, [activeUser])

    return isSelf
}
