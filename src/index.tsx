import ReactDOM from 'react-dom/client'
import { SiteChattr } from './SiteChattr'
import './index.css'

const $siteChattr = document.getElementById('site-chattr') as HTMLElement
const root = ReactDOM.createRoot($siteChattr)
root.render(<SiteChattr />)
