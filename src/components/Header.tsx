import { getDisplayUrl } from '../helpers/getDisplayUrl'

type Props = { url: string }
export const Header = ({ url }: Props) => (
    <header className="sticky top-0 p-2 text-center bg-purple-400">
        <h1 className="text-purple-50">SiteChattr</h1>
        <h2 className="overflow-x-auto text-purple-50">{getDisplayUrl(url)}</h2>
    </header>
)
