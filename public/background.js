chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab) {
            chrome.runtime.sendMessage({ url: tab.url })
        }
    })
})
