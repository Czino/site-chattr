import { useEffect, useState } from 'react'

export const useCurrentUrl = () => {
    const [currentUrl, setCurrentUrl] = useState(window.location.href)

    useEffect(() => {
        if (typeof chrome === 'undefined') return
        if (chrome.tabs) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const currentTab = tabs[0]
                if (currentTab?.url) {
                    setCurrentUrl(currentTab.url)
                }
            })
        }
        if (chrome.runtime) {
            chrome.runtime.onMessage.addListener((message) => {
                if (message.url) {
                    setCurrentUrl(message.url)
                }
            })
        }
    }, [setCurrentUrl])

    return [currentUrl, setCurrentUrl] as const
}
