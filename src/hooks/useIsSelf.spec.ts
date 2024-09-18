import { renderHook } from '@testing-library/react'
import { useActiveUser } from 'nostr-hooks'
import { useIsSelf } from './useIsSelf'

describe('useIsSelf', () => {
    it('should return true if pubkey matches activeUser pubkey, false if not', () => {
        const { result: activeUserResult } = renderHook(useActiveUser)
        if (!activeUserResult.current.activeUser?.pubkey) throw Error('No active user found')

        const { result } = renderHook(useIsSelf)
        expect(result.current(activeUserResult.current.activeUser?.pubkey)).toBeTruthy()
        expect(result.current('differentPubKey')).toBeFalsy()
    })
})
