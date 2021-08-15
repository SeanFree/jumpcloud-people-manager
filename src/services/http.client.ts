import axios, { AxiosInstance } from 'axios'

const baseURL = 'http://localhost:8005/api'

export const client: AxiosInstance = axios.create({
  baseURL,
})
