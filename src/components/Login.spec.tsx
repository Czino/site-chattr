import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockLoginWithSecretKey } from '../setupTests'
import { Login } from './Login'

const privateKey = '53fb738ea97a408dcf726b9e497600cf79d3a917589a17694aa4a837ef7bdff7'

jest.mock('@nostr-dev-kit/ndk', () => ({
    NDKPrivateKeySigner: {
        generate: () => ({
            privateKey,
        }),
    },
}))
describe('Login', () => {
    it('should render correctly', () => {
        const base = render(<Login />).asFragment()

        expect(base).toMatchSnapshot()
    })
    it('should create new user', async () => {
        render(<Login />)
        await userEvent.click(screen.getByText('Create new user'))
        expect(mockLoginWithSecretKey).toHaveBeenCalledWith({
            secretKey: privateKey,
        })
    })
})
