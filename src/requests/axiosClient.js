import axios from 'axios'
import config from '../config'
import history from '../customRouter/history'
import { notification } from 'antd'
import queryString from 'query-string'
import { getRecoil, setRecoil } from 'recoil-nexus'
import { appLoadingState } from '../recoil/commonState'
import { PAGES, RESPONSE_CODE } from '../constant'


const axiosClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(
  request => {
    // region Headers
    // endregion
    // region Loading
    if (!request?.disabledLoading) {
      setRecoil(appLoadingState, (appLoading) => appLoading + 1)
    }
    // endregion
    console.log(request?.method, request.url.replace(config.apiUrl, ''), request?.method === 'get' ? request?.params : request?.data)
    return request
  },
  error => {
    // region Loading
    if (!error.config?.disabledLoading) {
      setRecoil(appLoadingState, (appLoading) => appLoading - 1)
    }
    // endregion
    return Promise.reject(error)
  },
)

axiosClient.interceptors.response.use(
  (response) => {
    console.log('response', response.config.url.replace(config.apiUrl, ''), response)
    // region Loading
    if (!response.config?.disabledLoading) {
      setRecoil(appLoadingState, (appLoading) => appLoading - 1)
    }
    // endregion

    switch (response?.data?.responseCode) {
      case RESPONSE_CODE.SUCCESS: // thành công
      case RESPONSE_CODE.BILL_INVALID: // điều hướng sang trang đơn hàng lỗi
      case RESPONSE_CODE.REQUIRE_CONFIRM_BANK: // yêu cầu OTP bank
      case RESPONSE_CODE.MERCHANT_INACTIVE: // merchant không hoạt động
        break
      default:
        if (!response.config?.disableAutoError) {
          notification.error({
            message: 'Thông báo',
            description: response?.data?.description,
          })
        }
        break
    }

    if (response && response?.data) {
      return response.data
    }
    return response
  },
  (error) => {
    const originalRequest = error.config
    // region Loading
    if (!originalRequest?.disabledLoading) {
      setRecoil(appLoadingState, (appLoading) => appLoading - 1)
    }
    // endregion
    if (error instanceof axios.Cancel) {

    } else {
      switch (error?.response?.status) {
        case 401:
          notification.error({
            message: 'Thông báo',
            description: 'Phiên đăng nhập hết hạn',
          })
          history.push(PAGES.LOGIN)
          break
        default:
          if (!originalRequest?.disableAutoError) {
            notification.error({
              message: 'Thông báo',
              description: error?.message,
            })
          }
          break
      }
    }
    return Promise.reject(error)
  })

export default axiosClient