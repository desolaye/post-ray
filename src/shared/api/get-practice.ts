import axios from 'axios'
import { axiosInstance } from '../api/axios-instance'
import { CrosswordleType, CrosswordleZod } from '../model/crosswordle'

export const getPractice = async () => {
  try {
    const { data, status, statusText } =
      await axiosInstance.get<CrosswordleType>('/practice')

    if (status !== 200) throw new Error(statusText)
    CrosswordleZod.parse(data)

    return data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('axios error: ', err.message)
    } else {
      console.error('unexpected error: ', err)
    }
  }
}
