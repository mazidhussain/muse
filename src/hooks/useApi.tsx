import { useState } from 'react'

interface ApiResponse<T> {
  data: T | null
  isFetching: boolean
  error: string | null
  isSuccess: boolean
}

export function useApi<T>(
  apiFunction: () => Promise<T>,
): [ApiResponse<T>, () => void] {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    isFetching: false,
    error: null,
    isSuccess: false,
  })

  const fetchMethod = () => {
    setResponse({
      data: null,
      isFetching: true,
      error: null,
      isSuccess: false,
    })

    apiFunction()
      .then((res) => {
        setResponse({
          data: res,
          isFetching: false,
          error: null,
          isSuccess: true,
        })
      })
      .catch((err) => {
        setResponse({
          data: null,
          isFetching: false,
          error: err.message,
          isSuccess: false,
        })
      })
  }

  return [response, fetchMethod]
}
