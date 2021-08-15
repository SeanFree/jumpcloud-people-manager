import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useState,
} from 'react'
import { UserStatusKey } from 'store/users/users.slice'
import SystemUserPut from 'models/SystemUserPut.interface'

export interface NotificationMessage {
  content: string
  statusKey: UserStatusKey
  type: string
}

interface AppContextValue {
  notificationMessage?: NotificationMessage | null
  setNotificationMessage: Dispatch<NotificationMessage | null>
  sidePanelAction: 'create-user' | 'edit-user' | ''
  setSidePanelAction: Dispatch<'create-user' | 'edit-user' | ''>
  userUnderEdit: SystemUserPut | null
  setUserUnderEdit: Dispatch<SystemUserPut | null>
}

export const AppContext = createContext<AppContextValue>({
  notificationMessage: null,
  setNotificationMessage: () => null,
  sidePanelAction: '',
  setSidePanelAction: () => null,
  userUnderEdit: null,
  setUserUnderEdit: () => null,
})

export const AppProvider: FC<any> = ({ children }: PropsWithChildren<any>) => {
  const [notificationMessage, setNotificationMessage] =
    useState<AppContextValue['notificationMessage']>()
  const [sidePanelAction, setSidePanelAction] =
    useState<AppContextValue['sidePanelAction']>('')
  const [userUnderEdit, setUserUnderEdit] =
    useState<AppContextValue['userUnderEdit']>(null)

  return (
    <AppContext.Provider
      value={{
        notificationMessage,
        setNotificationMessage,
        sidePanelAction,
        setSidePanelAction,
        userUnderEdit,
        setUserUnderEdit,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
