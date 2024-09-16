import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'SiteChattr',
    description: 'A browser plugin to add a chatroom to any web page powered by the nostr protocol',
}

export default ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => (
    <html lang="en">
        <body className="h-screen p-4">
            {children}
            {/* <footer className="">Footer</footer> */}
        </body>
    </html>
)
