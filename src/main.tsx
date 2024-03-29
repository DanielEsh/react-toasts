// import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from '@/app'
import '@/plugins/i18n.ts'

import './index.css'
import './tailwind.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
)
