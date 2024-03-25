// import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/app'
import './index.css'
import './tailwind.css'

import '@/plugins/i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
)
