import { client } from './http.client'
import SystemUser from 'models/SystemUser.interface'
import SystemUsersList from 'models/SystemUsersList.interface'
import SystemUserPost from 'models/SystemUserPost.interface'
import SystemUserPut from 'models/SystemUserPut.interface'

// Note: error handling deferred to reducers

export const getAllUsers = async (): Promise<SystemUsersList> => {
  const { data } = await client.get<SystemUsersList>('/systemusers')

  return data
}

export const getUserById = async (userId: string): Promise<SystemUser> => {
  const { data } = await client.get<SystemUser>(`/systemusers/${userId}`)

  return data
}

export const createUser = async (user: SystemUserPost): Promise<SystemUser> => {
  const { data } = await client.post<SystemUser>('/systemusers/', user)

  return data
}

export const updateUser = async (
  userUpdate: SystemUserPut
): Promise<SystemUser> => {
  const { data } = await client.put<SystemUser>(
    `/systemusers/${userUpdate._id}`,
    userUpdate
  )

  return data
}

export const deleteUser = async (userId: string): Promise<SystemUser> => {
  const { data } = await client.delete<SystemUser>(`/systemusers/${userId}`)

  return data
}
