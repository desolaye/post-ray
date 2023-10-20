import { API_URL } from '@/shared/model/env'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: API_URL,
})
