import { useAtom } from 'jotai'
import { useNostrHooks } from 'nostr-hooks'
import { Events } from './Events'
import { Login, isLoggedInAtom } from './components/Login'
import { MessageBox } from './components/MessageBox'
import { getDisplayUrl } from './helpers/getDisplayUrl'
import { useCustomNdk } from './hooks/useCustomNdk'
import { useCurrentUrl } from './useCurrentUrl'

export const SiteChattr = () => {
    const [currentUrl] = useCurrentUrl()
    const [customNdk] = useCustomNdk()
    useNostrHooks(customNdk)
    const [isLoggedIn] = useAtom(isLoggedInAtom)

    return <div className="h-full flex flex-col gap-4">
        <header className="bg-purple-400 p-2 text-center">
            <h1 className="text-purple-50">SiteChattr</h1>
            <h2 className="text-purple-50 overflow-x-auto">{getDisplayUrl(currentUrl)}</h2>
        </header>
        <main className="h-full flex flex-col gap-4 p-2">
            <div className="overflow-auto flex-shrink h-full">
                <Events url={currentUrl} />
            </div>
            {isLoggedIn ? <MessageBox url={currentUrl} /> : <Login />}
        </main>
    </div>
}
