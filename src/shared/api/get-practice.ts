import axios from 'axios'
import { axiosInstance } from '../api/axios-instance'

import { BackendDataType, BackendDataZod } from '../types/backend-data'

export const getPractice = async () => {
  try {
    const { data, status, statusText } =
      await axiosInstance.get<BackendDataType>('/practice')

    if (status !== 200) throw new Error(statusText)
    BackendDataZod.parse(data)

    return data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('axios error: ', err.message)
    } else {
      console.error('unexpected error: ', err)
    }
  }
}
