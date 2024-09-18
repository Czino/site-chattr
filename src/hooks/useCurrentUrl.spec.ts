import { renderHook } from '@testing-library/react'
import { useCurrentUrl } from './useCurrentUrl'

describe('useCurrentUrl', () => {
    const href = 'https://example.com'
    Object.defineProperty(window, 'location', {
        value: { href },
        writable: true,
    })
    it('should return current url and setter', () => {
        const { result } = renderHook(useCurrentUrl)
        const [currentUrl, setCurrentUrl] = result.current
        expect(currentUrl).toBe(href)
        expect(setCurrentUrl).toBeInstanceOf(Function)
    })
    it('should set current url from chrome tabs', () => {
        const url = 'https://othersite.com'
        window.chrome = {
            // @ts-ignore just a mock
            tabs: {
                query: jest.fn().mockImplementation((options, callback) => callback([{ url }])),
            },
        }
        const { result } = renderHook(useCurrentUrl)
        const [currentUrl] = result.current
        expect(currentUrl).toBe(url)
    })
    it('should do nothing if current tab could not be determined', () => {
        window.chrome = {
            // @ts-ignore just a mock
            tabs: {
                query: jest.fn().mockImplementation((options, callback) => callback([])),
            },
        }
        const { result } = renderHook(useCurrentUrl)
        const [currentUrl] = result.current
        expect(currentUrl).toBe(href)
    })
})
