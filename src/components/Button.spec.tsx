import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
    const onClick = jest.fn()
    it('should render Button with styles', () => {
        const { asFragment } = render(
            <Button className="mt-4" onClick={onClick}>
                Test
            </Button>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it('should call onClick handler on click', () => {
        render(
            <Button className="mt-4" onClick={onClick}>
                Test
            </Button>,
        )
        userEvent.click(screen.getByText('Test'))
        expect(onClick).toHaveBeenCalled()
    })
})
