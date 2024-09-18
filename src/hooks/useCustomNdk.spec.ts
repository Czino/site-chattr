import { renderHook } from '@testing-library/react'
import { explicitRelayUrls, useCustomNdk } from './useCustomNdk'

describe('useCustomNdk', () => {
    it('should return a custom NDK and setter', () => {
        const { result } = renderHook(useCustomNdk)
        const [customNdk, setCustomNdk] = result.current
        expect(customNdk.explicitRelayUrls).toEqual(explicitRelayUrls)
        expect(setCustomNdk).toBeInstanceOf(Function)
    })
})
