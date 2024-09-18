import { getDisplayUrl } from './getDisplayUrl'

describe('getDisplayUrl', () => {
    it('should strip out protocol part of URL', () => {
        expect(getDisplayUrl('https://localhost:3000/some/path?and=query')).toBe('localhost:3000/some/path?and=query')
    })
})
