import React, { FC, useContext } from 'react'
import { Button, Divider, Flexbox, Heading, Icon } from 'components'
import { AppContext, SystemUserForm } from 'features'
import { useClassNames } from 'hooks'
import './SystemUserPanel.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'

const SystemUserPanel: FC = () => {
  const { sidePanelAction, setSidePanelAction, userUnderEdit } =
    useContext(AppContext)
  const formContext = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const classNames = useClassNames({
    'system-user-panel': true,
    'system-user-panel--open': !!sidePanelAction,
  })

  useEffect(() => {
    formContext.reset(userUnderEdit || undefined)
  }, [userUnderEdit])

  return (
    <aside aria-hidden={!sidePanelAction} className={classNames}>
      {sidePanelAction && (
        <>
          <Flexbox
            className="system-user-panel__header"
            as="header"
            gap="m"
            fullWidth
          >
            <Icon name="account_circle" size="xl" />
            <Heading as="h2" className="system-user-panel__heading">
              {sidePanelAction === 'create-user'
                ? 'New User'
                : `Edit ${
                    userUnderEdit?.displayname || userUnderEdit?.username
                  }`}
            </Heading>
            <Button
              ariaLabel="Cancel create new user"
              className="system-user-panel__btn-close"
              onClick={() => setSidePanelAction('')}
              iconName="close"
              size="l"
              variant="inline"
            />
          </Flexbox>
          <Divider />
          <FormProvider {...formContext}>
            <SystemUserForm handleSubmit={formContext.handleSubmit} />
          </FormProvider>
        </>
      )}
    </aside>
  )
}

export default SystemUserPanel
