const getEnv = (key: string) => {
  const val = import.meta.env[key]

  if (typeof val === 'undefined') {
    throw new Error(`ENV variable ${key} not fount`)
  }

  return val || ''
}

export const API_URL = getEnv('VITE_API_URL')
