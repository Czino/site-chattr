import { useCallback, useEffect, useState } from 'react'

export const useCurrentUrl = () => {
    const [currentUrl, setCurrentUrl] = useState(window.location.href)

    const onMessageListener = useCallback((runtime: typeof chrome.runtime | typeof browser.runtime) => {
        runtime.onMessage.addListener((message) => {
            if (message.url) {
                setCurrentUrl(message.url)
            }
        })
    }, [])
    const setInitialURL = useCallback((tabs: typeof chrome.tabs | typeof browser.tabs) => {
        tabs.query({ active: true, currentWindow: true }, (allTabs) => {
            const currentTab = allTabs[0]
            if (currentTab?.url) {
                setCurrentUrl(currentTab.url)
            }
        })
    }, [])

    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.runtime) {
            onMessageListener(chrome.runtime)
        } else if (typeof browser !== 'undefined' && browser.runtime) {
            onMessageListener(browser.runtime)
        }
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            setInitialURL(chrome.tabs)
        }
        if (typeof browser !== 'undefined' && browser.tabs) {
            setInitialURL(browser.tabs)
        }
    }, [onMessageListener, setCurrentUrl, setInitialURL])

    return [currentUrl, setCurrentUrl] as const
}
