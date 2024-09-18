import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from './Textarea'

describe('Textarea', () => {
    const onTextChange = jest.fn()
    it('should render Textarea with styles', () => {
        const { asFragment } = render(<Textarea className="mt-4" value="Text" onTextChange={onTextChange} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it('should call onTextChange handler on text change', () => {
        render(<Textarea className="mt-4" placeholder="Your message..." onTextChange={onTextChange} />)
        userEvent.type(screen.getByPlaceholderText('Your message...'), 'a message')
        expect(onTextChange).toHaveBeenCalledWith('a message')
    })
})
