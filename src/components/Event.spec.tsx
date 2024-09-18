import NDK, { NDKEvent } from '@nostr-dev-kit/ndk'
import { render } from '@testing-library/react'
import { event1, event2 } from '../../test/data/eventData'
import { Event } from './Event'

const pubkey = 'c446c97e0b3a2f5e1d33ba40664fa77b03b0afcba9684daf4f7925ae8f5c6fe0'
const ndk = new NDK()
const event = new NDKEvent(ndk, event1)
jest.mock('nostr-hooks', () => ({
    useActiveUser: () => ({
        activeUser: { pubkey },
    }),
}))
describe('Event', () => {
    const base = render(<Event event={event} />).asFragment()
    it('should render correctly', () => {
        expect(base).toMatchSnapshot()
    })
    it('should render profile image', () => {
        event.author.profile = { image: 'url/to/image.png' }
        const { asFragment } = render(<Event event={event} />)
        expect(asFragment()).toMatchDiffSnapshot(base)
    })
    it('should highlight event if note is from active user', () => {
        const otherEvent = new NDKEvent(ndk, event2)

        const { asFragment } = render(<Event event={otherEvent} />)
        expect(asFragment()).toMatchDiffSnapshot(base)
    })
})
