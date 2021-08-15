import { FC, useContext, useEffect, useState } from 'react'
import { Button, DataTable, Flexbox, Icon, Tile, Typography } from 'components'
import { DataTableColumn } from 'components/DataTable/DataTable'
import SystemUser from 'models/SystemUser.interface'
import SystemUsersList from 'models/SystemUsersList.interface'
import SystemUserPut from 'models/SystemUserPut.interface'
import UserState from 'models/UserState.enum'
import DispatchStatus from 'models/DispatchStatus.enum'
import { AppContext } from 'features'
import { useData } from 'hooks'
import { UserStatusKey } from 'store/users/users.slice'
import { $getAllUsers } from 'store/users/users.thunks'
import {
  selectAllUsers,
  selectGetUsersStatus,
} from 'store/users/users.selectors'
import { useAppDispatch, useAppSelector } from 'store'
import './UsersTile.scss'

const getUserStateIcon = (userState: UserState) => {
  const isActivated = userState === UserState.ACTIVATED

  return (
    <Icon
      name={isActivated ? 'check_circle' : 'error'}
      size="m"
      type={isActivated ? 'positive' : 'warning'}
    />
  )
}

const columns: DataTableColumn<SystemUser>[] = [
  {
    key: 'state',
    label: 'State',
    icon: (value) => getUserStateIcon(value as UserState),
  },
  {
    key: 'displayname',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    label: 'Email',
  },
]

const UsersTile: FC = () => {
  const dispatch = useAppDispatch()
  const { setNotificationMessage, setSidePanelAction, setUserUnderEdit } =
    useContext(AppContext)
  const [fetchError, setFetchError] = useState(false)
  const users = useData<SystemUsersList, SystemUser[], void>(
    $getAllUsers,
    selectAllUsers
  )
  const getUsersStatus = useAppSelector(selectGetUsersStatus)

  const openEditPanel = (item: SystemUserPut) => {
    setUserUnderEdit(item)
    setSidePanelAction('edit-user')
  }

  useEffect(() => {
    if (getUsersStatus === DispatchStatus.FAILED) {
      setSidePanelAction('')
      setNotificationMessage({
        content: 'Unable to fetch users, please try again later.',
        statusKey: UserStatusKey.updateUser,
        type: 'error',
      })
      setFetchError(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUsersStatus])

  return (
    <Tile
      className="users-tile"
      bodyContent={
        fetchError ? (
          <Flexbox
            as="div"
            className="users-tile__error"
            fullWidth
            gap="m"
            justify="center"
          >
            <Icon name="person_off" size="xl" type="negative" />
            <Flexbox direction="column">
              <Typography content="Unable to fetch users" />
              <Button
                ariaLabel="Try to fetch users again"
                content="Try again"
                iconName="refresh"
                onClick={() => {
                  setFetchError(false)
                  dispatch($getAllUsers())
                }}
                size="m"
                variant="inline"
              />
            </Flexbox>
          </Flexbox>
        ) : (
          <DataTable<SystemUser>
            className="users-tile__table"
            columns={columns}
            id="users-table"
            data={users}
            onRowClick={openEditPanel}
            onRowKeyDown={({ nativeEvent }, item) => {
              nativeEvent.key === 'Enter' && openEditPanel(item)
            }}
          />
        )
      }
      fullWidthBody
      headerAction={
        <Button
          ariaLabel="Create new user"
          className="users-tile__btn-create-user"
          content="Create new user"
          disabled={getUsersStatus === DispatchStatus.PENDING || fetchError}
          iconName="person_add"
          onClick={() => setSidePanelAction('create-user')}
          size="m"
        />
      }
      headerIconProps={{
        name: 'people',
        size: 'l',
      }}
      heading="All Users"
    />
  )
}

export default UsersTile
