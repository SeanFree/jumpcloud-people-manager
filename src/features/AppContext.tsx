import { createContext, FC, useState } from 'react';
import SystemUser from 'models/SystemUser.interface';
import { UserStatusKey } from 'store/users/users.slice';

export interface NotificationMessage {
  content: string;
  statusKey: UserStatusKey;
  type: 'error' | 'success';
};

interface AppContextValue {
  notificationMessage?: NotificationMessage | null;
  setNotificationMessage: Function;
  sidePanelAction: 'create-user' | 'edit-user' | '';
  setSidePanelAction: Function;
  userUnderEdit: SystemUser | null;
  setUserUnderEdit: Function;
}

export const AppContext = createContext<AppContextValue>({
  notificationMessage: null,
  setNotificationMessage: () => {},
  sidePanelAction: '',
  setSidePanelAction: () => {},
  userUnderEdit: null,
  setUserUnderEdit: () => {},
});

export const AppProvider: FC = ({ children }) => {
  const [notificationMessage, setNotificationMessage] = useState<AppContextValue['notificationMessage']>();
  const [sidePanelAction, setSidePanelAction] = useState<AppContextValue['sidePanelAction']>('');
  const [userUnderEdit, setUserUnderEdit] = useState<AppContextValue['userUnderEdit']>(null);

  return (
    <AppContext.Provider
      value={{
        notificationMessage,
        setNotificationMessage,
        sidePanelAction,
        setSidePanelAction,
        userUnderEdit,
        setUserUnderEdit
      }}
    >{children}</AppContext.Provider>
  );
};
