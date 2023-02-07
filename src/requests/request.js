import axiosClient from './axiosClient'

const request = {
  get: (url, params, disabledLoading, disableAutoError) => {
    return axiosClient({
      url: url,
      method: 'get',
      params: params,
      disabledLoading: disabledLoading,
      disableAutoError: disableAutoError,
    })
  },
  post: (url, data, disabledLoading, disableAutoError) => {
    return axiosClient({
      url: url,
      method: 'post',
      data: data,
      disabledLoading: disabledLoading,
      disableAutoError: disableAutoError,
    })
  },
}
export default request