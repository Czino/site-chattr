import { getURLOrigin } from './getURLOrigin'

describe('getURLOrigin', () => {
    it('should return the URL origin', () => {
        expect(getURLOrigin('https://localhost:3000/some/path?and=query')).toBe('https://localhost:3000')
    })
})
