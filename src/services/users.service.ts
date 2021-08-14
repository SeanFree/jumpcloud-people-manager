import { AxiosResponse } from 'axios';
import { client } from './http.client';
import SystemUser from 'models/SystemUser.interface';
import SystemUserPost from 'models/SystemUserPost.interface';
import SystemUsersList from 'models/SystemUsersList.interface';

export const getAllUsers = async (): Promise<AxiosResponse<SystemUsersList>> => {
  return await client.get('/systemusers');
};

export const getUserById = async (userId: string): Promise<AxiosResponse<SystemUser>> => {
  return await client.get(`/systemusers/${userId}`);
};

export const createUser = async (user: SystemUserPost): Promise<AxiosResponse<SystemUser>> => {
  return await client.post('/systemusers/', user);
};

export const deleteUser = async (userId: string): Promise<AxiosResponse<SystemUser>> => {
  return await client.delete(`/systemusers/${userId}`)
};

export const updateUser = async (userUpdate: SystemUserPost): Promise<AxiosResponse<SystemUser>> => {
  return await client.put('/systemusers', userUpdate);
};
