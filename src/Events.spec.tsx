import NDK, { NDKEvent } from '@nostr-dev-kit/ndk'
import { render } from '@testing-library/react'
import { event1, event2 } from '../test/data/eventData'
import { Events } from './Events'
import { mockUseSubscribe } from './setupTests'

describe('Events', () => {
    const url = 'https://localhost:3000/'
    it('should subscribe with the correct filters', () => {
        render(<Events url={url} />)
        expect(mockUseSubscribe).toHaveBeenCalledWith({
            enabled: true,
            fetchProfiles: true,
            filters: [
                {
                    '#r': ['https://localhost:3000/'],
                    kinds: [1],
                },
                {
                    '#K': ['https://localhost:3000'],
                    '#I': ['https://localhost:3000/'],
                    kinds: [1111],
                },
            ],
            opts: {
                closeOnEose: false,
            },
            relays: ['wss://nostr-pub.wellorder.net/', 'wss://nostr.bitcoiner.social', 'wss://relay.damus.io/'],
        })
    })
    it('should render correctly while fetching', () => {
        const base = render(<Events url={url} />).asFragment()
        expect(base).toMatchSnapshot()
    })
    it('should render correctly when no messages could be fetched', () => {
        mockUseSubscribe.mockReturnValue({
            events: [],
            eose: true,
        })
        const base = render(<Events url={url} />).asFragment()
        expect(base).toMatchSnapshot()
    })
    it('should render messages', () => {
        const ndk = new NDK()

        mockUseSubscribe.mockReturnValue({
            events: [new NDKEvent(ndk, event1), new NDKEvent(ndk, event2)],
            eose: true,
        })
        const base = render(<Events url={url} />).asFragment()
        expect(base).toMatchSnapshot()
    })
})
