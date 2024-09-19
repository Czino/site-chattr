import { act, render, renderHook } from '@testing-library/react'
import { useAtom } from 'jotai'
import { mockLoginWithExtension, mockLogout } from '../setupTests'
import { isLoggedInAtom, Login } from './Login'

const privateKey = '53fb738ea97a408dcf726b9e497600cf79d3a917589a17694aa4a837ef7bdff7'
const mockInit = jest.fn()
jest.mock('nostr-login', () => ({
    init: (...args: unknown[]) => mockInit(...args),
}))

jest.mock('@nostr-dev-kit/ndk', () => ({
    NDKPrivateKeySigner: {
        generate: () => ({
            privateKey,
        }),
    },
}))
describe('Login', () => {
    it('should render correctly', () => {
        const base = render(<Login />).asFragment()

        expect(base).toMatchSnapshot()
    })
    it('should call nostr login', () => {
        render(<Login />)
        expect(mockInit).toHaveBeenCalled()
    })
    it('should login with extension on auth', () => {
        render(<Login />)
        mockInit.mock.calls[0][0].onAuth()
        expect(mockLoginWithExtension).toHaveBeenCalled()
        const { result } = renderHook(useAtom, { initialProps: isLoggedInAtom })
        expect(result.current[0]).toBeTruthy()
    })
    it('should login with on lnAuth login event', () => {
        render(<Login />)
        document.dispatchEvent(new CustomEvent('nlAuth', { detail: { type: 'login' } }))
        expect(mockLoginWithExtension).toHaveBeenCalled()
        const { result } = renderHook(useAtom, { initialProps: isLoggedInAtom })
        expect(result.current[0]).toBeTruthy()
    })
    it('should login with on lnAuth signup event', () => {
        render(<Login />)
        document.dispatchEvent(new CustomEvent('nlAuth', { detail: { type: 'signup' } }))
        expect(mockLoginWithExtension).toHaveBeenCalled()
        const { result } = renderHook(useAtom, { initialProps: isLoggedInAtom })
        expect(result.current[0]).toBeTruthy()
    })
    it('should logout with on lnAuth logout event', () => {
        render(<Login />)
        const { result } = renderHook(useAtom, { initialProps: isLoggedInAtom })
        // @ts-ignore
        act(() => result.current[1](true))
        expect(result.current[0]).toBeTruthy()
        act(() => document.dispatchEvent(new CustomEvent('nlAuth', { detail: { type: 'logout' } })))
        expect(mockLogout).toHaveBeenCalled()
        expect(result.current[0]).toBeFalsy()
    })
})
