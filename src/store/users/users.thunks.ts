import { createAsyncThunk, Update } from '@reduxjs/toolkit'
import SystemUser from 'models/SystemUser.interface'
import SystemUserPost from 'models/SystemUserPost.interface'
import SystemUserPut from 'models/SystemUserPut.interface'
import SystemUsersList from 'models/SystemUsersList.interface'
import {
  createUser,
  deleteUser,
  getUserById,
  getAllUsers,
  updateUser,
} from 'services/users.service'

export const $getAllUsers = createAsyncThunk<SystemUsersList>(
  'users/$getAllUsers',
  async () => {
    const { data } = await getAllUsers()

    return data
  }
)

export const $getUserById = createAsyncThunk<SystemUser, string>(
  'users/$getUserById',
  async (userId: string) => {
    const { data } = await getUserById(userId)

    return data
  }
)

export const $createUser = createAsyncThunk<SystemUser, SystemUserPost>(
  'users/$createUser',
  async (user: SystemUserPost) => {
    const { data } = await createUser(user)

    return data
  }
)

export const $updateUser = createAsyncThunk<Update<SystemUser>, SystemUserPut>(
  'users/$updateUser',
  async (userUpdate: SystemUserPut) => {
    const update: SystemUserPut = Object.entries(userUpdate).reduce(
      (_update: SystemUserPut, [key, value]) => {
        if (value) _update[key as keyof SystemUserPut] = value
        return _update
      },
      {}
    )
    const { data } = await updateUser(update)

    return {
      id: data._id,
      changes: userUpdate,
    }
  }
)

export const $deleteUser = createAsyncThunk<string, string>(
  'users/$deleteUser',
  async (userId: string) => {
    await deleteUser(userId)

    return userId
  }
)
