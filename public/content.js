const toggle = () => {
    const sidebar = document.createElement('iframe')
    sidebar.name = 'site-chattr'
    sidebar.id = 'site-chattr-extension'
    sidebar.style.position = 'fixed'
    sidebar.style.top = '0'
    sidebar.style.right = '0'
    sidebar.style.width = '340px'
    sidebar.style.height = '100%'
    sidebar.style.zIndex = '9999'
    sidebar.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 0px 50px'
    sidebar.style.border = 'none'
    sidebar.src = chrome.runtime.getURL('index.html')

    document.body.appendChild(sidebar)
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg === 'toggle') toggle()
})
