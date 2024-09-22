import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Selector } from './Selector'

describe('Selector', () => {
    const onClick = jest.fn()
    const base = render(
        <Selector value="one" selected="two" onClick={onClick}>
            One
        </Selector>,
    ).asFragment()
    it('should render correctly', () => {
        expect(base).toMatchSnapshot()
    })
    it('should render when selected', () => {
        const { asFragment } = render(
            <Selector value="one" selected="one" onClick={onClick}>
                One
            </Selector>,
        )

        expect(asFragment()).toMatchDiffSnapshot(base)
    })
    it('should call onClick handler on click', async () => {
        render(
            <Selector value="one" selected="two" onClick={onClick}>
                One
            </Selector>,
        )
        await userEvent.click(screen.getByText('One'))
        expect(onClick).toHaveBeenCalledWith('one')
    })
})
