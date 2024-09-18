import { useEffect, useState } from 'react'

export const useCurrentUrl = () => {
    const [currentUrl, setCurrentUrl] = useState(window.location.href || 'localhost')

    useEffect(() => {
        if (typeof chrome === 'undefined' || !chrome?.tabs) return
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0]
            if (currentTab?.url) {
                setCurrentUrl(currentTab.url)
            }
        })
    }, [setCurrentUrl])

    return [currentUrl, setCurrentUrl] as const
}
