import { render } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
    it('renders correctly', () => {
        const { asFragment } = render(<Header url="https://localhost" />)
        expect(asFragment()).toMatchSnapshot()
    })
})
