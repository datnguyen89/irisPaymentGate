import request from '../requests/request'
import { setRecoil } from 'recoil-nexus'
import { currentBillState, feeState } from '../recoil/billState'
import { RESPONSE_CODE } from '../constant'

const billStore = {
  getCurrentBill: (params) => {
    return new Promise((resolve, reject) => {
      const url = `/api/v1/payment`
      request.get(url, params, false, false)
        .then(res => {
          setRecoil(currentBillState, res)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  paymentVerify: (data) => {
    return new Promise((resolve, reject) => {
      const url = `/api/v1/payment/verify`
      request.post(url, data, false, false)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  paymentConfirm: (data) => {
    return new Promise((resolve, reject) => {
      const url = `/api/v1/payment/confirm`
      request.post(url, data, false, true)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getFee: (params) => {
    return new Promise((resolve, reject) => {
      const url = `/api/v1/payment/fee`
      request.get(url, params, false, false)
        .then(res => {
          if (res?.responseCode === RESPONSE_CODE.SUCCESS) {
            setRecoil(feeState, res?.param)
          }
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  cancelBill: (params) => {
    return new Promise((resolve, reject) => {
      const url = `/api/v1/payment/cancel`
      request.get(url, params, false, false)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

}
export default billStore