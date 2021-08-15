import React, { FC } from 'react'
import { ReactComponent as JumpcloudLogo } from 'assets/jumpcloud-logo.svg'
import { Flexbox, Heading } from 'components'

import './AppHeader.scss'

const AppHeader: FC = () => {
  return (
    <header className="app-header">
      <Flexbox className="content-wrapper" gap="m">
        <a
          aria-label="Visit Jumpcloud.com"
          className="app-header__jumpcloud-link"
          href="https://jumpcloud.com/"
          rel="noreferrer"
          target="_blank"
        >
          <JumpcloudLogo className="app-header__logo" />
        </a>
        <Heading
          as="h1"
          className="app-header__heading"
          content="Users Dashboard"
        />
      </Flexbox>
    </header>
  )
}

export default AppHeader
