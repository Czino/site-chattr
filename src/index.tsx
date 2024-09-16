import React from 'react'
import ReactDOM from 'react-dom/client'
import { SiteChattr } from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('site-chattr') as HTMLElement)
root.render(
    <React.StrictMode>
        <SiteChattr />
    </React.StrictMode>,
)
