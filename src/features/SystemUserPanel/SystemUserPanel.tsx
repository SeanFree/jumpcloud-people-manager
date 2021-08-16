import React, { FC, useContext } from 'react'
import { Button, Divider, Flexbox, Heading, Icon } from 'components'
import { AppContext, SystemUserForm } from 'features'
import { useClassNames } from 'hooks'
import './SystemUserPanel.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import UserState from 'models/UserState.enum'
import { useAppDispatch } from 'store'
import { $updateUser } from 'store/users/users.thunks'

const SystemUserPanel: FC = () => {
  const dispatch = useAppDispatch()
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
      <div className="system-user-panel__wrapper custom-scrollbar">
        {sidePanelAction && (
          <>
            <Flexbox
              className="system-user-panel__header"
              as="header"
              gap="m"
              fullWidth
            >
              <Icon name="account_circle" size="xl" />
              <Flexbox align="start" as="span" direction="column">
                <Heading
                  as="h2"
                  content={
                    sidePanelAction === 'create-user'
                      ? 'New User'
                      : userUnderEdit?.displayname || userUnderEdit?.username
                  }
                  className="system-user-panel__heading"
                />
              </Flexbox>
              <Button
                ariaLabel="Cancel create new user"
                className="system-user-panel__btn-close"
                onClick={() => setSidePanelAction('')}
                iconName="close"
                size="l"
                variant="inline"
              />
            </Flexbox>
            {sidePanelAction === 'edit-user' && (
              <Flexbox
                as="div"
                className="system-user-panel__status content-wrapper"
                gap="m"
              >
                <Icon
                  name={
                    userUnderEdit?.state === UserState.ACTIVATED
                      ? 'person_add'
                      : 'person_off'
                  }
                  type={
                    userUnderEdit?.state === UserState.ACTIVATED
                      ? 'neutral'
                      : 'warning'
                  }
                />
                <span>{userUnderEdit?.state}</span>
                <Button
                  ariaLabel={
                    `${
                      userUnderEdit?.state === UserState.ACTIVATED
                        ? 'Suspend'
                        : 'Activate'
                    } ` +
                    (userUnderEdit?.displayname || userUnderEdit?.username)
                  }
                  content={
                    userUnderEdit?.state === UserState.ACTIVATED
                      ? 'Suspend'
                      : 'Activate'
                  }
                  onClick={() => {
                    dispatch(
                      $updateUser({
                        _id: userUnderEdit?._id,
                        state:
                          userUnderEdit?.state === UserState.ACTIVATED
                            ? UserState.SUSPENDED
                            : UserState.ACTIVATED,
                        suspended: userUnderEdit?.state === UserState.ACTIVATED,
                      })
                    )
                  }}
                  size="s"
                  variant="inline"
                />
              </Flexbox>
            )}
            <Divider />
            <div className="system-user-panel__content">
              <FormProvider {...formContext}>
                <SystemUserForm handleSubmit={formContext.handleSubmit} />
              </FormProvider>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}

export default SystemUserPanel
