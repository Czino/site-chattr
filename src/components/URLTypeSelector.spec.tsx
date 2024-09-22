import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useAtom } from 'jotai'
import { urlTypeAtom, URLTypeSelector } from './URLTypeSelector'

describe('URLTypeSelector', () => {
    const base = render(<URLTypeSelector />).asFragment()
    it('should render correctly', () => {
        expect(base).toMatchSnapshot()
    })
    it('should select site render correctly', async () => {
        const { result } = renderHook(useAtom, { initialProps: urlTypeAtom })
        expect(result.current[0]).toBe('page')
        const { asFragment } = render(<URLTypeSelector />)
        await userEvent.click(screen.getByText('Site'))
        expect(asFragment()).toMatchDiffSnapshot(base)
        expect(result.current[0]).toBe('site')
    })
})
