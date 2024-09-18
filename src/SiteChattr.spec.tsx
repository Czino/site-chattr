import { render, renderHook } from '@testing-library/react'
import { useAtom } from 'jotai'
import { SiteChattr } from './SiteChattr'
import { isLoggedInAtom } from './components/Login'

describe('SiteChattr', () => {
    const base = render(<SiteChattr />).asFragment()
    it('should render correctly when logged in', () => {
        expect(base).toMatchSnapshot()
    })
    it('should render correctly when not logged in', () => {
        const { asFragment } = render(<SiteChattr />)
        renderHook(() => {
            const [, setIsLoggedIn] = useAtom(isLoggedInAtom)
            setIsLoggedIn(false)
        })
        expect(asFragment()).toMatchDiffSnapshot(base)
    })
})
