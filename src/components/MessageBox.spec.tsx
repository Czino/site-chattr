import NDK, { NDKEvent } from '@nostr-dev-kit/ndk'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { event1 } from '../../test/data/eventData'
import { MessageBox } from './MessageBox'

const ndk = new NDK()
const mockEvent = new NDKEvent(ndk, event1)
mockEvent.sign = jest.fn()
mockEvent.publish = jest.fn()
jest.mock('nostr-hooks', () => ({
    useNewEvent: () => ({
        createNewEvent: () => mockEvent,
    }),
}))
describe('MessageBox', () => {
    const url = 'https://localhost:3000/'
    const base = render(<MessageBox url={url} />).asFragment()
    it('should render correctly', () => {
        expect(base).toMatchSnapshot()
    })
    it('should publish event and clear text after', async () => {
        const message = 'my comment!'
        const { asFragment } = render(<MessageBox url={url} />)
        await userEvent.type(screen.getByPlaceholderText('Your message...'), message)
        expect(asFragment()).toMatchDiffSnapshot(base)
        await userEvent.click(screen.getByLabelText('Send'))
        expect(mockEvent.publish).toHaveBeenCalled()
        expect(mockEvent.content).toEqual(message)
        expect(asFragment()).toMatchDiffSnapshot(base)
    })
})
