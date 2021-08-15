import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'
import DispatchStatus from 'models/DispatchStatus.enum'
import SystemUser from 'models/SystemUser.interface'
import {
  $createUser,
  $deleteUser,
  $getAllUsers,
  $getUserById,
  $updateUser,
} from './users.thunks'

export enum UserStatusKey {
  getUsers = 'getUsersStatus',
  getUser = 'getUserStatus',
  createUser = 'createUserStatus',
  updateUser = 'updateUserStatus',
  deleteUser = 'deleteUserStatus',
}

interface IUsersInitialState extends EntityState<SystemUser> {
  [UserStatusKey.getUsers]: DispatchStatus
  [UserStatusKey.getUser]: DispatchStatus
  [UserStatusKey.createUser]: DispatchStatus
  [UserStatusKey.updateUser]: DispatchStatus
  [UserStatusKey.deleteUser]: DispatchStatus
}

export const usersAdapter = createEntityAdapter<SystemUser>({
  selectId: ({ _id }) => _id,
})

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    ...usersAdapter.getInitialState(),
    [UserStatusKey.getUsers]: DispatchStatus.IDLE,
    [UserStatusKey.getUser]: DispatchStatus.IDLE,
    [UserStatusKey.createUser]: DispatchStatus.IDLE,
    [UserStatusKey.updateUser]: DispatchStatus.IDLE,
    [UserStatusKey.deleteUser]: DispatchStatus.IDLE,
  } as IUsersInitialState,
  reducers: {
    setUsers: usersAdapter.addMany,
    clearStatusByKey: (state, action: PayloadAction<UserStatusKey>) => {
      state[action.payload] = DispatchStatus.IDLE
    },
    setGetUsersStatus: (state, action: PayloadAction<DispatchStatus>) => {
      state[UserStatusKey.getUsers] = action.payload
    },
    setGetUserStatus: (state, action: PayloadAction<DispatchStatus>) => {
      state[UserStatusKey.getUser] = action.payload
    },
    setCreateUserStatus: (state, action: PayloadAction<DispatchStatus>) => {
      state[UserStatusKey.createUser] = action.payload
    },
    setUpdateUserStatus: (state, action: PayloadAction<DispatchStatus>) => {
      state[UserStatusKey.updateUser] = action.payload
    },
    setDeleteUserStatus: (state, action: PayloadAction<DispatchStatus>) => {
      state[UserStatusKey.deleteUser] = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase($getAllUsers.pending, (state) => {
        state[UserStatusKey.getUsers] = DispatchStatus.PENDING
      })
      .addCase($getAllUsers.rejected, (state) => {
        state[UserStatusKey.getUsers] = DispatchStatus.FAILED
      })
      .addCase($getAllUsers.fulfilled, (state, action) => {
        usersAdapter.addMany(state, action.payload.results)

        state[UserStatusKey.getUsers] = DispatchStatus.IDLE
      })

      .addCase($getUserById.pending, (state) => {
        state[UserStatusKey.getUser] = DispatchStatus.PENDING
      })
      .addCase($getUserById.rejected, (state) => {
        state[UserStatusKey.getUser] = DispatchStatus.FAILED
      })
      .addCase($getUserById.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload)

        state[UserStatusKey.getUser] = DispatchStatus.IDLE
      })

      .addCase($createUser.pending, (state) => {
        state[UserStatusKey.createUser] = DispatchStatus.PENDING
      })
      .addCase($createUser.rejected, (state, action) => {
        state[UserStatusKey.createUser] = DispatchStatus.FAILED
      })
      .addCase($createUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload)

        state[UserStatusKey.createUser] = DispatchStatus.SUCCESS
      })

      .addCase($updateUser.pending, (state) => {
        state[UserStatusKey.updateUser] = DispatchStatus.PENDING
      })
      .addCase($updateUser.rejected, (state, action) => {
        state[UserStatusKey.updateUser] = DispatchStatus.FAILED
      })
      .addCase($updateUser.fulfilled, (state, action) => {
        usersAdapter.updateOne(state, action.payload)

        state[UserStatusKey.updateUser] = DispatchStatus.SUCCESS
      })

      .addCase($deleteUser.pending, (state) => {
        state[UserStatusKey.deleteUser] = DispatchStatus.PENDING
      })
      .addCase($deleteUser.rejected, (state) => {
        state[UserStatusKey.deleteUser] = DispatchStatus.FAILED
      })
      .addCase($deleteUser.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload)

        state[UserStatusKey.deleteUser] = DispatchStatus.SUCCESS
      })
  },
})

export const { reducer: usersReducer } = usersSlice

export const {
  clearStatusByKey,
  setGetUsersStatus,
  setCreateUserStatus,
  setUpdateUserStatus,
  setDeleteUserStatus,
} = usersSlice.actions

export const defaultUsersSelectors = usersAdapter.getSelectors()
