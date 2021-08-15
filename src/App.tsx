import React, { ReactElement } from 'react'
import {
  AppFooter,
  AppHeader,
  AppNotification,
  SystemUserPanel,
  UsersTile,
} from 'features'

import './styles/App.scss'

function App(): ReactElement {
  return (
    <>
      <AppHeader />
      <main className="app-main content-wrapper">
        <UsersTile />
      </main>
      <AppFooter />
      <AppNotification />
      <SystemUserPanel />
    </>
  )
}

export default App
