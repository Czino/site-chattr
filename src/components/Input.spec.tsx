import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
    const onTextChange = jest.fn()
    it('should render Input with styles', () => {
        const { asFragment } = render(<Input className="mt-4" value="Text" onTextChange={onTextChange} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it('should call onTextChange handler on text change', async () => {
        render(<Input placeholder="Your message..." onTextChange={onTextChange} />)
        await userEvent.type(screen.getByPlaceholderText('Your message...'), 'a message')
        expect(onTextChange).toHaveBeenCalledWith('a message')
    })
    it('should do nothing if onTextChange handler not given', async () => {
        render(<Input placeholder="Your message..." />)
        await userEvent.type(screen.getByPlaceholderText('Your message...'), 'a message')
    })
})
