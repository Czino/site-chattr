import NDK, { NDKEvent } from '@nostr-dev-kit/ndk'
import { renderHook } from '@testing-library/react'
import { event1 } from '../../test/data/eventData'
import { usePostMessage } from './usePostMessage'

const ndk = new NDK()
const mockEvent = new NDKEvent(ndk, event1)
mockEvent.sign = jest.fn()
mockEvent.publish = jest.fn()
jest.mock('nostr-hooks', () => ({
    useNewEvent: () => ({
        createNewEvent: () => mockEvent,
    }),
}))
describe('usePostMessage', () => {
    const onSuccess = jest.fn()
    const content = 'My message!'
    const url = 'https://localhost'
    it('should create event, sign and publish', async () => {
        const { result } = renderHook(usePostMessage, { initialProps: { content, url } })
        await result.current()
        expect(mockEvent.publish).toHaveBeenCalled()
        expect(mockEvent.content).toEqual(content)
    })
    it('should call onSuccess after publish', async () => {
        const { result } = renderHook(usePostMessage, { initialProps: { content, url, onSuccess } })
        await result.current()
        expect(onSuccess).toHaveBeenCalled()
    })
})
