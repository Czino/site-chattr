import { useAtom } from 'jotai'
import { useNostrHooks } from 'nostr-hooks'
import { Events } from './Events'
import { Header } from './components/Header'
import { isLoggedInAtom, Login } from './components/Login'
import { MessageBox } from './components/MessageBox'
import { urlTypeAtom, URLTypeSelector } from './components/URLTypeSelector'
import { getURLOrigin } from './helpers/getURLOrigin'
import { useCurrentUrl } from './hooks/useCurrentUrl'
import { useCustomNdk } from './hooks/useCustomNdk'

export const SiteChattr = () => {
    const [currentUrl] = useCurrentUrl()
    const [customNdk] = useCustomNdk()
    const [type] = useAtom(urlTypeAtom)

    useNostrHooks(customNdk)
    const [isLoggedIn] = useAtom(isLoggedInAtom)

    return (
        <div className="flex flex-col gap-4 h-full">
            <main className="flex flex-col flex-shrink h-full">
                <Header url={currentUrl} />
                <URLTypeSelector />
                <div className="overflow-auto flex-shrink p-2 h-full">
                    <Events url={type === 'page' ? currentUrl : getURLOrigin(currentUrl)} />
                </div>
                {isLoggedIn ? (
                    <div className="px-2 pb-2">
                        <MessageBox url={currentUrl} />
                    </div>
                ) : (
                    <Login />
                )}
            </main>
        </div>
    )
}
