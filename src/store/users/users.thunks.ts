import { createAsyncThunk, Update } from '@reduxjs/toolkit';
import SystemUser from 'models/SystemUser.interface';
import SystemUserPost from 'models/SystemUserPost.interface';
import SystemUserPut from 'models/SystemUserPut.interface';
import SystemUsersList from 'models/SystemUsersList.interface';
import { createUser, deleteUser, getUserById, getAllUsers, updateUser } from 'services/users.service';

export const $getAllUsers = createAsyncThunk<SystemUsersList>(
  'users/$getAllUsers',
  async () => {
    const { data, status } = await getAllUsers();

    return data;
  }
);

export const $getUserById = createAsyncThunk<SystemUser, string>(
  'users/$getUserById',
  async (userId: string) => {
    const { data, status } = await getUserById(userId);

    return data;
  }
);

export const $createUser = createAsyncThunk<SystemUser, SystemUserPost>(
  'users/$createUser',
  async (user: SystemUserPost) => {
    const { data, status } = await createUser(user);

    return data;
  }
)

export const $updateUser = createAsyncThunk<Update<SystemUser>, SystemUserPut>(
  'users/$updateUser',
  async (userUpdate: SystemUserPut) => {
    const { data, status } = await updateUser(userUpdate);

    return {
      id: data._id,
      changes: userUpdate
    };
  }
);

export const $deleteUser = createAsyncThunk<string, string>(
  'users/$deleteUser',
  async (userId: string) => {
    const { data, status } = await deleteUser(userId);

    return userId;
  }
);
