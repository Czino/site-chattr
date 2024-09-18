import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
    const onClick = jest.fn()
    const base = render(<Button onClick={onClick}>Test</Button>).asFragment()
    it('should render correctly', () => {
        expect(base).toMatchSnapshot()
    })
    it('should render Button with styles', () => {
        const { asFragment } = render(
            <Button className="mt-4" onClick={onClick}>
                Test
            </Button>,
        )
        expect(asFragment()).toMatchDiffSnapshot(base)
    })
    it('should call onClick handler on click', async () => {
        render(<Button onClick={onClick}>Test</Button>)
        await userEvent.click(screen.getByText('Test'))
        expect(onClick).toHaveBeenCalled()
    })
})
