import { OutputSelector } from '@reduxjs/toolkit'
import { ValueOf } from 'helpers/ValueOf'
import SystemUser from 'models/SystemUser.interface'
import { createSelector } from 'reselect'
import { RootState } from '..'
import { defaultUsersSelectors, UserStatusKey } from './users.slice'

type ParameterizedUserSelector = OutputSelector<
  RootState,
  SystemUser | undefined,
  (users: RootState['users']) => SystemUser | ValueOf<SystemUser> | undefined
>

const usersSelf = (state: RootState) => state.users

export const selectAllUsers = createSelector(usersSelf, (usersState) =>
  defaultUsersSelectors.selectAll(usersState)
)

export const selectUserById = (id: string): ParameterizedUserSelector =>
  createSelector(usersSelf, (usersState) =>
    defaultUsersSelectors.selectById(usersState, id)
  )

export const selectUserByUsername = (
  username: string
): ParameterizedUserSelector =>
  createSelector(usersSelf, (usersState) =>
    defaultUsersSelectors
      .selectAll(usersState)
      .find((user) => user.username === username)
  )

export const selectUserByEmail = (email: string): ParameterizedUserSelector =>
  createSelector(usersSelf, (usersState) =>
    defaultUsersSelectors
      .selectAll(usersState)
      .find((user) => user.email === email)
  )

export const selectGetUsersStatus = createSelector(
  usersSelf,
  (usersState) => usersState[UserStatusKey.getUsers]
)

export const selectGetUserStatus = createSelector(
  usersSelf,
  (usersState) => usersState[UserStatusKey.getUser]
)

export const selectCreateUserStatus = createSelector(
  usersSelf,
  (usersState) => usersState[UserStatusKey.createUser]
)

export const selectUpdateUserStatus = createSelector(
  usersSelf,
  (usersState) => usersState[UserStatusKey.updateUser]
)

export const selectDeleteUserStatus = createSelector(
  usersSelf,
  (usersState) => usersState[UserStatusKey.deleteUser]
)

export const selectStatusByKey = (
  statusKey: UserStatusKey
): ParameterizedUserSelector =>
  createSelector(
    usersSelf,
    (usersState) =>
      Object.getOwnPropertyDescriptor(usersState, statusKey)?.value
  )
