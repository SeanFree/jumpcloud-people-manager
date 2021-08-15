/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { Button, Flexbox, Heading, Icon, Typography } from 'components'
import { AppContext } from 'features'
import { useClassNames } from 'hooks'
import { useAppDispatch } from 'store'
import { clearStatusByKey, UserStatusKey } from 'store/users/users.slice'
import { useCallback } from 'react'
import './AppNotification.scss'

const AppNotification: FC = () => {
  const dispatch = useAppDispatch()
  const { notificationMessage, setNotificationMessage } = useContext(AppContext)
  const [isVisible, setIsVisible] = useState(false)
  const el = useRef<HTMLElement>(null)
  const classNames = useClassNames({
    'app-notification--visible': isVisible,
    'app-notification': true,
    [`app-notification--${notificationMessage?.type}`]:
      !!notificationMessage?.type,
  })

  const handleTransition = useCallback(() => {
    const onTransitionEnd = () => {
      setNotificationMessage(null)
      el?.current?.removeEventListener('transitionend', onTransitionEnd)
    }

    el?.current?.addEventListener('transitionend', onTransitionEnd)
  }, [])

  const close = (immediate: boolean = false) => {
    if (immediate) {
      setIsVisible(false)
      handleTransition()
    } else {
      setTimeout(() => {
        setIsVisible(false)
        handleTransition()
      }, 3000)
    }
  }

  useEffect(() => {
    if (notificationMessage) {
      dispatch(
        clearStatusByKey(notificationMessage?.statusKey as UserStatusKey)
      )
      setIsVisible(true)
      close()
    }
  }, [notificationMessage])

  return (
    <aside aria-live="polite" className={classNames} role="alert" ref={el}>
      {notificationMessage && (
        <Flexbox as="span" gap="l" fullWidth>
          <Icon
            size="l"
            name={
              notificationMessage.type === 'success'
                ? 'check_circle'
                : 'warning'
            }
            type={
              notificationMessage.type === 'success' ? 'positive' : 'negative'
            }
          />
          <Flexbox align="start" as="div" direction="column" gap="xs">
            <Heading
              as="h5"
              content={
                notificationMessage.type === 'success'
                  ? 'Success!'
                  : 'Something went wrong.'
              }
            />
            <Typography as="p" content={notificationMessage.content} size="s" />
          </Flexbox>
          <Button
            ariaLabel="Close notification"
            className="app-notification__btn-close"
            iconName="close"
            onClick={() => {
              close(true)
            }}
            variant="inline"
          />
        </Flexbox>
      )}
    </aside>
  )
}

export default AppNotification
