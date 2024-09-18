import { useAtom } from 'jotai'
import { useNostrHooks } from 'nostr-hooks'
import { Events } from './Events'
import { Login, isLoggedInAtom } from './components/Login'
import { MessageBox } from './components/MessageBox'
import { getDisplayUrl } from './helpers/getDisplayUrl'
import { useCurrentUrl } from './hooks/useCurrentUrl'
import { useCustomNdk } from './hooks/useCustomNdk'

export const SiteChattr = () => {
    const [currentUrl] = useCurrentUrl()
    const [customNdk] = useCustomNdk()
    useNostrHooks(customNdk)
    const [isLoggedIn] = useAtom(isLoggedInAtom)

    return (
        <div className="flex flex-col gap-4 h-full">
            <header className="p-2 text-center bg-purple-400">
                <h1 className="text-purple-50">SiteChattr</h1>
                <h2 className="overflow-x-auto text-purple-50">{getDisplayUrl(currentUrl)}</h2>
            </header>
            <main className="flex flex-col gap-4 p-2 h-full">
                <div className="overflow-auto flex-shrink h-full">
                    <Events url={currentUrl} />
                </div>
                {isLoggedIn ? <MessageBox url={currentUrl} /> : <Login />}
            </main>
        </div>
    )
}
