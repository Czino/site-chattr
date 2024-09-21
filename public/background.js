const onTabChange = (api) => {
    api.onActivated.addListener((activeInfo) => {
        api.get(activeInfo.tabId, (tab) => {
            if (tab.url) {
                chrome.runtime.sendMessage({ url: tab.url })
            }
        })
    })
}
const installSidePanelChrome = () => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    onTabChange(chrome.tabs)
}
const installSidePanelFirefox = () => {
    chrome.action.onClicked.addListener(browser.sidebarAction.toggle)
    onTabChange(browser.tabs)
}

if (chrome && chrome.sidePanel) {
    installSidePanelChrome()
} else if (chrome && chrome.action && browser.sidebarAction) {
    installSidePanelFirefox()
}
