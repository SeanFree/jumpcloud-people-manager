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
import { omitEmpty } from 'utils'

export const $getAllUsers = createAsyncThunk<SystemUsersList>(
  'users/$getAllUsers',
  getAllUsers
)

export const $getUserById = createAsyncThunk<SystemUser, string>(
  'users/$getUserById',
  getUserById
)

export const $createUser = createAsyncThunk<SystemUser, SystemUserPost>(
  'users/$createUser',
  createUser
)

export const $updateUser = createAsyncThunk<Update<SystemUser>, SystemUserPut>(
  'users/$updateUser',
  async (userUpdate: SystemUserPut) => {
    const changes = omitEmpty<SystemUserPut>(userUpdate)
    const { id } = await updateUser(changes)

    return {
      id,
      changes,
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
