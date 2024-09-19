import '@testing-library/jest-dom'
import { toMatchDiffSnapshot } from 'snapshot-diff'
import { TextDecoder, TextEncoder } from 'util'
expect.extend({ toMatchDiffSnapshot })
Object.assign(global, { TextDecoder, TextEncoder })

export const testPubkey = 'c446c97e0b3a2f5e1d33ba40664fa77b03b0afcba9684daf4f7925ae8f5c6fe0'
export const mockLoginFromLocalStorage = jest.fn().mockImplementation(({ onSuccess }) => {
    if (onSuccess) onSuccess()
})
export const mockLoginWithSecretKey = jest.fn().mockImplementation(({ onSuccess }) => {
    if (onSuccess) onSuccess()
})
export const mockLoginWithExtension = jest.fn().mockImplementation(({ onSuccess }) => {
    if (onSuccess) onSuccess()
})
export const mockLogout = jest.fn()
export const mockUseSubscribe = jest.fn().mockReturnValue({
    App: [],
    eose: false,
})
jest.mock('nostr-hooks', () => ({
    useNostrHooks: jest.fn(),
    useLogin: () => ({
        loginFromLocalStorage: mockLoginFromLocalStorage,
        loginWithExtension: mockLoginWithExtension,
        loginWithSecretKey: mockLoginWithSecretKey,
        logout: mockLogout,
    }),
    useActiveUser: () => ({
        activeUser: { pubkey: testPubkey },
    }),
    useSubscribe: (...args: unknown[]) => mockUseSubscribe(...args),
    useNewEvent: () => ({ createNewEvent: jest.fn() }),
}))
