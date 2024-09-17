import { useAtom } from 'jotai'
import { useNostrHooks } from 'nostr-hooks'
import { useEffect, useState } from 'react'
import { Events } from './Events'
import { Login, isLoggedInAtom } from './components/Login'
import { MessageBox } from './components/MessageBox'
import { getDisplayUrl } from './helpers/getDisplayUrl'
import { useCustomNdk } from './hooks/useCustomNdk'

const useCurrentUrl = () => {
    const [currentUrl, setCurrentUrl] = useState(window.location.href || 'localhost')

    useEffect(() => {
        if (!chrome?.tabs) return
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0]
            if (currentTab?.url) {
                setCurrentUrl(currentTab.url)
            }
        })
    }, [setCurrentUrl])

    return [currentUrl, setCurrentUrl] as const
}
export const SiteChattr = () => {
    const [currentUrl] = useCurrentUrl()
    const [customNdk] = useCustomNdk()
    useNostrHooks(customNdk)
    const [isLoggedIn] = useAtom(isLoggedInAtom)

    return <div className="h-full flex flex-col gap-4">
        <header className="bg-purple-400 p-2 text-center overflow-x-auto">
            <h1 className="text-purple-50">Chat on {getDisplayUrl(currentUrl)}</h1>
        </header>
        <main className="h-full flex flex-col gap-4 p-2">
            <div className="overflow-auto flex-shrink h-full">
                <Events url={currentUrl} />
            </div>
            {isLoggedIn ? <MessageBox url={currentUrl} /> : <Login />}
        </main>
    </div>
}
